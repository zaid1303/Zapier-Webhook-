import express from "express";
import { zapRouter } from "./routes/zap";
import { userRouter } from "./routes/user";
import cors from "cors";
import { triggerRouter } from "./routes/trigger";
import { actionRouter } from "./routes/action";

const app=express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter);

app.use("/api/v1/zap",zapRouter);

app.use("/api/v1/trigger",triggerRouter);
app.use("/api/v1/action",actionRouter);

app.listen(3000)