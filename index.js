import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res) => {
    var a = fs.readdirSync('blogs');
    res.render("index.ejs", {
        name: a
    });
});

app.get("/home", (req, res) => {
    res.redirect("/");
});

app.get("/createPost", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/removePost", (req, res) => {
    var a = fs.readdirSync('blogs');
    res.render("removePost.ejs", {
        name: a
    });
});

app.get("/myPosts", (req, res) => {
    var a = fs.readdirSync('blogs');
    res.render("myPosts.ejs", {
        name: a
    });
});

app.post("/rdPost", (req, res) => {
    let c = req.body.blogs;
    fs.unlink("./blogs/" + c.trim(), (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
    });
    res.redirect("/removePost");
});

app.post("/content", (req, res) => {
    let c = req.body.clickedAnchor;
    const data = fs.readFileSync("./blogs/" + c.trim(),
        { encoding: 'utf8', flag: 'r' });
    res.render("content.ejs", {
        data: data,
        name: c
    });
});

app.post("/submit", (req, res) => {
    fs.writeFile("blogs/" + req.body.title, req.body.text, function (err) {
        if (err) throw err;
    });
    res.redirect("/createPost");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});