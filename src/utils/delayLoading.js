export const delayLoading = async (promise, delay = 1000) => {
  const start = Date.now();
  const result = await promise;
  const elapsed = Date.now() - start;
  const remaining = delay - elapsed;

  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }
  return result;
};
