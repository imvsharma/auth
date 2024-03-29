import kafka from "./client";


const consume = async () => {
    const consumer = kafka.consumer({ groupId: "user-ms" })
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic: "user-ms" })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: async ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`)
		},
	})
}

export default consume
