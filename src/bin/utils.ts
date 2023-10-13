export const sleep = async (timeMS: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMS);
  });
};
