import React from 'react'
import { useActionState } from 'react';
import { NavLink, useParams } from 'react-router-dom';



async function ApplyJobAction(_,formData) {
 
    const res = await fetch('http://127.0.0.1:8001/apply/',
       {
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(
            {
                job:jobId,
            applicat:userId
            }
        )
       } 
    );
    
    const data = await res.json();
    if (res.ok){
        return {message:data.message, success:true}
    }
    else{
        return {message: data.message, success:false}
    }
}


export default function ApplyjobPage() {

    const {jobId} =useParams();
    const userId=localStorage.getItem("userId");
    
    const [result,formAction, isPending] = useActionState(ApplyJobAction,
             null,{withPending: true})

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">


    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>
  
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-blue-700">Jobs</a>
          <a href="#" className="hover:text-blue-700">Companies</a>
          <a href="#" className="hover:text-blue-700">My Applications</a>
        </nav>
  
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hello, Sashi</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
            S
          </div>
        </div>
      </div>
    </header>
  

    <main className="min-h-[calc(100vh-140px)] px-4">
  

      <div className="max-w-7xl mx-auto pt-6">
        <NavLink
          to ={"/jobs"}
          className="inline-flex items-center gap-2 mb-4
                 text-sm font-medium text-blue-600
                 hover:text-blue-700 hover:underline"
        >
          ← Back to Jobs
        </NavLink>
      </div>
  

      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-md rounded-lg border bg-white p-6">
  
          <h2 className="text-lg font-semibold text-gray-900">
            Apply for this job
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your profile will be shared with the recruiter
          </p>
  
          <form action={formAction} className="mt-5 space-y-4">
  
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 py-2.5
                     font-semibold text-white
                     hover:bg-blue-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isPending ? "Applying..." : "Apply Now"}
              
            </button>
  
          
            {
            result && < p className={`text-center text-sm ${result.success ?  "text-green-600" : "text-red-600"}`}>
              {result.message}
            </p>
            }

          </form>
        </div>
      </div>
  
    </main>
  

    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
        © 2026 JobPortal.com | All rights reserved
      </div>
    </footer>
  
  </div>
  )
}
