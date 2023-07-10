import axios from 'axios';

function endPoint(endPoint) {
  const origin = process.env.API_URL;
  return `${origin}/api/${endPoint}`;
}

//endpoints
export const API = {
  USER: endPoint('user'),
  POST: endPoint('post'),
  PAYMENT: endPoint('payment'),
  PLAN: endPoint('plan'),
  SUBSCRIPTION: endPoint('subscription'),
  SUBSCRIPTION_HISTORY: endPoint('subscriptionHistory'),
};

export async function apiCallAxios(request) {
  console.log(
    `apiCallAxios: ${request.url}, method: ${request.method}, params: ${request.params}`
  );

  const startTime = Date.now();
  const response = await axios.request(request);
  const timeTaken = Date.now() - startTime;

  console.log(
    `apiCallAxios: ${request.url}, method: ${request.method}, timeTaken: ${timeTaken}`
  );

  return response;
}

export async function apiCall(endPoint, method, options, controller) {
  let finalEndpoint = endPoint;

  try {
    let accessToken = null;

    if (options?.id) {
      finalEndpoint += `/${options.id}`;
    }

    //Add Authentication logic here if required.
    const request = {
      method: method,
      url: finalEndpoint,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      params: options?.params,
      data: options?.data,
      ...options?.extraOptions,
    };
    if (controller) {
      request.signal = controller.signal;
    }
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    const res = await apiCallAxios(request);
    if (res.status < 200 || res.status >= 300) {
      throw new Error(`apiCallAxios failed with status: ${res.status}`);
    }
    return res;
  } catch (error) {
    console.error('something went wrong during api call');
    // throw error;
  }
}
