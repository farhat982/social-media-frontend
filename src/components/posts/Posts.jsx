import React from 'react';
import Post from '../post/Post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get('/posts?userId=' + userId).then((res) => {
      return res.data;
    })
  );

  //Temporary Dummy Data
  //TEMPORARY
  //const posts = [
  //  {
  //    id: 1,
  //    name: 'John Doe',
  //    userId: 1,
  //    profilePic:
  //      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //    img: 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //  },
  //  {
  //    id: 2,
  //    name: 'Sara Jons',
  //    userId: 2,
  //    profilePic:
  //      'https://greatbritish.b-cdn.net/wp-content/uploads/2020/05/Sara-Damergi-property-presenter-host-at-Great-British-Speakers-1.jpg',
  //    desc: 'Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.',
  //    img: 'https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg',
  //  },
  //]

  return (
    <div className='posts'>
      {error
        ? 'Somthing went wrong!'
        : isLoading
        ? 'Loading...'
        : data.map((post) => (
            <Post
              post={post}
              key={post.id}
            />
          ))}
    </div>
  );
};

export default Posts;
