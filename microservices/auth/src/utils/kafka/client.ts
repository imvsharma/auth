import { Kafka } from "kafkajs";

const kafka:Kafka = new Kafka({
    clientId: 'react-auth',
    brokers: [`${process.env.KAFKA_URL}`]
})

export default kafka