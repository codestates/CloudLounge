const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')

const app=express();
const PORT=80;

app.use(
  cors({
    origin: "https://cloudlounge.tk",
    credentials: true,
    methods:'*'
  })
)

app.use(cookieParser());

app.get('/',function(req,res){
  res.cookie("cookie","token",{
    secure:true,
    sameSite:"none",
    httpOnly,
    domain:"cloudlounge.tk"
  }).send('response for GET request');
})

app.get('/cookietest',function(req,res){
  res.send(req.cookies);
})

app.post('/',function(req,res){
  res.send('response for POST request');
})

app.patch('/',function(req,res){
  res.send('response for PATCH request');
})

app.put('/',function(req,res){
  res.send('response for PUT request');
})

app.delete('/',function(req,res){
  res.send('response for DELETE request');
})

app.listen(PORT,()=>{
  console.log('server running');
})