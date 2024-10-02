"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { handleInterviewSubmission } from "./actions";
import { useRouter } from "next/navigation";

const AddInterview = () => {
  const [opendialog, setopendialog] = useState(false);
  const [jobposition, setjobposition] = useState("");
  const [jobdesc, setjobdesc] = useState("");
  const [experience, setexperience] = useState("");
  const [loading, setloading] = useState(false);
  const {user} = useUser();
  const router=useRouter();

  const onsubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(loading)
 console.log(jobdesc)
 console.log(user?.primaryEmailAddress?.emailAddress)
    
   

    const result = await handleInterviewSubmission({
      jobposition: jobposition,
      jobdesc:jobdesc,
      experience: experience,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });

    console.log(result);
    console.log(result.data);
    setloading(false);

    if (result.status === 'success') {
      setopendialog(false); // Close dialog on success
      router.push("/dashboard/interview/"+result.data.mockId)
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div
        className=" p-5 md:p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer
         transition-all border-dashed w-[40vw] md:w-[20vw] flex items-center justify-center my-4 md:my-6
         "
        onClick={() => setopendialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={opendialog}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tell us more about your job interviewing</DialogTitle>
            <DialogDescription>
              <form onSubmit={onsubmit}>
                <div className="flex gap-2 flex-col">
                  <div className="mt-7 my-3">
                    <label>Job Position/Job Role</label>
                    <Input
                      name="jobposition"
                      placeholder="Full Stack Developer"
                      required
                      onChange={(e) => setjobposition(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Description</label>
                    <Textarea
                      name="jobdesc"
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      required
                      onChange={(event) => setjobdesc(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years Of Experience</label>
                    <Input
                      name="experience"
                      placeholder="6"
                      type="number"
                      required
                      onChange={(e) => setexperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setopendialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-900" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddInterview;
