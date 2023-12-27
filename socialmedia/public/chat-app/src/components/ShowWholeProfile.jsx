import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { purple } from '@mui/material/colors';
import { showwholeprofile } from '../utils/apiroutes';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowWholeProfile({open,setOpen,id}) {

  const [profile,setprofile]=React.useState(null);
  
  React.useEffect(()=>{
    async function fetch(){
        const data=await axios.get(`${showwholeprofile}/${id}`);
        setprofile(data.data);
    }
fetch();
  },[])
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
     
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {profile?.username}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>{
        profile&&
        <div ><div>{profile.profileImage?<img id="myavatar" src={profile.profileImage} alt="avatar" />:<Avatar style={{background:purple[500],width:'13rem',height:'13rem'}}>{profile.username[0].toUpperCase()}</Avatar>}</div></div>
         } 
         </Dialog>
    </React.Fragment>
  );
}
