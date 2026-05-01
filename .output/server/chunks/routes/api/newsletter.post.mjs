import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'node:crypto';

const newsletter_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email || !body.email.includes("@")) {
    throw createError({ statusCode: 400, message: "Invalid email address" });
  }
  console.info("[Newsletter] New subscriber:", body.email);
  return { success: true, message: "Subscribed successfully" };
});

export { newsletter_post as default };
//# sourceMappingURL=newsletter.post.mjs.map
