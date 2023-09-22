'use client'
import { useState } from "react"
import supabase from "./config/supabaseClient"
import Form from "./components/Form"


export default function Index() {

  return (
    <div 
    className="w-full">
      <Form/>
    </div>
  )
}
