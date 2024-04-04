import amqp, {Channel, Connection} from 'amqplib';
import config from '../config/config';

class MessageBroker {
    private connection!: Connection;
    channel!: Channel;

    queue: string
    

    constructor (queue: string) {
        this.queue = queue;
        //this.init()
    }

    async init () {
        // Establish connection to RabbitMQ server
        console.log("Establish connection to RabbitMQ server")
        this.connection = await amqp.connect(config.msgBrokerURL!);
        console.log("RabbitMQ server connected successfully")
        this.channel = await this.connection.createChannel();
        console.log("RabbitMQ channel created successfully")
        // Asserting queues ensures they exist
        await this.channel.assertQueue(this.queue);
    }

    public async sendMessage (msg: any) {
        await this.init()
        this.channel.sendToQueue(this.queue, Buffer.from(msg));
        console.log("send message")
        //this.channel.ack(msg)
    }

    public async recieveMessage () {
        this.channel.consume(this.queue, (msg) => {
            return msg?.content.toString()
        })
    }

    async close() {
        if (this.channel) await this.channel.close();
        await this.connection.close();
      }
}

export default MessageBroker;