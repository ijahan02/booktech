import { c as defineEventHandler, u as useRuntimeConfig, r as readBody, e as createError } from '../../../_/nitro.mjs';
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

const checkout_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (!body.items || body.items.length === 0) {
    throw createError({ statusCode: 400, message: "Cart is empty" });
  }
  return {
    url: `${config.public.siteUrl}/checkout/success?session_id=mock_session`,
    sessionId: "mock_session"
  };
});

export { checkout_post as default };
//# sourceMappingURL=checkout.post.mjs.map
