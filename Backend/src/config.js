import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 9090,
};
