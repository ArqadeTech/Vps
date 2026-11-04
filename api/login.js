const { makeToken, setCookie, safeEqual, TTL_SECONDS } = require('./_auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const expected = process.env.APP_PASSWORD;
  if (!expected || expected.length < 12) return res.status(500).json({ error: 'Server not configured' });

  const password = (req.body && req.body.password) || '';
  // Slow down brute force attempts.
  await new Promise((r) => setTimeout(r, 750));
  if (!safeEqual(password, expected)) return res.status(401).json({ error: 'Invalid password' });

  setCookie(res, makeToken(), TTL_SECONDS);
  res.status(200).json({ ok: true });
};
