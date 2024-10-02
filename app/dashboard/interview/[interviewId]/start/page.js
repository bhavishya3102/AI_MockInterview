

"use client"
import React,{useState,useEffect } from 'react'
import QuestionInterview from './components/QuestionInterview'
import InterviewQuestion from './actions'
import RecordAnswer from './components/RecordAnswer'


const start =  ({params}) => {
  const [interviewques,setinterviewques]=useState()
  const [mockresp,setmockresp]=useState()
  const [activeques,setactiveques]=useState(0)
  const [loading,setloading]=useState(true)

  useEffect(()=>{
    const fetchdata=async ()=>{
      try{
        const resp=await InterviewQuestion(params.interviewId);
        console.log(resp.result);
        setmockresp(resp.result)
        console.log(resp.result.jsonMockResp)
        const ques=JSON.parse(resp.result.jsonMockResp);
        console.log(ques.questions)
     
        setinterviewques(ques.questions)
      }catch(error){
console.log(error)
      }
      finally{
setloading(false)
      }




    }
    fetchdata();
  },[params.interviewId])

  if(loading){
    return <div>loading...</div>
  }
  


  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-center" >

      <QuestionInterview interviewques={interviewques} mockresp={mockresp} activeques={activeques}/>
      <RecordAnswer interviewques={interviewques} mockresp={mockresp} activeques={activeques} setacitveques={setactiveques}/>
    </div>
  )
}

export default start
