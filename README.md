# Mock Server

```sh
npm i --save-dev my-mock-server
```
### We can use this as below
```js
  const { startMockServer } = require('my-mock-server');

// Configure the mock server
const mockServerConfig = {
  mocksFolder: 'mocks', // Provide a custom mocks folder name
  port: 4000, // Provide a custom port
};

// Start the mock server using the configured options
const mockServer = startMockServer(mockServerConfig);
```