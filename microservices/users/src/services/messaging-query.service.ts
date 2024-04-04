import amqp, {Channel, Connection} from 'amqplib';
import config from '../config/config';
// import { getByUsername } from './user.service';
import toUser from '../controller/user/user.mapper';


class MessageBroker {
    private connection!: Connection;
    private channel!: Channel;

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
        //console.log(this.channel)
        await this.channel.assertQueue(this.queue);
    }

    public async sendMessage (msg: any) {
        
        this.channel.sendToQueue(this.queue, Buffer.from(msg));
        this.channel.ack(msg)
    }

    async recieveMessage () {
        
        await this.channel.consume(this.queue, async (msg) => {
            // console.log(msg?.content.toString())
            // let data = JSON.parse(msg?.content.toString()!)
            // console.log(data)
            // let userDetails = await getByUsername(data.username)
            // if (userDetails) {
            //     console.log(toUser(userDetails!));
            //     const responseData = {"success": false, "message": "User already registered"}
            //     await this.channel.sendToQueue("got-user-details", Buffer.from(JSON.stringify(responseData)) )
            // } else {
            //     console.log("userDetails else");
            //     console.log(userDetails)
            // }
            

            
            
        }, {
            // automatic acknowledgment mode,
            // see /docs/confirms for details
            noAck: true
          })

        
    }
}

export default MessageBroker