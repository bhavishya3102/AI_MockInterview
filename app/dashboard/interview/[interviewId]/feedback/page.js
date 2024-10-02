"use client"
import React,{useEffect,useState} from 'react'
import feedback_detail from './action';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
  

const page =  ({params}) => {
    console.log(params.interviewId)
    const [feedback,setFeedback]=useState([]);
    const router=useRouter()

useEffect(() => {
const fetchdata=async ()=>{
    try{
      
        const user_feedback=await feedback_detail(params.interviewId)
        console.log(user_feedback.data)
        setFeedback(user_feedback.data)
    
    }catch(error){
    
    }
}
fetchdata();
}, [params.interviewId])

return (
    <div>

        {
            feedback.length==0?(<h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>  
                ):(<>
                 <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
                 <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                 {
                    feedback.map((item,ind) => (
                        <Collapsible>
                        <CollapsibleTrigger className='p-2
             bg-secondary rounded-lg flex justify-between
            my-2 text-left gap-7 w-full'>{item.question}
                        <ChevronsUpDown className='h-5 w-5'/>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                        <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
               
               </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))
                 }
                 
                 </>)
        }
        <div className="mt-5">

<Button onClick={()=>{router.push("/dashboard")}}>Go to Home</Button>

        </div>
     
    </div>
  )
}

export default page
