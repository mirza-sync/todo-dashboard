const getRandomApiDelay = () => {
  const MAX = 2000;
  const MIN = 500;
  const delay = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  return delay;
};

export const apiDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, getRandomApiDelay()));
};
