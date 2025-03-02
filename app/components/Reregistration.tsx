'use client'
import React, { useState } from 'react'
import { reregister,getAnswer } from '../lib/repository/phoneRepository';
import { PhoneNumber,CommitResult,StatementCommitResult } from '../lib/dataSource/phoneDataSource';
import { log } from './Register';

function Reragistration() {
    // const [answer, setAnswer] = useState()
    const [formData, setFormData] = useState<PhoneNumber>()
    const [getAnswerResults, setGetAnswerResults] = useState<StatementCommitResult>()
    const [reregisterResults, setreregisterResults] = useState<CommitResult>()

    function updateFormData(field : keyof PhoneNumber,value : string){
        const copy = {...formData} as PhoneNumber
        copy[field] = value
        setFormData(copy)
        }
        async function setStatementAnswer(){
            const answer = await getAnswer(formData as PhoneNumber)
            if(answer.status){
                updateFormData("statement",answer.statement)
            }
            log("answer")
            log(answer)
            setGetAnswerResults(answer)           
        }
        async function onReregister() {
            const answer = await reregister(formData as PhoneNumber)
            setreregisterResults(answer)            
        }
  return (
    <div className='w-full h-full p-4 '>

        
        <div>
            <span className='font-bold text-2xl'>Sim Card Re-registration</span>
        </div>
        <div className='w-full flex flex-col gap-8 mt-8'>
            <div className='w-full flex flex-row'>
                <TextInputWithText name='first Name' value={formData?.firstName as string} onTextChange={(text)=>{updateFormData("firstName",text)}}/>
                <TextInputWithText name='last Name' value={formData?.lastName as string} onTextChange={(text)=>{updateFormData("lastName",text)}}/>
            </div>
            <TextInputWithText name='National ID number' value={formData?.nationalId as string} onTextChange={(text)=>{updateFormData("nationalId",text)}}/>
            <TextInputWithText name='ICCID' value={formData?.ICCID as string} onTextChange={(text)=>{updateFormData("ICCID",text)}}/>
            <TextInputWithText name='phone Number' value={formData?.phoneNumber as string} onTextChange={(text)=>{updateFormData("phoneNumber",text)}}/>

              {
                getAnswerResults && getAnswerResults.statement && getAnswerResults.statement.length>2 &&
                <div className='flex flex-row items-center'>
                    <span className='font-bold'>{formData?.statement as string} : </span>
                    <TextInputWithText name='your answer' value={formData?.answer as string} onTextChange={(text)=>{updateFormData("answer",text)}}/>

                </div>}

                <button onClick={()=>{
                    if(getAnswerResults?.status){
                        onReregister()
                    }else{
                        setStatementAnswer()
                    }
                }} className='border active:opacity-60 w-80 bg-red-700 text-slate-100 rounded-md p-2 font-bold text-lg'>
                    Proceed
                </button>
                {
                    getAnswerResults && <CommitFetchResult status={getAnswerResults.status} answer={getAnswerResults.answer} statement={getAnswerResults.statement}/>
                }
                {
                    reregisterResults && 
                    <RegisterResuls message={reregisterResults.message} success={reregisterResults.success}/>
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

const CommitFetchResult : React.FC<StatementCommitResult> = ({statement,status})=>{
    return(
        <span className={`${!status ? "text-red-700 text-2xl font-bold" : "text-green-700 font-bold text-3xl"}`}>
            {
                status ? "" : statement
            }
        </span>
    )

}
const RegisterResuls : React.FC<CommitResult> = ({message,success})=>{
    return(
        <span className={`${success ? "text-green-700 font-bold text-3xl" : "text-red-600 font-bold text-3xl"}`}>
            {message}
        </span>
    )

}

export default Reragistration