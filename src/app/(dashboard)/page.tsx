"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/hackathon')
  },[])

  return (
    <div>
      Home page
    </div>
  )
}

export default page