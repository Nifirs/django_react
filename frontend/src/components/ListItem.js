import React from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListItem = ({comment}) => {
  return (
    <Link to={`/comment/${comment.id}`}>
      <div className='comments-list-item'>
        <h3>{comment.user_name}</h3>
        <img src={`https://ui-avatars.com/api/?name=${comment.user_name}`} alt=""/>
      </div>
      <ToastContainer />
    </Link>
  )
}

export default ListItem
