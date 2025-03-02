'use client'
import React from 'react'
import { register } from '../lib/repository/phoneRepository';
import { useState } from 'react';
import { PhoneNumber } from '../lib/dataSource/phoneDataSource';
import { CommitResult } from '../lib/dataSource/phoneDataSource';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(data : any){
    console.log(data)
}

function Register() {
    const [formData, setFormData] = useState<PhoneNumber>()
    const [registerResults, setRegisterResults] = useState<CommitResult>()
    const [loading, setLoading] = useState(false)

    function updateFormData(field : keyof PhoneNumber,value : string){
        const copy = {...formData} as PhoneNumber
        copy[field] = value
        setFormData(copy)
        }

        async function onRegister() {
            setLoading(true)
            const results = await register(formData as PhoneNumber)
            setRegisterResults(results) 
            log(results)  
            setLoading(false)         
        }

  return (
    <div className='w-full h-full p-4 '>

        
        <div>
            <span className='font-bold text-2xl'>Sim Card Registration</span>
        </div>
        <div className='w-full flex flex-col gap-8 mt-8'>
            <div className='w-full flex flex-row'>
                <TextInputWithText name='first Name' value={formData?.firstName as string} onTextChange={(text)=>{updateFormData("firstName",text)}}/>
                <TextInputWithText name='last Name' value={formData?.lastName as string} onTextChange={(text)=>{updateFormData("lastName",text)}}/>
            </div>
            <TextInputWithText name='National ID number' value={formData?.nationalId as string} onTextChange={(text)=>{updateFormData("nationalId",text)}}/>
            <TextInputWithText name='ICCID' value={formData?.ICCID as string} onTextChange={(text)=>{updateFormData("ICCID",text)}}/>
            <TextInputWithText name='phone Number' value={formData?.phoneNumber as string} onTextChange={(text)=>{updateFormData("phoneNumber",text)}}/>
                <div className='p-4'>
                    <span className='font-bold text-blue-700'>Enter anaything that is personal and rememberable to you</span>
                    <div className='flex flex-row items-center '>
                    <span>For example : </span>
                    <span className='font-bold'>Name of my pet is : Bruce</span>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <TextInputWithText name='statement' value={formData?.statement as string} onTextChange={(text)=>{updateFormData("statement",text)}}/>
                     <span >:</span>   
                    <TextInputWithText name='answer' value={formData?.answer as string} onTextChange={(text)=>{updateFormData("answer",text)}}/>

                </div>

                <button disabled={loading} onClick={()=>{onRegister()}} className='border w-80 bg-red-700 text-slate-100 rounded-md p-2 font-bold text-lg active:opacity-60'>
                    {loading ?"loading..." : "Proceed"}
                </button>
                {
                    registerResults && <RegisterResults success={registerResults.success} message={registerResults.message}/>
                }

        </div>

    </div>
  )
}

interface TextInputWithTextProps{
    name : string;
    value : string;
    onTextChange : (text : string)=> void
}
const TextInputWithText : React.FC<TextInputWithTextProps> = ({name,value,onTextChange})=>{
    return(
        <div className=''>
            <input value={value} onChange={e=>onTextChange(e.target.value)} className='border-b  mx-4 focus:outline-none' type="text" placeholder={name} />

        </div>
    )

}

const RegisterResults : React.FC<CommitResult> = ({success,message})=>{
    return(
        <div className={`text-sm ${success ? "text-green-700" : "text-red-700"}`}>
            {message}
        </div>
    )
}


export default Register