var express = require('express');
var path = require('path');
var bp = require('body-parser');
var fs = require('fs');

var app = express();

app.use (express.static(path.join(__dirname, 'static')));
app.use(bp.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(index.html);
});

app.get('/skills', function(req, res) {
    var skills = fs.readFileSync('./data.json');
    skills = JSON.parse(skills);
    res.render('skills', {skills: skills});
});

app.get('/skills/new', function(req, res) {
    res.sendFile(path.join(__dirname, '/static/new.html'));
});

app.post('/skills', function(req, res) {
      var skills = fs.readFileSync('./data.json');
    skills = JSON.parse(skills);
    skills.push({name: req.body.name, level: req.body.level});
    fs.writeFileSync('./data.json', JSON.stringify(skills));
    res.redirect('/skills');
});

app.listen(process.env.PORT || 3000);
