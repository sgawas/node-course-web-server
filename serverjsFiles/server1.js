const express = require('express');

var app= express();

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) =>{
    //res.send('<h1>hello world!</h1>');
    res.send({
        name: 'suraj',
        country: 'India',
        cities: [
            'Panaji',
            'Bangalore'
        ]
    });
});

app.get('/about',(req,res)=>{
    res.send('about page');
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
});