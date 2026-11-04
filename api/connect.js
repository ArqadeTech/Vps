const { isAuthed } = require('./_auth');

// Only authenticated users learn the Kali URL.
module.exports = (req, res) => {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });
  const url = process.env.KALI_URL;
  if (!url || !/^https:\/\//.test(url)) return res.status(500).json({ error: 'KALI_URL not configured' });
  res.redirect(302, url);
};
