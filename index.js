const express = require("express");
var cors = require('cors')
const blogs = require("./db/blogs");

const app = express();
app.use(cors())

app.use(express.json());

app.get('/blogs', (req,res) => {
    res.status(200).send(blogs);
});

app.post('/blogs', (req,res) => {
    const body = req.body;

    if(body.description === undefined) {
        res.status(400).send({
            message: "A description is required!!"
        });
    }

    const newBlog = {
        id: Math.floor(Math.random() * 5000),
        description: body.description,
        author: body.author
    };
    blogs.push(newBlog);

    res.status(201).send({
        message: "New Blog created!!",
        data: newBlog
    });
});

app.put('/blogs/:id', function(req,res) {
    
    const id = req.params.id;
    const body = req.body;

    if(body.description === undefined) {
        res.status(400).send({
            message: "A description is required!!"
        });
    }

    let objectIndex = blogs.findIndex((obj => obj.id == id));
    if(objectIndex === -1){
        res.status(404).send({
            message: "Invalid ID"
        })
    }

    Object.assign(blogs[objectIndex], body);

    res.status(200).send({
        message: "The Blog updated!!!",
        data: body
    })
});

app.get('/blogs/:id', function (req, res) {
    
    const id = req.params['id'];

    if(id === undefined){
        res.status(400).send({
            message: "Invalid ID!!"
        });
    }

    var oneBlog = blogs.find(function(blog) {
        return blog.id == id;
    })
    if(!oneBlog){
        res.status(404).send({
            message: "Blog not found!!"
        })
    }
    res.send(oneBlog);
});

app.delete('/blogs/:id', function (req, res) {

    const id = req.params['id'];

    const indexOfBlog = blogs.findIndex(model => {
        return model.id === Number(id);
    })
    
    if(indexOfBlog === -1){
        return res.status(404).send({
            message: "Blog not found!!"
        })
    }

    blogs.splice(indexOfBlog, 1);

    res.status(200).send({
        message: "Blog deleted successfully!!"
    });
});

module.exports = app;