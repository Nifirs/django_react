import React,{useState,useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import Image from './Image'

const CommentListPage = () => {

  let [comments,setComments] = useState([])

  useEffect(()=>{
    getComments()
  },[])

 let getComments = async ()=>{
    let response = await fetch('/api/comments_list/')
    let data= await response.json()
    // console.log("Data:",data)
    setComments(data)
 

}

  return (
    
    <div className='comments'>
      <Image/>
      <div className='comments-header'>
        <h2 className='comments-title'>&#9782; Comments</h2>
      </div>
      <div className='comments-list'>
        {comments.map((comment,index)=>(
            <ListItem key={index} comment={comment}/>
        ))}
      </div>
      
      <AddButton/>
    </div>
  )
}

export default CommentListPage
