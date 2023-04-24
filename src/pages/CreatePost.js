import React from 'react';
import './CreatePost.css'
import { supabase } from '../client'
import { useState } from 'react';

// event
const CreatePost = () => {

    const [post, setPost] = useState({ title: '', content: '', image: '' });
    const handleSubmit = async (event) => {
        event.preventDefault();
        await supabase
            .from('Mucom')
            .insert(post)
            .select();
        //posts.title, author: posts.author, description: posts.description 
        window.location = "/";
        // const {name, value}=event.target;
        // setpost{(prevPost)=>{}}
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleInputChange} required /><br />
                <br />

                <label for="content">Content (Optional)</label><br />
                <input type="text" id="content" name="content" value={post.content} onChange={handleInputChange} /><br />
                <br />

                <label htmlFor="grade">Image (Optional) </label>
                <input type="text" id="image" name="image" value={post.image} onChange={handleInputChange} /><br />

                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost