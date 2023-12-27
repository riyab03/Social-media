import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios';
import { getposts } from '../utils/apiroutes';


function AllPosts() {
 const [allpost,setallposts]=useState([]);
 useEffect(()=>{
    async function fetch(){
    const data=await axios.get(getposts);
    setallposts(data.data.data);
    }
    fetch();
 },[])
  return (
    <div className='allposts' style={{width:'100%',overflowY:'auto',marginTop:'10px'}}>
    
        {allpost?.map((post)=> <Post post={post}></Post>)
  
        }
        
   </div>
  );
}

export default AllPosts
