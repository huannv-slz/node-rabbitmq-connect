const amqp = require('amqplib');

// Replace the URL with your RabbitMQ instance URL
// const amqpUrl = 'amqps://pjrzgkug:3aVtADCfGBZ5ODAxc9K0dOc9rjYeow_R@shrimp.rmq.cloudamqp.com/pjrzgkug';
const amqpUrl = "amqp://127.0.0.1:5672"

async function connect() {
    try {
        // Create a connection
        const connection = await amqp.connect(amqpUrl);
        console.log('Connected to RabbitMQ');

        // Create a channel
        const channel = await connection.createChannel();
        console.log('Channel created');

        // Declare a queue
        const queue = 'test_queue';
        const queue1 = "queue1"
        const queue2 = "queue2"
        const queue3 = "queue3"
        const queue4 = "queue4"
        await channel.assertQueue(queue, { durable: false });
        await channel.assertQueue(queue1, { durable: false });
        await channel.assertQueue(queue2, { durable: false });
        await channel.assertQueue(queue3, { durable: false });
        await channel.assertQueue(queue4, { durable: false });
        console.log(`Queue "${queue}" created`);

        // Send a message
        const message = 'Hello, RabbitMQ!';
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Sent message: "${message}"`);

        // Close the connection after a timeout (for demonstration purposes)
        setTimeout(() => {
            connection.close();
            console.log('Connection closed');
        }, 500);
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

connect();
