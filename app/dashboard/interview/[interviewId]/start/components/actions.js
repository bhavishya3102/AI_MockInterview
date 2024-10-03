"use server"
import connectDb from '@/lib/connectDb'
import { chatSession } from '@/utils/GeminiModel';
import userAnswerSchema from '@/utils/userAnswerSchema';
import moment from 'moment';
import React from 'react'

const recordUserAnswer = async (interviewques,activeques,voice,mockresp,email) => {
    
    console.log(interviewques[activeques].question)
  
    console.log(voice)
    

try{
await connectDb();

const prompt="Question:"+interviewques[activeques].question+",userAnswer:"+voice+
",Depends on question and user answer for give interview question, please give us rating for answer and feedback as area of improvmenet if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field. Dont give me ANY extra info. Just give me json format";

const resp=await chatSession.sendMessage(prompt);
const result=resp.response.text().replace("```json", "")
.replace("```", "");
const jsonresult=JSON.parse(result)
console.log(jsonresult.feedback)

const useranswer_save=await userAnswerSchema.create({
    mockIdRef: mockresp.mockId,
    question: interviewques[activeques].question,
    correctAns: interviewques[activeques].answer,
    userAns: voice,
    feedback: jsonresult.feedback,
    rating: jsonresult.rating,
    userEmail: email,
    createdAt: moment().format("DD-MM-YYYY")
})

return {data:useranswer_save}

}catch(error){
    console.log(error)
}
}

export default recordUserAnswer
