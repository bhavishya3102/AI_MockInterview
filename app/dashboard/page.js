
import React from 'react'
import AddInterview from './_components/AddInterview';
import PreviousMock from './_components/PreviousMock';

  


const Dashboard = () => {
  
  return (
    <div >
     <h2 className="text-2xl font-bold my-4">Dashboard</h2>
     <div className="text-gray-500 font-semibold">Create and Start your AI mock Interview</div>
    <AddInterview/>

<PreviousMock/>


    </div>
  )
}

export default Dashboard
