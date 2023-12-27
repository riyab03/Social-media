import React from 'react'
import '../css/center.css';
import AllPosts from './AllPosts';
import Button from '@mui/material/Button';
import { useUserContext } from '../context/usercontext';
import CreatePost from './createpost';
import { Avatar, Divider } from '@mui/material';
import { purple } from '@mui/material/colors';

function Center() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
    const {currUserDetails}=useUserContext();
  return (
    <div className='center-outer' >
       <div className='createpost-outer'><div style={{display:'flex',alignItems:'center',color:'gray'}}>{currUserDetails?.profileImage?<img src={currUserDetails?.profileImage} style={{width:'50px',height:'50px',borderRadius:'50%'}}></img>:<Avatar style={{background:purple[500]}}>{currUserDetails?.username[0].toUpperCase()}</Avatar>}Whats in your mind?</div><Button onClick={handleClickOpen}>Create Post</Button></div>
       <CreatePost open={open} setOpen={setOpen}></CreatePost>
       <Divider></Divider>
      <AllPosts></AllPosts>
    </div>
  )
}

export default Center
