import express from 'express';
const app = express();

app.set("env", "development");
app.set("port", process.env.PORT || 4000)
app.set('trust proxy', true)
app.set('json spaces', 4);
app.set('case sensitive routing', true)
app.set('strict routing', true)
export default app