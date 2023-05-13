export const DOUGH_CHEF_INTERVAL = 7000;
export const TOPPING_CHEF_INTERVAL = 4000;
export const OVEN_INTERVAL = 10000;
export const WAITER_INTERVAL = 5000;

export const getEnv = () => {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  return { PORT };
};
