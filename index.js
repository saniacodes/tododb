const express = require("express")
const mongoose = require("mongoose")
const body = require("body-parser")
const app = express()
app.set('view engine', 'ejs')
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))



mongoose.connect('mongodb+srv://fathimasania789:madiha8001@cluster0.xiwqsq7.mongodb.net/tododb',{useNewUrlParser:true})

const todoschema = new mongoose.Schema({task:String})
const todomodel = mongoose.model('tasks', todoschema)
//const t1 = todomodel({task:"gaming"})
//const t2 = todomodel({task:"studying"})
//const t3 = todomodel({task:"playing"})

//t2.save()
//t3.save()

//t1.save()
var lists = []


app.get("/",function(req,res){

    todomodel.find().then((result) => {
        res.render("index",{tasks:result})

    }).catch((err) => {
        console.log(err)
    });


    
})

app.post("/",function(req,res){
var todotask = req.body.task
//console.log(task)
//lists.push(task)

const task = new todomodel({task:todotask})
task.save()
res.redirect("/")

})

app.post("/delete",function(req,res){
    var item = req.body.checkbox
    todomodel.deleteOne({_id:item}).then((result) => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    });
})


app.listen(process.env.PORT||3000, function() {
    console.log("server is up and running")
})