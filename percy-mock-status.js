import {exec} from 'child_process'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const GITHUB_TOKEN = process.env.SECRET_TOKEN
const REPO = process.env.REPO

async function GetAffected(){
    return new Promise((resolve,reject)=>{
        exec('npx nx print-affected',(err,result)=>{
            if(err) reject(err)
            resolve(JSON.parse(result))
        })
    })
}

async function GetCommitId(){
    return new Promise((resolve,reject)=>{
        exec('git rev-parse --verify HEAD',(err,commitId)=>{
            if(err) reject(err)
            resolve(commitId)
        })
    })
}

async function MarkStatus(projectSlug,SHA){
    let endpoint = `https://api.github.com/repos/${REPO}/statuses/${SHA})`
    return axios.post(endpoint,{
        state:'success',
        context:`percy/${projectSlug}`
    },{
        headers:{
            Authorization:`Bearer ${GITHUB_TOKEN}`
        }
    })
}

(async ()=>{
    let affected = await GetAffected()
    let affectedProjects = affected.projects
    let allProjects = affected.projectGraph.nodes
    let unaffectedProjects = allProjects.filter((p)=>!affectedProjects.some((q)=>p ==q));
    let SHA = await GetCommitId() 

    unaffectedProjects.forEach((project)=>{
        MarkStatus(project,SHA)
    })
})()