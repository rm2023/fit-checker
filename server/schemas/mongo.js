const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost3000/react-login-tut")
.then(()=>{
    console.log("mongodb");
})
.catch(()=>{

})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection