import { config } from "dotenv";

config();
const { USER_MS_PORT, MESSAGE_BROKER_URL } = process.env;

export default {
    port: USER_MS_PORT,
    msgBrokerURL: MESSAGE_BROKER_URL,
};