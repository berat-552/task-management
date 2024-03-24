import dotenv from "dotenv";
import connectDb from "./config/dbConnection";
import createServer from "./util/server";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import authenticateToken from "./middleware/authenticateToken";

dotenv.config(); // load environment variables

connectDb();
const app = createServer();

const port = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use("/api/v1/tasks", authenticateToken, taskRoutes);

app.use("/api/v1/auth", userRoutes);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
