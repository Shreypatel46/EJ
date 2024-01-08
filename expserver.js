const express =require('express');
const app = express();
const path= require('path');
const cors=require('cors');
const corseOptions =require('./config/corseOptions')
const logEvents= require('./middleware/logevent');
const verifyJWT =require('./middleware/verifyJWT');
const cookieParser =require('cookie-parser');
const PORT = process.env.PORT || 4500;
// custom middlawrre

app.use((res,req,next)=>{
    logEvents(`${res.method}\t${res.headers.origin}\t${res.url}`,'explog.txt')
    console.log(`${res.method} ${res.path}`);
    next();
});
app.use(cors());

//  middleware -- it is used to handle anything btw response and request 
// when form data is submitted and to handle that we use middleware we get submitted data as parameter also to handle css ,img to load at respond point 
app.use(express.urlencoded({extended:false}));

//built in middleware for json
app.use(express.json());

// middlewarre for cookies
app.use(cookieParser());

// serve static file css ,jpeg, js etc
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));
//routes
app.use('/subdir',require('./routes/subdir'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/LogOut',require('./routes/logOut'));
// verify is custom middleware after these line all middle ware will hv verifyjwt applied
app.use(verifyJWT);
app.use('/employee',require('./routes/api/employee'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'day-2','index.html'));
});

app.get('^/*$',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'day-2','404.html'));
});
//route handlers
app.get('/hello(.html)?',(req,res,next)=>{
    console.log("attempted for hello");
    next();
},(req,res)=>{
    res.send('hello world!');
});
//chain routing
const one =(req,res,next)=>{
    console.log('one');
    next();
}
const two =(req,res,next)=>{
    console.log('two');
    next();
}
const three =(req,res,next)=>{
    console.log('three');
    res.send('finshied');
}
app.get('/chain(.html)?',[one,two,three]);
// error handler 
app.use(function(err,res,req,next){
    // logEvents(`${err.name} : ${err.message}`,'errlog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
})  
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

