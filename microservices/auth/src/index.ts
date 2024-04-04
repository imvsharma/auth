import app from './app';
import config from './config/config'
import dotenv from 'dotenv'

dotenv.config();

const port = config.port

app.listen(port, () => {
  console.log(`[server]: Server is running at :${port}`);
});