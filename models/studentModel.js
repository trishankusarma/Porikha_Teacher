const mongoose=require("mongoose");
const validator=require("validator");

const studentSchema =new mongoose.Schema({
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
  phoneNumber:{
    type:Number,
    required:true,
    trim:true,
    minlength:10
  },
  institution:{
    type:String,
    trim:true,
    required: true
  },
  email:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error("Email invalid");
          }
      }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:6
  },
  marks: {
    type: []
  },
  status: {
    type: String,
    default: 'Unchecked'
  }
}, {timestamps:true} );

const Student = mongoose.model("Student",studentSchema);
module.exports=Student;