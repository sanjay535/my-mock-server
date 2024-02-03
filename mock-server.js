// mock-server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

function startMockServer(config) {
  const app = express();

  app.use(express.json());

  // Adjust the mocks folder path based on the provided configuration
  const mocksFolder = path.resolve(process.cwd(), config.mocksFolder || 'mocks');
  const port = config.port || 3001;

  app.get('*', async (req, res) => {
    try {
      const endpoint = req.path.replace(/\/$/, ''); // Remove trailing slash

      // Adjust the filePath to search for mock files in the project's root
      const filePath = path.join(mocksFolder, `${endpoint}/ok.json`);

      // Check if the file exists
      await fs.access(filePath);

      // If the file exists, send its content as JSON with a 200 status code
      const data = await fs.readFile(filePath, 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      // If the file doesn't exist, return a 404 status code
      res.status(404).send('Not Found');
    }
  });

  app.listen(port, () => {
    console.log(`Mock server is running at http://localhost:${port}`);
  });

  return {
    app,
    port,
    mocksFolder,
  };
}

module.exports = {
  startMockServer,
};
