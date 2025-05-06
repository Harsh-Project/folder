const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

// === CONFIGURATION ===
const SHOP_DOMAIN = process.env.SHOPIFY_STORE; // Replace with your domain
const ACCESS_TOKENS = JSON.parse(process.env.SHOPIFY_ACCESS_TOKENS ?? []); // Replace with real tokens
const UNIQUE_IDENTIFIER = process.env.SHOPIFY_UNIQUE_IDENTIFIER ?? process.env.SHOPIFY_STORE.split(".")[0]
const API_VERSION = "2025-04";
const UPLOAD_DIR = process.argv[2];
const CONCURRENCY_PER_TOKEN = 5;
const MAX_RETRIES = 5;
const BACKOFF_BASE_MS = 1000;

if (!UPLOAD_DIR) {
  console.log("Directory not exist");
  process.exit(1);
}

// === HELPERS ===
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestWithRetry(requestFn, description, attempt = 1) {
  try {
    return await requestFn();
  } catch (error) {
    const status = error.response?.status;
    const retriable =
      !status || status === 429 || (status >= 500 && status < 600);
    if (retriable && attempt < MAX_RETRIES) {
      const delay = BACKOFF_BASE_MS * Math.pow(2, attempt - 1);
      console.warn(
        `${description} failed (attempt ${attempt}): ${error.message}. Retrying in ${delay}ms...`
      );
      await sleep(delay);
      return requestWithRetry(requestFn, description, attempt + 1);
    }
    console.error(
      `${description} failed permanently:`,
      error.response?.data || error.message
    );
    throw error;
  }
}

async function graphqlRequest(query, variables, token, description) {
  const endpoint = `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;
  return requestWithRetry(
    () =>
      axios.post(
        endpoint,
        { query, variables },
        {
          headers: {
            "X-Shopify-Access-Token": token,
            "Content-Type": "application/json",
          },
        }
      ),
    description
  ).then((res) => res.data);
}

async function uploadSingleFile(filename, token) {
  const filepath = path.join(UPLOAD_DIR, filename);
  const fileContent = await fs.readFile(filepath);
  const fileSize = fileContent.length;

  let mimeType = "application/octet-stream";
  if (filename.endsWith(".js")) mimeType = "text/javascript";
  if (filename.endsWith(".css")) mimeType = "text/css";

  // 1. Check and delete existing file
  const searchQuery = `filename:${filename}`;
  const checkQuery = `
    query FileExists($query: String!) {
      files(first: 1, query: $query) {
        edges { node { 
          id
          alt
          ... on GenericFile {
            id
            url
          }
           } }
      }
    }`;
  const checkResult = await graphqlRequest(
    checkQuery,
    { query: searchQuery },
    token,
    `Check if ${filename} exists`
  );
  const existing = checkResult?.data?.files?.edges?.[0]?.node;
  if (existing) {
    const deleteMutation = `
      mutation fileDelete($input: [ID!]!) {
        fileDelete(fileIds: $input) {
          deletedFileIds
          userErrors { field message }
        }
      }`;
    await graphqlRequest(
      deleteMutation,
      { input: [existing.id] },
      token,
      `Deleting ${filename}`
    );
    console.log(`Deleted existing file: ${filename}`);
  }

  // 2. Create staged upload
  const stagedMutation = `
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url resourceUrl parameters { name value }
        }
        userErrors { field message }
      }
    }`;
  const stagedVars = {
    input: [
      {
        filename,
        mimeType,
        httpMethod: "POST",
        resource: "FILE",
        fileSize: fileSize.toString(),
      },
    ],
  };
  const stagedData = await graphqlRequest(
    stagedMutation,
    stagedVars,
    token,
    `Stage upload for ${filename}`
  );
  const target = stagedData?.data?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) throw new Error(`No upload target for ${filename}`);

  const form = new FormData();
  target.parameters.forEach((p) => form.append(p.name, p.value));
  form.append("file", fileContent, { filename });
  await requestWithRetry(
    () =>
      axios.post(target.url, form, {
        headers: form.getHeaders(),
      }),
    `Uploading ${filename} to S3`
  );

  // 3. Create file
  const createMutation = `
    mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files { id fileStatus alt}
        userErrors { field message }
      }
    }`;
  const createVars = {
    files: {
      filename,
      contentType: "FILE",
      alt: `${UNIQUE_IDENTIFIER}${filename}`,
      originalSource: target.resourceUrl,
    },
  };
  await graphqlRequest(
    createMutation,
    createVars,
    token,
    `Create file ${filename}`
  );
  // console.log(res)
  console.log(`✅ Uploaded: ${filename}`);
}

// === MAIN ===
async function main() {
  const allFiles = (await fs.readdir(UPLOAD_DIR)).filter(
    (f) => f.endsWith(".js") || f.endsWith(".css")
  );
  console.log(`Found ${allFiles.length} files`);

  const results = {
    success: [],
    failed: [],
  };

  let tokenIndex = 0;
  const queue = allFiles.map((f) => ({
    file: f,
    token: ACCESS_TOKENS[tokenIndex++ % ACCESS_TOKENS.length],
  }));

  const workers = ACCESS_TOKENS.flatMap((token) => {
    const assignedFiles = queue.filter((q) => q.token === token);
    const batches = [];

    for (let i = 0; i < assignedFiles.length; i += CONCURRENCY_PER_TOKEN) {
      batches.push(assignedFiles.slice(i, i + CONCURRENCY_PER_TOKEN));
    }

    return batches.map((batch) => async () => {
      await Promise.all(
        batch.map(async ({ file }) => {
          try {
            await uploadSingleFile(file, token);
            results.success.push(file);
          } catch (err) {
            results.failed.push({ file, error: err.message });
          }
        })
      );
    });
  });

  for (const batch of workers) {
    await batch();
  }

  // === Summary ===
  console.log("\n=== ✅ Upload Summary ===");
  console.log(`Total: ${allFiles.length}`);
  console.log(`Uploaded: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length) {
    console.log("\n=== ❌ Failed Files ===");
    for (const { file, error } of results.failed) {
      console.log(`- ${file}: ${error}`);
    }
  }

  if (results.success.length) {
    console.log("\n=== ✅ Uploaded Files ===");
    for (const file of results.success) {
      console.log(`- ${file}`);
    }
  }

  console.log("\nAll done.");
}

main().catch((err) => console.error("Fatal error:", err));
