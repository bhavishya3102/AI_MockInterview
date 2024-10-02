"use server";
import connectDb from '@/lib/connectDb';
import mockInterviewSchema from '@/utils/mockInterviewSchema';

const interviewPermission = async (id) => {
   console.log(id)
   await connectDb();
   const response=await mockInterviewSchema.findOne({mockId:id});
   console.log(response)
 return {response}

  
}

export default interviewPermission 
