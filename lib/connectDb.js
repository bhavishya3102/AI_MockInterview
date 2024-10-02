
const mongoose=require('mongoose')

export default async function(){

   try{
    const dboptions={
        dbName:process.env.NEXT_PUBLIC_DB_NAME
    }
    const db=await mongoose.connect(process.env.NEXT_PUBLIC_DB_URL,dboptions);
    console.log("Connected to MongoDB");
   }
   catch(error){
console.log(error)
   }
}