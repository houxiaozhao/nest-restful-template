export default {
  host: process.env.REDIS_HOST,
  post: Number(process.env.REDIS_PORT),
  ttl: null,
  defaultCacheTTL: 60 * 60 * 24,
};
