import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CircularProgress, TextField } from '@mui/material';
import uploadbg from '../assets/upload_data_to_23andme.jpg';
import axios from 'axios';
import { uploadpost } from '../utils/apiroutes';
import {toast} from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreatePost({setOpen,open}) {
  const [text,settext]=React.useState(null);
  const [file,setfile]=React.useState(null);
  const [pic,setpic]=React.useState(null);
  const [disabled,setdisabled]=React.useState(true);
  const [loading,setloading]=React.useState(false);
  
  const handleFileChange = (e) => {
    const currfile = e.target.files[0];
    
    if (currfile) {
      const allowedImageTypes = ['image/jpeg', 'image/png','image/svg+xml']; 
      const allowedsize=1024*1024;
      if(!allowedImageTypes.includes(currfile.type)){
        toast.warning("Image type invalid! Only jpeg/png/svg allowed",{position:'top-center'});
        return;
     }
     
     if(allowedsize<currfile.size){
      toast.warning("Image size should be less than 1MB !",{position:'top-center'});
      return;
     }
      const imageUrl = URL.createObjectURL(currfile);
      setpic(imageUrl);
      setfile(currfile);
    };
    setdisabled(false);
   }
  const handleClose = () => {
    setdisabled(true);
    setfile(null);
    setpic(null);
    settext(null);
    setOpen(false);
  };
  const uploadPost =async () => {
    setdisabled(true);
   
   if(file){
     
   try{
    const formData = new FormData();
    formData.append('postpic', file);
    formData.append('caption',text);
    
    setloading(true);
    const res= await axios.post(uploadpost,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }});
    if(res.status===200)toast.success("Created Successfully!",{position:'bottom-left'});
    
    setloading(false);
    }catch(err){
      if(err.response && err.response.status===500){
        toast.error("Something went wrong.Try again later!",{position:'bottom-left'});
      }
    }
  }
  }
  return (
    <React.Fragment>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create Post
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        { loading&&<CircularProgress sx={{position:'absolute',zIndex:'20',top:'13rem'}}></CircularProgress>}
             <label htmlFor='postupload' style={{border:'2px dashed gray',marginBottom:'20px',cursor:'pointer'}}>{!pic?<img src={uploadbg} width={'400px'}></img>:<img src={pic} width={'400px'}></img>}</label>
             <input type='file' id='postupload' style={{display:'none'}} onChange={handleFileChange}></input>
             Write Something...
            <TextField onChange={(e)=>{settext(e.target.value)}} style={{width:'500px'}}></TextField>
            
        </DialogContent>
        <DialogActions>
            
          <Button onClick={uploadPost} disabled={disabled}>
           Create
          </Button>

        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
