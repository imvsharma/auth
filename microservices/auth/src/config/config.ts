import { config } from "dotenv";

config();
const { AUTH_PORT, MESSAGE_BROKER_URL } = process.env;

export default {
    port: AUTH_PORT,
    msgBrokerURL: MESSAGE_BROKER_URL,
};