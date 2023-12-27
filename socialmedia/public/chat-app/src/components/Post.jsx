import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UsersProfilePicture from './UsersProfilePicture';
import { Divider } from '@mui/material';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { likepost } from '../utils/apiroutes';
import axios from 'axios';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({post}) {
  const [expanded, setExpanded] = React.useState(false);
  const [alreadyliked,setalreadyliked]=React.useState(post.alreadyliked);
  const [alreadyloved,setalreadyloved]=React.useState(post.alreadyloved);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleliked=async()=>{
    
    if(!alreadyliked){
    setalreadyliked(true);
    setalreadyloved(false);
    await axios.post(likepost,{
     postid:post.postid,
     emoji: '👍'
    });
}
  }
  const handleloved=async()=>{

    if(!alreadyloved){
        setalreadyloved(true);
        setalreadyliked(false);
    await axios.post(likepost,{
     postid:post.postid,
     emoji: '❤️'
    });
}
  }

  return (
    <Card sx={{ minWidth: '100%',margin:'20px 0 20px 0' ,boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'}}>
      <CardHeader
        avatar={
         <UsersProfilePicture item={post} style={1}></UsersProfilePicture>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.username}
        subheader={post?.createdAt}
      />
      <span style={{marginLeft:'10px'}}>{post.caption}</span>
            <Divider></Divider>
      <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><img src={post.picture} style={{maxWidth:'400px'}}></img></div>
      <CardContent>
        
      </CardContent>
      <Divider></Divider>
      <div>
      { post.nooflikes>=1&& <span style={{marginLeft:'10px'}}>Liked by {post.nooflikes} person</span>}
      <CardActions disableSpacing>
        <IconButton aria-label="love" onClick={handleloved}>
          <FavoriteIcon sx={alreadyloved?{color:'red'}:{}} />
        </IconButton>
        <IconButton aria-label="like" onClick={handleliked}>
          <ThumbUpRoundedIcon sx={alreadyliked?{color:'blue'}:{}} ></ThumbUpRoundedIcon>
        </IconButton>
      </CardActions>
      </div>
    </Card>
  );
}
