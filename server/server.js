const server = require('./index');
const { syncAndSeed } = require('./db');

const PORT = process.env.PORT || 3000;

syncAndSeed()
  .then(() => server.listen(PORT, console.log(`Listening on port ${PORT}`)))
  .catch(err => console.error(err));
