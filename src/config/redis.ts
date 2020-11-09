export default {
  host: process.env.REDIS_HOST,
  post: Number(process.env.REDIS_PORT),
  ttl: null,
};
