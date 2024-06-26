const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AppointmentService = require("./services/AppointmentService");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine','ejs');

mongoose.connect("mongodb://127.0.0.1:27017/agendamento",{useNewUrlParser:true,useUnifiedTopology:true});


app.get("/",(req,res)=>{
    res.render("index")
});

//rota pára o formulario
app.get("/cadastro",(req,res)=>{
    res.render("create");
});

//rota que executa o cadastro

app.post("/create",async(req,res)=>{

    var status = await AppointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.description,
        req.body.date,
        req.body.time
    );

    if(status){
        res.redirect("/");
    }else{
        res.send("Ocorreu um erro");
    }

})

app.get("/getcalendar", async(req,res)=>{

    var appointments = await AppointmentService.GetAll(false);

    res.json(appointments);

})

app.get('/event/:id', async (req,res)=>{

    var appointment = await AppointmentService.GetById(req.params.id);

    res.render("event",{appo: appointment});
    
   
})

app.post("/finish", async(req,res)=>{
    var id = req.body.id;
    await AppointmentService.Finish(id);
    res.redirect("/");
});

app.get('/list',async(req,res)=>{

    await AppointmentService.Search("ivan@teste.com.br");
    var appos = await AppointmentService.GetAll(true);
    res.render('list',{appos});
})

app.get('/searchresult', async (req,res)=>{
    
   var appos = await AppointmentService.Search(req.query.search);
   res.render('list',{appos});
})




var pollTime = 1000 * 60 * 5;

setInterval( async() =>{
    await AppointmentService.SendNotification();
},pollTime)

app.listen(8080,()=>{});