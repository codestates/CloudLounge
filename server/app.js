const express=require('express');
const cors=require('cors');

const app=express();
const PORT=80;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods:'*'
  })
)

app.get('/',function(req,res){
  res.cookie("cookie","token",{secure:true,sameSite:"none"}).send('response for GET request');
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