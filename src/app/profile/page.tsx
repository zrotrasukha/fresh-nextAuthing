"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {toast} from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  
  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.success('Logged out successfully') 
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
       
    }
  }
  const getUsersDetails = async () => {
    try {
      const response = await axios.get("api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="flex justify-center items-center bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        onClick={getUsersDetails}
      >
        Get User Details
      </button>
      <button className="flex justify-center items-center bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      onClick={logout}>
        Logout
      </button>
    </div>
  );
}
