"use server"
import connectDb from '@/lib/connectDb'
import userAnswerSchema from '@/utils/userAnswerSchema'
import { connect } from 'http2'
import React from 'react'

const feedback_detail = async (id) => {
 try{
await connectDb()
const feedback=await userAnswerSchema.find({mockIdRef:id}).sort({_id:1}).exec();
console.log(feedback)

return{data:feedback}
 }catch(error){
    console.log(error)
 }


}

export default feedback_detail
