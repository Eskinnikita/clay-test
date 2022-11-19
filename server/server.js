const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const answerTypesRouter = require("./routers/answerTypesRouter");
const clayParametersRouter = require("./routers/clayParametersRouter");
const questionsRouter = require("./routers/questionsRouter");
const answerVariantsRouter = require("./routers/answerVariantsRouter");
const answerRulesRouter = require("./routers/answerRulesRouter");
const answerRouter = require("./routers/answersRouter");

require("dotenv").config();
const port = process.env.PORT;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/answer-types", answerTypesRouter);
app.use("/clay-parameters", clayParametersRouter);
app.use("/questions", questionsRouter);
app.use("/answer-variants", answerVariantsRouter);
app.use("/answer-rules", answerRulesRouter);
app.use("/answers", answerRouter);

const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.jzchioq.mongodb.net/test`
    );
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
