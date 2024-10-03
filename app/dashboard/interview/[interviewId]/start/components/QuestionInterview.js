import { Lightbulb,  Volume2 } from 'lucide-react'
import React from 'react'

const QuestionInterview = ({interviewques,mockresp,activeques}) => {
console.log(interviewques)
console.log(activeques)
console.log(mockresp)
const speechtotext=(text)=>{
    if("speechSynthesis" in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);

    }
    else{
        alert("Sorry, Your browser does not support text to speech")
    }

}

  return (
    interviewques && ( <div className="p-5 border rounded-lg my-10  w-[80vw] md:w-[50vw]">
     
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">

     {
          interviewques.map((item,ind)=>{
            return (
            
                    <div className={` p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${activeques==ind && "bg-blue-950 text-white"}`}>
                   
                   #question {ind+1}
                   </div>
             

            )
        })
      }
     </div>
    
      <div>{interviewques[activeques].question}</div>
      <Volume2 onClick={()=>speechtotext(interviewques[activeques].question)}></Volume2>
      <div className="border rounded-lg p-5 bg-blue-100 mt-20 ">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            Click on Record Answer when you want to answer the question. At the
            end of the interview, we will give you the feedback along with
            correct answer for each of question and your answer to compare it.
          </h2>
        </div>
    </div>)
  )
}

export default QuestionInterview
