import React, { useEffect, useState } from 'react';
import '../css/leftsidebar.css';
import chaticon from '../assets/chat-icon.svg';
import searchicon from '../assets/search-icon.svg';
import settingsicon from '../assets/settings-icon.svg';
import Creategroupform from './groupcomponents/creategroupform';
import logo2 from '../assets/logo2.svg';
import bell from '../assets/bell-regular.svg';
import Notifications from './notifications';
import Settings from './settings';
import axios from 'axios';
import { getprofiledetails, logoutRoute } from '../utils/apiroutes';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/usercontext';
import logouticon from "../assets/logout.svg";
import grpicon from "../assets/people.png";
import Searchusers from './Searchusers';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
export default function Leftsidebar() {
   
    const [currentusername,setcurrentusername]=useState('A');
    const [currentprofilepic,setcurrentprofilepic]=useState(null);
    const {currUserDetails}=useUserContext();
    const navigate=useNavigate();
    useEffect(()=>{
      
      if(currUserDetails){
        console.log(currUserDetails);
        setcurrentusername(currUserDetails.username);
        setcurrentprofilepic(currUserDetails.profileImage);
      }
    },[currUserDetails])

    const [grpformopen, setgrpformopen] = React.useState(false);
    const [notsopen,setnotsopen]=React.useState(false);
    const [settingsopen,setsettingsopen]=React.useState(false);
    const [searchopen,setsearchopen]=React.useState(false);
    const groupformopen= () => {
      setgrpformopen(true);
    };
    const notificationsopen=()=>{
       setnotsopen(true);
    }
    const opensettings=()=>{
      setsettingsopen(true);
    }
    const opensearch=()=>{
      setsearchopen(true);
    }
    const handleLogOut=async()=>{
      await axios.get(logoutRoute);
      navigate('/login');
    }
  return (
    <>
    <Creategroupform  open={grpformopen} setopen={setgrpformopen}></Creategroupform>
    <Notifications open={notsopen} setopen={setnotsopen}></Notifications>
    <Settings open={settingsopen} setOpen={setsettingsopen} setcurrentprofilepic={setcurrentprofilepic} currentprofilepic={currentprofilepic}></Settings>
    <Searchusers open={searchopen} setopen={setsearchopen}></Searchusers>
    <div className='leftbar-container'>
      <div className='logo' onClick={opensettings}  style={{cursor:'pointer'}}><div className='myavatarcontainer'>{currentprofilepic?<img id="myavatar" src={currentprofilepic} alt="avatar" />:<Avatar style={{background:purple[500],width:'13rem',height:'13rem'}}>{currentusername[0].toUpperCase()}</Avatar>}</div><span style={{marginLeft:'10px'}}>{currentusername}</span></div>
      <div className='leftbar-bottom'>
       <div className='leftbar-icons'><Button onClick={notificationsopen}><span style={{minWidth:'32px',marginRight:'10px'}}><NotificationsActiveIcon sx={{color:purple[500]}}></NotificationsActiveIcon></span><span style={{textTransform:'none'}}>Notifications</span></Button></div>
       <div className='leftbar-icons'><Button onClick={groupformopen}><span style={{minWidth:'32px',marginRight:'10px'}}><GroupAddRoundedIcon sx={{color:purple[500]}}></GroupAddRoundedIcon></span><span style={{textTransform:'none'}}>Create Group</span></Button></div>
       <div className='leftbar-icons'><Button onClick={opensearch}><span style={{minWidth:'32px',marginRight:'10px'}}><PersonSearchRoundedIcon sx={{color:purple[500]}}></PersonSearchRoundedIcon></span><span style={{textTransform:'none'}}>Search Friends</span></Button></div>
       <div className='leftbar-icons'><Button onClick={opensettings}><span style={{minWidth:'32px',marginRight:'10px'}}><SettingsRoundedIcon sx={{color:purple[500]}}></SettingsRoundedIcon></span><span style={{textTransform:'none'}}>Settings</span></Button></div>
    
       <div className='logout-btn' ><img src={logouticon}  width={'22px'} onClick={handleLogOut} alt="" />Log Out</div>
      
      </div>
    </div>
    </>
  )
}
// `data:image/svg+xml;base64,${currentUserImage}`