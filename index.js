import app from "./app.js"
import { connectDB } from "./config/connection.js";
import { envConfig } from "./config/envConfig.js";

app.get("/", () => {
    console.log("testing")
})


const port = envConfig.port
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Tamba server running on port ${port}`);
  });
});




