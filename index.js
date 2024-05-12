const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authentication = require("./db/authentication");
const model_askquestion = require("./model/Aksquestions");
const model_answer = require("./model/Answer")
const port = 8080;
authentication();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  model_askquestion
    .findAll({ raw: true, order: [["id", "DESC"]] })
    .then((e) => {
      res.render("index", {
        perguntas: e,
      });
    });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/collectData", (req, res) => {
  const formTitle = req.body.form_title;
  const formQuestion = req.body.form_question;
  model_askquestion
    .create({
      title: formTitle,
      description: formQuestion,
    })
    .then(() => {
      res.redirect("/");
    });
});


app.get("/question/:id", (req, res) => {
  const id = req.params.id;
  //findAll = array de objetos
  //findOne = apenas o objeto
  model_askquestion.findOne({ where: { id: id } }).then((questions) => {
    if (questions != undefined) {
      model_answer.findAll({
        where:{
          questionid: id
        }, raw: true,
        order: [["id", "DESC"]]
      }).then((anwers)=>{
        res.render("questions", {
          perguntas: questions,
          respostas: anwers
        });
      })
    } else {
      res.redirect("/");
    }
  });
});

app.post("/collectDataAnswer", (req,res)=>{
  const answere = req.body.answere;
  const questionid = req.body.questionid;
  model_answer.create({
    description: answere,
    questionid: questionid
  }).then((e)=>{
    res.redirect("/question/" + questionid)
  })
})

app.listen(port, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("open servidor");
  }
});
