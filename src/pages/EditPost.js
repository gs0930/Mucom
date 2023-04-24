// import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'
// import {useState} from 'react';
import React, { useState, useEffect } from 'react';



const EditPost = ({ data }) => {


  // const {id} = useParams();

  // const post = data.filter(item => item.id === id)[0];
  // const { title, author, description } = post;
  // // const [title, setTitle] = useState(post.title);
  // // const [author, setAuthor] = useState(post.author);
  // // const [description, setDescription] = useState(post.description);
  // const updatePost = async (event) => {
  //     event.preventDefault();

  //     await supabase
  //     .from('Posts')
  //     .update({ title: post.title, author: post.author,  description: post.description})
  //     .eq('id', id);

  //     window.location = "/";
  // }
  const { id } = useParams();
  const [post, setPost] = useState({});

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, content, image } = event.target.elements;

    await supabase
      .from('Mucom')
      .update({ title: title.value, content: content.value, image: image.value })
      .eq('id', id);

    window.location = '/';
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase
      .from('Mucom')
      .delete()
      .eq('id', id);

    window.location = '/';
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} /><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" name="description" id="description" value={post.description} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
                <button className="deleteButton">Delete</button>
            </form> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" defaultValue={post.title} required />

        <label htmlFor="content">Content (Optional)</label>
        <input type="text" id="content" name="content" defaultValue={post.content} />

        <label htmlFor="image">Image (Optional)</label>
        <input type="text" id="image" name="image" defaultValue={post.image} />



        <button type="submit">Update Post</button>
        <button className="deleteButton" onClick={deletePost}>Delete</button>

      </form>
    </div>
  )
}

export default EditPost