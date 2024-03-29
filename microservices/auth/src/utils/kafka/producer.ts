import kafka from "./client";

const sendMessage = async (topic: string, key: string, data: any) => {
    try {
        const producer = await kafka.producer();
        await producer.connect();
        await producer.send({
            topic,
            messages: [
                {
                    key, 
                    value: JSON.stringify(data)
                }
            ]
        })
        await producer.disconnect()
    } catch (error) {
        console.log("Error in sending messaging to Kafka", error)
    }
    
}