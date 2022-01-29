const SSEServer = require('sse-fake-server');

// Pass callback to SSEServer
SSEServer(client => {
    // Every 2 seconds send data to client
    setInterval(() => {
        client.send('Stream Hello!')
    }, 2000);
});
