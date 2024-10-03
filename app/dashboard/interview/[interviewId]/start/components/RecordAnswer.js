import Image from 'next/image';
import React,{useState,useEffect} from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import recordUserAnswer from './actions';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast"

const RecordAnswer = ({interviewques,mockresp,activeques,setacitveques}) => {
  

  console.log(mockresp)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    const [webcam,setwebcam]=useState(true);
    const [voice,setvoice]=useState("");
    const {user}=useUser();
    const email=user?.primaryEmailAddress?.emailAddress;
    const { toast } = useToast()


   // This effect listens for changes in results and updates the voice state
   useEffect(() => {
    if (results) {
      const updatedVoice = results.map((result) => result?.transcript).join(" ");
      setvoice(updatedVoice); // You may want to append or replace based on your needs
    }
  }, [results]);

  // This effect triggers when recording stops, and the voice length exceeds 10 characters
  useEffect(() => {
    if (!isRecording && voice?.length > 10) {
      console.log("mark1")
      updateUser(); // Ensure that the updateUser function is defined and working
    }
  }, [isRecording,voice]);

 if(!isRecording && voice?.length > 10){
    console.log(voice)
 }

const setRecording= () => {
    if (isRecording) {
      stopSpeechToText();
      console.log("yes");
    } else {
      startSpeechToText();
      console.log("no");
    }
  };

const updateUser = async () => {
    try{
        
        const useranswer=await recordUserAnswer(interviewques,activeques,voice,mockresp,email);
        console.log(useranswer.data)
        toast({
          title: "Record successfully"
         
        })

    }catch(error){
        console.error(error);
    }
}

  return (
    <div className="w-[50vw] flex  flex-col items-center justify-center">
          <div className="flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-5">
          <Image
          src={"/image.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 400,
            width: 400,
           
          }}
        />

        
           
          </div>
          <div className="mt-6 flex flex-col items-center justify-center ">
      
      <button onClick={setRecording}>
      {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </button>
     
     <div className="flex flex-row gap-2 mt-6">
     {activeques!=0 && <Button onClick={()=>setacitveques(activeques-1)}>Prev</Button> }
     {activeques!=4 && <Button onClick={()=>setacitveques(activeques+1)}>Next</Button> }
          <Link href={`/dashboard/interview/${mockresp?.mockId}/feedback`}>
          {activeques==4 && <Button>End Interview</Button>}
          </Link>
     </div>
     <ul>
  {results.map((result, index) => (
    <li key={index}>{result.transcript}</li>
  ))}
</ul>
    </div>
 
        
    </div>
  )
}

export default RecordAnswer
