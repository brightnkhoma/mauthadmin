import { log } from "@/app/components/Register";
import axios from "axios";
export interface PhoneNumber{
    phoneNumber : string;
    firstName : string;
    lastName : string;
    nationalId : string;
    ICCID : string;
    statement : string;
    answer : string;    
}
export interface CommitResult{
    success : boolean;
    message : string;
}
export interface StatementCommitResult{
    status : boolean;
    statement : string;
    answer : string
}

interface PhoneDataSourceSignature{
    register : (data : PhoneNumber)=> Promise<CommitResult>;
    reregister : (data : PhoneNumber)=> Promise<CommitResult>;
    getStatementAnswer : (data : PhoneNumber)=> Promise<StatementCommitResult>;
}
// function serializeCommit(data : any) : CommitResult{
//     return {success : data["status"],message : data["message"]}

// }
interface Res{
    status : boolean;
    message : string
}
export class PhoneDataSource implements PhoneDataSourceSignature{
    async reregister (data: PhoneNumber) : Promise<CommitResult>{
        try {
            const results = await axios.post("http://192.168.43.48:8000/reregister/",JSON.stringify(data))
            if(results.status == 200){
                const resData = results.data as Res
                return {success : resData["status"],message : resData["message"]}
            }else{
                return {success:false,message:"seomething went wrong, please try again"}
            }
        } catch (error) {
            log(error)
            return {success:false,message:"seomething went wrong, please try again"}
        }

    }
    async getStatementAnswer (data: PhoneNumber) : Promise<StatementCommitResult>{
        try {
            console.log(data);
            
            const results = await axios.post("http://192.168.43.48:8000/statement/answer/",JSON.stringify(data))
            if(results.status == 200){
                const resData = results.data
                return resData as StatementCommitResult
            }else{
                return {status:false,statement:"seomething went wrong, please try again",answer : ""}
            }
        } catch (error) {
            log(error)
            return {status:false,statement:"something went wrong, please try again",answer:""}
        }

    }
    async register (data: PhoneNumber) : Promise<CommitResult>{
        try {
            const results = await axios.post("http://192.168.43.48:8000/simregister/",JSON.stringify(data))
            if(results.status == 200){
                const resData = results.data
                return {success : resData["status"] ,message : resData["message"]}
            }else{
                return {success : false,message : "process denied"}
            }
            
        } catch (error) {
            return {success : false,message : "something went wrong, try again"}
        }


    }
     


}