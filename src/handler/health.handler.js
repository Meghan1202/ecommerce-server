const healthHandler = (req, res) => res.status(200).json({
  message: 'Server is up',
});

module.exports = { healthHandler };
