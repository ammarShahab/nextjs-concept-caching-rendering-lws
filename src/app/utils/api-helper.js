// 1.0 first create common api and added duration to calculate the time during build time
export const getData = async (apiUrl, caller, options = {}) => {
  const url = new URL(apiUrl);
  console.log(`[${caller}] : fetching ${url.pathname} started`);

  const startTime = performance.now();

  const response = await fetch(apiUrl, options);

  const endTime = performance.now();

  const duration = (endTime - startTime).toFixed(2);

  if (!response.ok) {
    console.log(`Unable to fetch data from ${url.pathname}`);
    throw new Error(`[${caller}] : failed to fetch ${url.pathname}`);
  }

  const data = await response.json();
  console.log(`[${caller}] : fetching data completed in ${duration}ms`);

  return data;
};
