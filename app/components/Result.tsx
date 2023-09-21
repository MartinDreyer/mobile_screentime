import gsap from 'gsap'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'

interface ResultProps {
    data: Array<{id: number, hours: number, minutes: number, zipCode:number, created_at: string}> | null
    entry: Array<{id: number, hours: number, minutes: number, zipCode:number, created_at: string}> | null
}

export default function Result( { data, entry }: ResultProps) {
    const [personalHours, setPersonalHours] = useState<number | null>(null)
    const [personalMinutes, setPersonalMinutes] = useState<number | null>(null)
    const [widthPersonal, setWidthPersonal] = useState<number>(0)
    const [widthDK, setWidthDK] = useState<number>(0)
    
    const smartPhoneHoursDK = 1
    const smartPhoneMinutesDK = 37

    useEffect(() => {
      // if (data) {
      //   const timeInMinutes = data.map((obj) => obj.hours * 60 + obj.minutes);
      //   const sumOfTimeInMinutes = timeInMinutes.reduce((acc, val) => acc + val, 0);
      //   const avgOfTimeInMinutes = (sumOfTimeInMinutes / data.length);   
      
      //   const hours = Math.floor(avgOfTimeInMinutes / 60)
      //   const minutes = Math.round(avgOfTimeInMinutes % 60)

      //   setAvgHours(hours)
      //   setAvgMinutes(minutes)
      // }

      const avgDenmark = (smartPhoneHoursDK * 60) + smartPhoneMinutesDK
      setWidthDK(avgDenmark)

      if (entry) {
        setWidthPersonal((entry[0].hours * 60) + (entry[0].minutes)) 
        setPersonalHours(entry[0].hours)
        setPersonalMinutes(entry[0].minutes)
      }



    }, [data, entry]);

    function calculateRelationship(avgPersonal: number, avgDenmark:number) {
      // Find the largest value among the three
      const maxAvg = Math.max(avgPersonal, avgDenmark);
    
      // Calculate the scaling factor
      const scaleFactor = maxAvg / 100;
    
      // Calculate the adjusted values
      const adjustedAvgPersonal = avgPersonal / scaleFactor;
      const adjustedAvgDenmark = avgDenmark / scaleFactor;
    
      return {
        avgPersonal: adjustedAvgPersonal,
        avgDenmark: adjustedAvgDenmark,
      };
    }

    function calculateDiff(avgPersonal: number, avgDenmark: number) {
      const diff = avgPersonal - avgDenmark
      if (diff < 0){
        const hours = Math.floor((diff * -1) / 60)
        const minutes = Math.round((diff * -1) % 60)
        return {
          hours: hours,
          minutes: minutes,
          text: "mindre"
        }
      }
      if (diff > 0){
        const hours = Math.floor(diff / 60)
        const minutes = Math.round(diff % 60)
        return {
          hours: hours,
          minutes: minutes,
          text: "mere"
        }
      }


    }

    const diff = calculateDiff(widthPersonal, widthDK)

    const adjustedWidths = calculateRelationship( widthPersonal, widthDK)
    
    const result = useRef<HTMLInputElement>(null)
    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        gsap.fromTo('.bar',
        {
          scaleX: 0.5,
          transformOrigin:"left"
        }, 
        {
          scaleX: 1
        })

      }, result)
    })


  return (
    <div ref={result} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <div className='mb-4'>
        <div className="bg-blue-600 bar mb-2" style={{"width": adjustedWidths.avgPersonal+'%'}}></div>
        <p>Dit skærmforbrug: <span className='font-semibold'>{personalHours} timer og {personalMinutes} minutter.</span></p>
      </div>
      <div className='mb-4'>
        <div className="bg-green-600 bar mb-2" style={{"width": adjustedWidths.avgDenmark+'%'}}></div>
        <p>Gennemsnit for danskerne: <span className='font-semibold'>{smartPhoneHoursDK} time og {smartPhoneMinutesDK} minutter</span></p>
      </div>
      <div  className='text-center'>
        <p>Du bruger skærmen<br/>
        <div className="mt-4 mb-4">
          <span className="text-4xl font-bold"> {diff?.hours}</span> timer og 
          <span className='text-4xl font-bold'> {diff?.minutes} </span> minutter<br/>
        </div>
        {diff?.text} end gennemsnitsdanskeren
        </p>
      </div>
    </div>
  )
}
