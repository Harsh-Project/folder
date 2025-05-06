const { execSync } = require('child_process');

const [,, arg, token, token1, folder] = process.argv;

if (!arg || !arg.startsWith("version=")) {
  console.error(":x: Please provide version, e.g., npm run deploy version=4.5.8");
  process.exit(1);
}

if (!token) {
  console.error(':x: GitHub token missing. Pass it as the second argument.');
  process.exit(1);
}

const version = arg.split("=")[1];
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const repoOwner = 'Harsh-Project';
const repoName = 'folder';
const workflowFileName = 'deploy.yml';

const url = `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowFileName}/dispatches`;

console.log(`:rocket: Triggering deploy for branch: ${branch} with version: ${version}`);

let payload = {
  ref: branch,
  inputs: {
    code_build_version: version,
    shopify1: "flits-testing-extended-variants.myshopify.com",
    shopify2: token1
  },
}

if(folder?.length>0) {
  payload.inputs.projects = JSON.stringify(folder.split(","))
}

fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'node-fetch',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(res => {
  if (res.status === 204) {
    console.log(':white_check_mark: Workflow triggered successfully.');
  } else {
    return res.text().then(text => {
      throw new Error(`:x: Failed with status ${res.status}: ${text}`);
    });
  }
})
.catch(err => {
  console.error(err.message);
});