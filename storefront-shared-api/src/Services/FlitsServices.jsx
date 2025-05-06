import {
  DELETE,
  GET,
  POST,
  PUT,
  makeQueryString,
  getFlitsURL,
  getURL,
} from "./Services";

const initialParam = {
  customer_hash: window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
  token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
};

export async function FLITSGETLOCAL(
  endpoint,
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    initialParam,
  };

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getURL(endpoint)}?${makeQueryString(updateParam)}`
      : getURL(endpoint);
  }
  return GET(url, headers);
}

export async function FLITSGET(endpoint, param = {}, headers = {}, isCustom, removeTrackingHeader) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }
  return GET(url, headers, removeTrackingHeader);
}

export async function FLITSPOST(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  const UpdatedformData = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    UpdatedformData.append(key, value);
  }

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }

  return POST(url, headers, UpdatedformData.toString());
}

export async function FLITSPUT(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  const UpdatedformData = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    UpdatedformData.append(key, value);
  }

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }

  return PUT(url, headers, UpdatedformData.toString());
}

export async function FLITSDELETE(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  const UpdatedformData = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    UpdatedformData.append(key, value);
  }

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }

  return DELETE(url, headers, UpdatedformData.toString());
}

export async function FLITSPOSTFORMDATA(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  const UpdatedformData = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    UpdatedformData.append(key, value);
  }

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }

  return POST(url, headers, UpdatedformData);
}

export async function FLITSPUTFORMDATA(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  const UpdatedformData = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    UpdatedformData.append(key, value);
  }

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }

  return PUT(url, headers, UpdatedformData);
}

export async function FLITSDELETEFORMDATA(
  endpoint,
  formData = {},
  param = {},
  headers = {},
  isCustom
) {
  let url;

  let updateParam = {
    ...param,
    ...initialParam,
  };

  const UpdatedformData = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    UpdatedformData.append(key, value);
  }

  if (isCustom) {
    url = endpoint;
  } else {
    url = Object.keys(updateParam).length
      ? `${getFlitsURL(endpoint)}?${makeQueryString(updateParam)}`
      : getFlitsURL(endpoint);
  }

  return DELETE(url, headers, UpdatedformData);
}
