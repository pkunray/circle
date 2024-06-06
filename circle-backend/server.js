import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

const swaggerDocument = YAML.load('./swagger.yaml');

//Middlewares
app.use(express.json()); //To parse JSON data in the req.body
app.use(express.urlencoded({extended: true})); //To parse form data in the req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));