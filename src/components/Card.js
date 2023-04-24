import React from 'react'
import { useEffect, useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

const Card = (props) =>  {

  // const [count, setCount] = useState(0)
  // const updateCount = () => {
  //   setCount((count) => count + 1);
  // }
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      const { data: post, error } = await supabase
        .from('Mucom')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(post);
      }
    }
    fetchPost();
  }, [id]);
  const getTimeDifference = () => {
    const createdTime = new Date(props.created_at);
    const currentTime = new Date();
    const timeDiff = currentTime - createdTime;
  
    const diffMinutes = Math.floor(timeDiff / 1000 / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    }
  
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
  
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };
  

  return (
    <Link to={'display/'+ props.id} style={{ textDecoration: 'none' }}>
  <div className="Card">
    <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
    <h5 className="description">{getTimeDifference()}</h5>
    <h2 className="title">{props.title}</h2>
    {/* <h3 className="author">Major: {props.content}</h3> */}
    {/* <h5 className="description">Grade: {props.image}</h5> */}
    <h2 className="title">{props.count} upvotes</h2> 
  </div>
</Link>

      // <div className="Card">
      //     <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
      //     <h5 className="description">{getTimeDifference()}</h5>
      //     <h2 className="title">{props.title}</h2>
      //     {/* <h3 className="author">Major: {props.content}</h3> */}
      //     {/* <h5 className="description">Grade: {props.image}</h5> */}
      //     <Link to={'display/'+ props.id}><button>Read Info</button></Link>
      //     <h2 className="title">{props.count} upvotes</h2>
          
      // </div>
  );
};

export default Card;