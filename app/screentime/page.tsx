import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

export default async function Index() {

  const addTime = async (formData: FormData) => {
    'use server'
    const screenTime = formData.get('screentime');
    const supabase = createServerActionClient({ cookies });
    await supabase.from("screentime").insert({ id: 7, time: screenTime }).select();
  }







  return (
    <div 
    className="w-full max-w-xs mt-4">
      <form 
      action={addTime} 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label 
        className="block text-gray-700 text-xl text-center font-semibold mb-8">
          Hvor meget tid bruger du på mobilen?
        </label>
        <div 
        className="mb-4">
          <div 
          className=" flex justify-between items-center">
            <input 
            type="number"
            min="0"
            name="hours" 
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="3">
            </input>
            <p 
            className="text-xl">:
            </p>
            <input 
            type="number" 
            min="0"
            name="minutes" 
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="27"></input>
          </div>
          <div 
          className="flex justify-between text-xs">
            <p>Timer</p>
            <p>Minutter</p>
          </div>
        </div>
        <div 
        className="flex justify-center">
          <button 
          className="bg-[#162c41] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
          type="submit">
            Bekræft
          </button>
        </div>
      </form>
    </div>

  );
}