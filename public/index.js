var express = require('express');
var app = express();
var http = require("http").createServer(app);
var formidable = require("formidable");
var fs = require("fs");

app.set("view engine", "ejs");

http.listen(4000, function () {
    app.get("/", function (request, result) {
        result.render("index");
    });

    app.post("/upload", function (request, result) {
        var formData = new formidable.IncomingForm();
        formData.parse(request, function (error, fields, files) {
            var extension = files.file.name.substr(files.file.name.lastIndexOf("."));
            var newPath = "uploads/" + fields.fileName + extension;
            fs.rename(files.file.path, newPath, function (errorRename) {
                result.send("File saved = " + newPath);
            });
        });
    });
})