"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"
const page = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/hackathon')
  },[]);
  return (
    <div>
    </div>
  )
}

export default page