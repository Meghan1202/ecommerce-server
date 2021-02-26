const healthHandler = (req, res) => res.status(200).send('Server is up!');

module.exports = { healthHandler };
