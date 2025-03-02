import { PhoneDataSource,PhoneNumber,CommitResult,StatementCommitResult } from "../dataSource/phoneDataSource";

export async function register(phone:PhoneNumber) : Promise<CommitResult> {
    const dataSource = new PhoneDataSource()
    const result = await dataSource.register(phone)
    return result    
}

export async function getAnswer(data:PhoneNumber) : Promise<StatementCommitResult> {
    const dataSource = new PhoneDataSource()
    const answer = await dataSource.getStatementAnswer(data)
    return answer    
}

export async function reregister(data:PhoneNumber): Promise<CommitResult> {
    const dataSource = new PhoneDataSource()
    const results = await dataSource.reregister(data)
    return results    
}