export default async (request, context) => {
  const referer = request.headers.get('referer');
  const requestUrl = request.url;
  console.log('Incoming request URL:', requestUrl);
  console.log('Referer header:', referer);
  // Разрешённые домены
  const allowedReferers = [
    // Основной сайт pro-culinaria.ru
    'https://pro-culinaria.ru',
    'http://pro-culinaria.ru',
    'https://www.pro-culinaria.ru',
    'http://www.pro-culinaria.ru',
    // Пользовательский домен для babka-zana
    'https://babka-zana.proculinaria-book.ru',
    'http://babka-zana.proculinaria-book.ru',
    // Netlify-домен для babka-zana
    'https://babka-zana.netlify.app',
    'http://babka-zana.netlify.app',
  ];

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = refererUrl.origin;
      console.log('Parsed Referer Origin:', refererOrigin);
      const isAllowed = allowedReferers.includes(refererOrigin);
      console.log('Is referer allowed?', isAllowed);
      if (isAllowed) {
        return context.next();
      }
    } catch (e) {
      console.error("Invalid referer URL or parsing error:", referer, e);
    }
  } else {
    console.log('No referer header found. Blocking.');
  }
  console.log('Blocking request: Referer not allowed or missing.');
  return new Response('Access Denied: This page is only accessible from allowed sources.', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};