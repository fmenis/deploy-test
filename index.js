const Fastify = require("fastify");
const Env = require("fastify-env");
const S = require("fluent-json-schema");

const fastify = Fastify({
  logger: {
    level: "debug",
  },
});

fastify.register(Env, {
  schema: S.object()
    .prop("SERVER_ADDRESS", S.string())
    .required()
    .prop("SERVER_PORT", S.string())
    .required()
    .valueOf(),
});

fastify.get("/hello", async (req, reply) => {
  return { msg: "Hello World!", v: 3 };
});

const port = process.env.SERVER_PORT;
const host = process.env.SERVER_ADDRESS;

fastify.listen(port, host, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.debug(`Server up and running in ${process.env.NODE_ENV} mode`);
});
