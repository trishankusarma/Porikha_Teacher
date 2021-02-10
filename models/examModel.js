const mongoose=require("mongoose");
const validator=require("validator");

const examSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  id:{
      type: Number,
      required:true,
      unique: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:6
  },
  institution:{
    type:String,
    trim:true
  },
  numberOfStudents: Number,
  totalMarks: {
      type: Number,
      required: true
  },
  passingMarks: {
      type: Number,
      required: true
  }
}, {timestamps:true} );

const Exam = mongoose.model("Exam",examSchema);
module.exports=Exam;