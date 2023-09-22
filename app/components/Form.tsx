import React from 'react'
import { useState } from 'react'
import supabase from '../config/supabaseClient'
import Result from './Result'

export default function () {
    const [hours, setHours] = useState<null | number>(null)
    const [minutes, setMinutes] = useState<null | number>(null)
    const [age, setAge] = useState<null | number>(null)
    const [zipCode, setZipCode] = useState<null | number>(null)
    const [formError, setFormError] = useState<null | string>(null)
    const [fetchedData, setFetchedData] = useState<Array<{id: number, hours: number, minutes: number, zipCode:number, created_at: string}> | null>(null)
    const [entry, setEntry] = useState<Array<{id: number, hours: number, minutes: number, zipCode:number, created_at: string}> | null>(null)
    const [hasFetchedData, setHasFetchedData] = useState<Boolean>(false)

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      
      if (hours === undefined || minutes === undefined || !age || !zipCode) {
        setFormError("Udfyld venligst alle felterne")
        return
      }

      
      const { data, error} = await supabase
        .from("screentime")
        .insert([{hours, minutes, age, zipCode}])
        .select()
  
      if (error) {
        console.log(error)
        setFormError("Udfyld venligst alle felterne")
      }
      if (data) {
        console.log(data)
        setFormError(null)
        setEntry(data)
        if (!hasFetchedData){
            fetchData()
        }
        }    
    }

    const fetchData = async () => {
        const { data, error } = await supabase
            .from("screentime")
            .select()
        
        if (error) {
            console.log(error)
            return
        }
        if (data) {
            setFetchedData(data)
            setHasFetchedData(true)

        }
        
    }
  
  return (
    <>
    <div className={hasFetchedData ? 'hidden' : ''}>
    <form 
    onSubmit={handleSubmit} 
    className="bg-white rounded px-8 pt-6 pb-8">
      <label 
      className="block text-gray-700 text-xl text-center font-semibold mb-8">
        Hvor meget tid bruger du på mobilen?
      </label>
      <div className='w-full flex mb-4 justify-center'>
        <p className='screentime-info max-w-md'>Statistikken for skærmtid findes under indstillinger på din telefon. På iPhone findes statistikken under <b>Skærmtid</b>, mens den på Android findes under <b>Digital Balance.</b></p>
      </div>
      <div 
      className="mb-4">
        <div 
        className=" flex justify-between items-center">
          <input 
          type="number"
          min="-1"
          value={hours !== null ? hours : ''}
          onChange={(e) => {
            const inputValue = e.target.value;
            const parsedValue = inputValue === '' ? null : parseInt(inputValue, 10);
            setHours(parsedValue);
          }}
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="3">
          </input>
          <p 
          className="text-xl">:
          </p>
          <input 
          type="number" 
          min="-1"
          max="59"
          value={minutes !== null ? minutes : ''}
          onChange={(e) => {
            const inputValue = e.target.value;
            const parsedValue = inputValue === '' ? null : parseInt(inputValue, 10);
            setMinutes(parsedValue);
          }}
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="27"></input>
        </div>
        <div 
        className="flex justify-between text-xs">
          <p>Timer</p>
          <p>Minutter</p>
        </div>
      </div>
      <input
      type="number"
      min="0"
      max="110"
      value={age !== null ? age : ''}
      onChange={(e) => {
        const inputValue = e.target.value;
        const parsedValue = inputValue === '' ? null : parseInt(inputValue, 10);
        setAge(parsedValue);
      }}
      className="shadow appearance-none border mb-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Skriv din alder her"
      ></input>
      <input
      type="number"
      min="1000"
      max="9999"
      value={zipCode !== null ? zipCode : ''}
      onChange={(e) => {
        const inputValue = e.target.value;
        const parsedValue = inputValue === '' ? null : parseInt(inputValue, 10);
        setZipCode(parsedValue);
      }}
      className="shadow appearance-none border mb-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Skriv dit postnummer her"
      ></input>
      <div 
      className="flex justify-center">
        <button 
        className="bg-[#37c759] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4" 
        type="submit"
        >
          Bekræft
        </button>

      </div>
        {formError && <p className="error">{formError}</p>}
    </form>
    </div>
   

    <div className={!hasFetchedData ? 'hidden' : ''}>
      <Result data={fetchedData} entry={entry} />
    </div>
    </>

  )
}
