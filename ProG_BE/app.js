import express from 'express';

const app = express();
const router = express.Router();
app.set("env", "development");
app.set("port", process.env.PORT || 4000)
app.set('trust proxy', true)
app.set('json spaces', 4);
app.set('case sensitive routing', true)
app.set('strict routing', true)

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app