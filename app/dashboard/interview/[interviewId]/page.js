"use client";
import { useEffect, useState } from "react";
import interviewPermission from "./actions";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = ({ params }) => {
  const [data, setData] = useState(null); // Initialize with null or an appropriate default value

  const [webcam, setwebcam] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(params.interviewId);
        const result = await interviewPermission(params.interviewId); // Await the Promise
        console.log(result.response);
        setData(result.response); // Set the resolved value
      } catch (error) {
        console.error("Error fetching interview permission:", error);
        // Handle error if necessary
      } 
    };

    fetchData(); // Call the async function
  }, [params.interviewId]); // Add params.interviewId as a dependency



  return (
    <div>
      <h1 className="text-lg font-bold">Interview Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {data?.jobPosition}{" "}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {data?.jobDesc}{" "}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>
              {data?.jobExperience}{" "}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              {" "}
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              This AI-generated mock interview platform requires you to enable
              your video webcam and microphone to begin. You'll answer 5-10
              questions, and afterwards, you'll receive a report based on your
              responses. It's important to note that your video is never
              recorded, and you can disable webcam access at any time.{" "}
            </h2>
          </div>
          
        </div>
      <div>
        {webcam ? (
          <div className="flex items-center justify-center">
            <Webcam
              onUserMedia={() => setwebcam(true)}
              onUserMediaError={() => setwebcam(false)}
              mirrored={true}
              style={{
                height: 400,
                width: 400,
              }}
            />
          </div>
        ) : (
          <>
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
            <Button  className="w-full flex justify-center items-center" onClick={() => setwebcam(true)}>Enable the Webcam</Button>
          </>
        )}
      </div>
      </div>
      <div className="flex justify-end items-end my-4">
    
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
