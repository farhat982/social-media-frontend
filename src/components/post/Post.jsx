import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from '@mui/material';
import './post.scss';
import Comments from '../comments/Comments';
import { useState } from 'react';
import moment from 'moment';
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Post = ({ post, postId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  //Temp
  //const liked = true;

  //
  const { isLoading, error, data } = useQuery(['likes', post.id], () =>
    makeRequest.get('/likes?postId=' + post.id).then((res) => {
      return res.data;
    })
  );
  // Mutations
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete('/likes?postId=' + post.id);
      return makeRequest.post('/likes', { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['likes']);
      },
    }
  );
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  // Mutations
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete('/posts/' + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['posts']);
      },
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  return (
    <div className='post'>
      <div className='container'>
        <div className='user'>
          <div className='userInfo'>
            <img
              src={post.profilePic}
              alt=''
            />
            <div className='details'>
              <Link
                to='/profile/${post.userId}'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='name'>{post.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className='userInfo'>
            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && post.userId === currentUser.id && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </div>
        </div>
        <div className='content'>
          <p>{post.desc}</p>
          <img
            src={'./upload/' + post.img}
            alt=''
          />
        </div>
        <div className='info'>
          <div className='item'>
            {isLoading ? (
              'Loading...'
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: 'red' }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            <span>{data?.length} Likes</span>
          </div>
          <div
            className='item'
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            <span>10 Comments</span>
          </div>
          <div className='item'>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
