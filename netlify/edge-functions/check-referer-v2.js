// netlify/edge-functions/check-referer-v2.js

export default async (request, context) => {
  // Весь оригинальный код проверки referer закомментирован для временного отключения.
  // const referer = request.headers.get('referer');
  // const allowedReferers = ['https://pro-culinaria.ru/', 'http://babka-zana.proculinaria-book.ru', 'https://babka-zana.proculinaria-book.ru'];
  // const url = new URL(request.url);

  // context.log(`[check-referer-v2] Incoming request URL: ${url.href}`);
  // context.log(`[check-referer-v2] Referer header: ${referer}`);

  // if (referer) {
  //   try {
  //     const refererUrl = new URL(referer);
  //     const refererOrigin = refererUrl.origin;
  //     context.log(`[check-referer-v2] Parsed Referer Origin: ${refererOrigin}`);

  //     const isAllowed = allowedReferers.some(allowed => refererOrigin === new URL(allowed).origin);
  //     context.log(`[check-referer-v2] Is referer allowed? ${isAllowed}`);

  //     if (!isAllowed) {
  //       context.log(`[check-referer-v2] Blocking request: Referer not allowed.`);
  //       return new Response('Access denied: Referer not allowed.', { status: 403 });
  //     }
  //   } catch (e) {
  //     context.log(`[check-referer-v2] Error parsing referer: ${e.message}`);
  //     context.log(`[check-referer-v2] Blocking request: Malformed referer.`);
  //     return new Response('Access denied: Malformed referer.', { status: 403 });
  //   }
  // } else {
  //   context.log(`[check-referer-v2] No referer header found. Blocking.`);
  //   return new Response('Access denied: Referer not allowed or missing.', { status: 403 });
  // }

  // Эта строка позволяет любому запросу пройти дальше
  context.log(`[check-referer-v2] Проверка Referer временно отключена.`);
  return context.next(); // Разрешаем запрос
};
