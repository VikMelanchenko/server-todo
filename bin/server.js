const server = require('../app');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running. Use our API on port: http://localhost:${PORT}`);
});

module.exports = server;
