import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import './comments.scss';

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState('');
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(['comments'], () =>
    makeRequest.get('/comments?postId=' + postId).then((res) => {
      return res.data;
    })
  );
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post('/comments', newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();

    mutation.mutate({ desc, postId });
    setDesc('');
  };

  //const comments = [
  //  {
  //    id: 1,
  //    name: 'John Doe',
  //    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //    userId: 1,
  //    profilePic:
  //      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //  },
  //  {
  //    id: 2,
  //    name: 'Sara Jons',
  //    desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
  //    userId: 2,
  //    profilePic:
  //      'https://greatbritish.b-cdn.net/wp-content/uploads/2020/05/Sara-Damergi-property-presenter-host-at-Great-British-Speakers-1.jpg',
  //  },
  //]
  return (
    <div className='comments'>
      <div className='write'>
        <img
          src={currentUser.profilePic}
          alt=''
        />
        <input
          type='text'
          placeholder='Write a commnet'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? 'Loading...'
        : error
        ? 'Somthing went wrong'
        : data.map((comment) => (
            <div
              className='comment'
              key={comment.id}
            >
              <img
                src={comment.profilePic}
                alt=''
              />
              <div className='info'>
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className='date'>
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
