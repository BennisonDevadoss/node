import * as dotenv from 'dotenv';
import build from './application';

dotenv.config({ path: `${__dirname}/../.env` });

const PORT: any = process.env.PORT || 4000;
const fastify: any = build();  // ??

const start = async () => {
  try {
    await fastify.listen(PORT);

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
