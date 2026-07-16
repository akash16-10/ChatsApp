import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectDB } from './db/db.js';
import { ENV } from './utils/env.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { app, server } from './utils/socket.js';


const port = ENV.PORT;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(cors({origin:ENV.CLIENT_URL, credentials : true}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
