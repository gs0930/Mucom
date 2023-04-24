import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';
import React from 'react'


const DisplayPosts = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [count, setCount] = useState(0)
  const [comments, setComments] = useState("");
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
        setCount(post.count || 0);
      }
      setComments(post.comments||"");
    }

    fetchPost();
  }, [id]);
  
  // const [count, setCount] = useState(0)
  const updateCount = async (event) => {
    event.preventDefault();
    setCount((count) => count + 1);
    const updatedCount = post.count + 1;

   await supabase
      .from('Mucom')
      .update({ count: updatedCount })
      .eq('id', id)
      .single();
 
    // if (error) {
    //   console.error('Error updating count:', error);
    // } else {
    //   // Update the local post state with the new count value
    //   setPost(data);
    // }

    // window.location.reload();

}
const handleSubmit = async (event) => {
  event.preventDefault();

  const { comments } = event.target.elements;
  

  await supabase
    .from('Mucom')
    .update({ comments: post.comments ? `${post.comments}\n${comments.value}` : comments.value })
    .eq('id', id);
    setComments(prevComments => prevComments + '\n' + comments.value);
    comments.value = '';


  // window.location = '/';
};
return (
  <div>
    <div>
      <h2 style={{ color: 'white' }}>{post.title}</h2>
      <h5 style={{ color: 'white' }}>{post.content}</h5>
      <img src={post.image} height="300" alt="" />
      <h6 style={{ color: 'white', whiteSpace: 'pre-wrap' }}>{post.comments}</h6>

    </div>
    
    <button className="betButton" onClick={updateCount} >👍 Upvotes: {count}</button>
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Leave a Comment</label>
        <input type="text" id="comments" name="comments" defaultValue={post.comments}  />
        <p></p>
        <button type="submit">Submit</button>


      </form>
  </div>

);
};

export default DisplayPosts;
