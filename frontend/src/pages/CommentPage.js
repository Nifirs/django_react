import React, {useEffect,useState} from 'react'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentPage = ({match,history}) => {

let commentId=match.params.id
let [comment,setComment]=useState(null)

useEffect(()=>{
    
    getComment()
},[commentId])

// using backtics in URL because passing a dynamic id here
let getComment = async()=>{ 
  if(commentId==='new') return
    let response =await fetch(`/api/comments_list/${commentId}`)
    let data=await response.json()
    setComment(data)
}

let updateComment = async ()=>{
    fetch(`/api/comments_list/update/${commentId}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(comment)
    })
    
}

let createComment = async ()=>{
  fetch(`/api/comments_list/create`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(comment)
  })


  
}

let deleteComment = async ()=>{
  fetch(`/api/comments_list/delete/${commentId}`,{
    method:"DELETE",
    headers:{
      'Content-Type':'application/json'
    }
  })
  history.push('/')
}

let handleSubmit=()=>{
  if(commentId!== 'new' && !comment.body){
    deleteComment()
  }
  else if(commentId!=='new'){
    updateComment()
  }
  else if(commentId==='new' && comment!==null){
    createComment()
    toast("Waiting for the Admin Approval!");
  }
  history.push('/')
}


  return (
    <div className='comment'>
      <div className='comment-header'>
        <h3> 
          <ArrowLeft onClick={handleSubmit}/>
        </h3>
        {commentId !=='new' ? (
        <button onClick={deleteComment}>Delete</button>):(
        <button className='btn btn-danger' onClick={handleSubmit}>Submit</button>
        )}
        
      </div>
      <div className='column'>
      <label>User Name</label><br/>
      <input onChange={(e)=>{setComment({...comment,'user_name':e.target.value})}} defaultValue={comment?.user_name}></input><br/>
      <label>Album ID</label><br/>
      <input onChange={(e)=>{setComment({...comment,'album_id':e.target.value})}} defaultValue={comment?.album_id}></input><br/>
      <label>Enter Comment</label>
      <textarea style={{backgroundColor:"#DFE6E4"}} onChange={(e)=>{setComment({...comment,'body':e.target.value})}} defaultValue={comment?.body}></textarea>
     
      </div>
    </div>
  )
}

export default CommentPage
