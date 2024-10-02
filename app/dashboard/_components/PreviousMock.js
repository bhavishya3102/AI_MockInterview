"use client"
import React,{useEffect,useState} from 'react'
import { Previous_Mock } from './actions'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  

const PreviousMock = () => {

const [prevMock,setprevMock]=useState([]);
const router=useRouter();
    useEffect(() => {
    const fetchdata=async ()=>{
        const resp=await Previous_Mock();
        console.log(resp.data)
        setprevMock(resp.data)

    }
    fetchdata();
    }, [])
  return (
    <div>
      <h2 className="text-2xl text-blue-900 font-bold">Previous Mock Interview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">

        {
            prevMock && prevMock.map((item, index) => (
                <Card  className="p-4">
                <CardHeader>
                  <CardTitle>{item.jobPosition}</CardTitle>
                  <CardDescription>{item.jobExperience} Year of Experience</CardDescription>
                <CardDescription>CreatedAt:{item.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} </CardDescription>
                  
                </CardHeader>
               <div className="flex  gap-4 ml-5">
               <button className="px-4 py-2 bg-gray-400 text-black rounded-md"
               onClick={()=>router.push(`/dashboard/interview/${item.mockId}/feedback`)}>Feedback</button>
               <button className="px-4 py-2 bg-blue-800 text-white rounded-md"
               onClick={()=>router.push(`/dashboard/interview/${item.mockId}`)}>Start</button>
               </div>
              </Card>

            ))
        }
      </div>
   

    </div>
  )
}

export default PreviousMock
