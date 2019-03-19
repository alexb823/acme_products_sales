const server = require('./index');
const { syncAndSeed } = require('./db');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || "0.0.0.0";

syncAndSeed()
  .then(() => server.listen(PORT, IP, console.log(`Listening on port ${PORT}`)))
  .catch(err => console.error(err));
