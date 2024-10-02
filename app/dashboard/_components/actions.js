
'use server';

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import connectDb from '@/lib/connectDb';
import { chatSession } from '@/utils/GeminiModel';
import mockInterviewSchema from '@/utils/mockInterviewSchema';

export async function handleInterviewSubmission({ jobposition, jobdesc, experience, userEmail }) {
   

  const prompt = `Job Position: ${jobposition}, Job Description: ${jobdesc}, Year Of Experience: ${experience}, please give the response in json format with 5 questions with answers.`;

  try {
    await connectDb(); // Connect to MongoDB

    const chatsession = await chatSession.sendMessage(prompt);
    const resp = chatsession.response.text().replace("```json", "").replace("```", "");
// const jsonresp=JSON.parse(resp);

    if (resp) {
      const create_resp = await mockInterviewSchema.create({
        mockId: uuidv4(),
        jsonMockResp:resp,
        jobPosition: jobposition,
        jobDesc: jobdesc,
        jobExperience: experience,
        createdBy: userEmail,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      return { status: 'success', message: 'Interview created successfully', data: create_resp };
    }
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}


export async function Previous_Mock(){
  try{
await connectDb();

const result=await mockInterviewSchema.find({});
console.log(result);
return {data:result}
  }catch(error){
    console.log(error)
  }
}