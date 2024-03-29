
import { KafkaClient, Consumer } from "kafka-node";

const client: KafkaClient = new KafkaClient({kafkaHost:  process.env.KAFKA_URL})

//const getConsumer(topic)