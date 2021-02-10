const express = require("express");
const app=express();
const mongoose=require("mongoose");
const classroomRouter=require("./routers/classroom");
const teacherRouter=require("./routers/teacher");
const studentRouter = require("./routers/studentRoutes");
const examRouter = require("./routers/examRoutes");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const PORT=process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// mongoose.connect(process.env.MONGODB_URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology: true,
//     useCreateIndex:true,
//     useFindAndModify:true
// })
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection was successful !'));
const db=mongoose.connection;
db.on("error",(error)=>{
    console.error(error);
    process.exit(1);
})
db.once("open",()=>{
    console.log("Connected to MongoDB database");
})

app.use('/classroom',classroomRouter);
app.use("/teacher",teacherRouter);
app.use("/student",studentRouter);
app.use("/exam",examRouter);

//Serve the static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname, ' client ',' build ','index.html'));
  });
}
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Could not find the url ${req.originalUrl} on this server!`,
      404
    )
  ); 
});

app.use(globalErrorHandler);

app.listen(PORT,()=>{
    console.log(`Port running at ${PORT}`);
});