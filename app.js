const express = require("express");

const app = express();
app.use(express.json())

let courses = [
    {id : 1 , name : "React"},
    {id : 2 , name : "Machine Learning"},
    {id : 3 , name : "Database"}
];

app.get("/", (req,res) =>{
    res.send("Welcome to world of API's");
});

//Read
app.get("/courses", (req,res) => {
    res.send(courses);
});

//Read a specific course
app.get("/courses/:id", (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course with given ID does not exist");
        return;
    }
    res.send(course);
})

//Create
app.post("/courses/add", (req,res) => {
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("Course name required and need to be minimum of 3 characters");
        return;
    }
    const course = {
        id : courses.length+1,
        name : req.body.name
    }
    courses.push(course);
    res.send(courses);
});


//Update
app.put("/courses/update/:id", (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(400).send("Course ID not found");
        return;
    }

    course.name = req.body.name;
    res.send(courses);
});

//Delete
app.delete("/courses/delete/:id", (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(400).send("Course ID not found");
        return;
    }

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses);
});



app.listen(4000, () => console.log("Server is running on 4000"));