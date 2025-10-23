import express from 'express';

//=> EXpress server setup 

const exapp = express();

exapp.use(express.static('dist'));// Server static files from the public foder

//start the Express server


exapp.listen(8000,()=>{
    console.log("Server is running on http://localhost:8000");
});