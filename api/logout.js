const { setCookie } = require('./_auth');

module.exports = (req, res) => {
  setCookie(res, '', 0);
  res.status(200).json({ ok: true });
};
