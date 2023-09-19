import React, { useState, useEffect } from 'react'

interface ResultProps {
    data: Array<{id: number, hours: number, minutes: number, zipCode:number, created_at: string}> | null
    entry: Array<{id: number, hours: number, minutes: number, zipCode:number, created_at: string}> | null
}

export default function Result( { data, entry }: ResultProps) {
    const [avgHours, setAvgHours] = useState<number | null>(null)
    const [avgMinutes, setAvgMinutes] = useState<number | null>(null)
    const [personalHours, setPersonalHours] = useState<number | null>(null)
    const [personalMinutes, setPersonalMinutes] = useState<number | null>(null)

    useEffect(() => {
        if (data) {
          const timeInMinutes = data.map((obj) => obj.hours * 60 + obj.minutes);
          const sumOfTimeInMinutes = timeInMinutes.reduce((acc, val) => acc + val, 0);
          const avgOfTimeInMinutes = (sumOfTimeInMinutes / data.length);   
        
          const hours = Math.floor(avgOfTimeInMinutes / 60)
          const minutes = Math.round(avgOfTimeInMinutes % 60)

          setAvgHours(hours)
          setAvgMinutes(minutes)
        }

        if (entry) {
            setPersonalHours(entry[0].hours)
            setPersonalMinutes(entry[0].minutes)
        }

      }, [data, entry]);

      const smartPhoneHoursDK = 1
      const smartPhoneMinutesDK = 27



  return (
    <div>
        <div>Gennemsnit for adspurgte: {avgHours} timer og {avgMinutes} minutter. </div>
        <div>Dit skærmforbrug: {personalHours} timer og {personalMinutes} minutter. </div>
        <div>Gennemsnit for danskerne: {smartPhoneHoursDK} time og {smartPhoneMinutesDK} minutter</div>
    </div>
  )
}
