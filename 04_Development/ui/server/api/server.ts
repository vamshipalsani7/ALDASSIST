/**
 * ALDASSIST Phase 9 — B1b: server entry (single-deployable API shell).
 * Starts the Fastify internal API. Public SSR + SPA hosting is added in a later batch (B12); B1b only
 * needs the API process to serve the trivial resource end-to-end.
 */
import { buildApp } from './app';

const port = Number(process.env.PORT ?? '5510');
const host = process.env.HOST ?? '127.0.0.1';

const app = buildApp();
app
  .listen({ port, host })
  .then((addr) => app.log.info(`ALDASSIST internal API listening at ${addr}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
