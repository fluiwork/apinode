export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

  // Detecta bots de Google
  const isGoogleBot = /googlebot|adsbot-google/i.test(userAgent);
  if (isGoogleBot) {
    return res.status(204).end(); // No redirige
  }

  // Consulta a ipinfo.io
  try {
    const ipinfoToken = '3798a6699b4912';
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
    const data = await response.json();

    if (data.country === 'CO') {
      return res.writeHead(302, {
        Location: 'https://tu-sitio.com/landing-colombia'
      }).end();
    }
  } catch (err) {
    // Si algo falla, no redirige
    console.error(err);
  }

  return res.status(204).end(); // No redirige
}
