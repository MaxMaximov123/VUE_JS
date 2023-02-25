const redis = require('redis');
const client = redis.createClient();

// Add a listener for when the client connects
client.on('connect', () => {
  console.log('Connected to Redis');
});

// Add a listener for when the client encounters an error
client.on('error', (err) => {
  console.error('Error with Redis client:', err);
});

// Send a Redis command
client.set('mykey', 'myvalue', (err, reply) => {
  if (err) {
    console.error('Error setting Redis key:', err);
    return;
  }
  console.log('Set Redis key:', reply);
});

// Close the Redis client when finished
client.quit((err, reply) => {
  if (err) {
    console.error('Error closing Redis client:', err);
    return;
  }
  console.log('Closed Redis client');
});
