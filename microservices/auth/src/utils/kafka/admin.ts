import kafka from "./client";

const kafkaAdminInit = async () => {
    const admin = kafka.admin();
    console.log("Connection to Kafka admin");
    await admin.connect();
    console.log("Connected to Kafka admin");
    // await admin.createTopics({
    //     topics: [{topic: "user-ms", numPartitions: 1, replicationFactor: 1 }]
    // })
    await createTopic(admin)

    await admin.disconnect()
    console.log("Disconnected to Kafka admin")
}

const createTopic = async (admin:any) => {
    const topic = {
        topic: "user-ms", 
        numPartitions: 1, 
        replicationFactor: 1 
    }

    try {
        const getTopics = await getAllTopics(admin);
        if (getTopics.includes("user-ms")) {
            console.log("Topic already created")
            return
        } else {
            await admin.createTopics({
                topics: [topic],
            });
            console.log('Topic created successfully');
        }
        
      } catch (error) {
        console.error(`Error creating topic: ${error}`);
      } finally {
        await admin.disconnect();
      }
}

const getAllTopics = async (admin:any) => {
    try {
        return await admin.listTopics()
    } catch (error) {
        console.error(`Error getting topics: ${error}`);
    }
}

export default kafkaAdminInit;