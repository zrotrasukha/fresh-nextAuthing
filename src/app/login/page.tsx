"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [users, setusers] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  
  const onLogin = async () => {
    try {
      setLoading(true); 
      const response = await axios.post('api/users/login', users);
      console.log(response);
      router.push("/profile"); 

    } catch (error:any) {
      toast.error(error.message)
      console.log(error.message);
    } finally {
      setLoading(false); 
    }
  }
  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col">
      <div className="h-[400px] w-[500px] border-2 border-white flex flex-col justify-center items-center  px-8 rounded-xl">

        <input
          className="rounded-md w-[300px] border-2 border-white h-10 bg-black px-2 py-1 placeholder:font-bold mb-5"
          type="text"
          id="email"
          value={users.email}
          onChange={(e) => setusers({ ...users, email: e.target.value })}
          placeholder="email"
        />

        <input
          type="text"
          className="rounded-md w-[300px] border-2 border-white h-10 bg-black px-2 py-1 placeholder:font-bold mb-5"
          id="password"
          placeholder="password"
          value={users.password}
          onChange={(e) => setusers({ ...users, password: e.target.value })}
        />

        <button className={`border-2 ${loading ? "w-24" : "w-20"} px-2 py-1 rounded-md border-white` }
          onClick={onLogin}
        >
          {loading ? "processing" : "submit"}
        </button>
        <Link href={"/signup"}>Visit signup page</Link>

      </div>
    </div>
  );
}
