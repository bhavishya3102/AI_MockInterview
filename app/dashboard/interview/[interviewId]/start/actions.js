"use server"
import connectDb from '@/lib/connectDb'
import mockInterviewSchema from '@/utils/mockInterviewSchema';


const InterviewQuestion = async (id) => {

    
try{
await connectDb();
const result=await mockInterviewSchema.findOne({mockId:id})
console.log(result)
return {result}

}catch(error){
    console.log(error)
}
}

export default InterviewQuestion
