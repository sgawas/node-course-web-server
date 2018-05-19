const express = require('express');
const hbs = require('hbs'); //hand bars view engines for express simillar to ejs or pug
const fs = require('fs');

const port = process.env.port || 3000;
var app= express();

hbs.registerPartials(__dirname + '/views/partials');  // partials, takes piece code which is common
app.set('view engine', 'hbs'); // key value pair. Telling express which view engine we like to use.
//app.use(express.static(__dirname + '/public'));  //app.use register middleware

app.use((req,res,next)=>{

    var now = new Date().toString();

    var log = `${now} :${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n',(err) => {
        if(err){
            console.log('Unable to find the file.');
        }
    })
    next(); // without next(), code will not execute remaining commands
})

// app.use((req,res,next)=>{

//     res.render('maintenance.hbs',{
//         pageTitle : 'Site Maintenance',
//         message : 'Site is down for maintenance. Sorry for the inconvenience, will be back online tomorrow!'
//     });
// })
app.use(express.static(__dirname + '/public'));  //app.use register middleware
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle: 'home page',
        message: 'Welcome to home page',
        name: 'Suraj'
    //    currentYear: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    //res.render('about.hbs');
    res.render('about.hbs',{
      pageTitle: 'About Page'
    //  currentYear : new Date().getFullYear() 
    });
});

app.get('/projects',(req,res)=>{
    //res.render('about.hbs');
    res.render('projects.hbs',{
      pageTitle: 'Projects Page'
    //  currentYear : new Date().getFullYear() 
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
})

// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  })

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});