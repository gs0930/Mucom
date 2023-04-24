import './App.css';
import { supabase } from './client'
import React, { useState, useEffect } from 'react';

// import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DisplayPost from './pages/Display'
import { Link } from 'react-router-dom'


const App = () => {

  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  const [posts, setPosts] = useState([]);

  // const posts = [
  //     {'id':'1', 
  //     'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
  //     'author':'Harvey Milian', 
  //     'description': descr},
  //     {'id':'2', 
  //     'title': 'Love Lock in Paris 🔒',
  //     'author':'Beauford Delaney', 
  //     'description':descr},
  //     {'id':'3', 
  //     'title': 'Wear Pink on Fridays 🎀',
  //     'author':'Onika Tonya', 
  //     'description':descr},
  //     {'id':'4', 
  //     'title': 'Adopt a Dog 🐶',
  //     'author':'Denise Michelle', 
  //     'description':descr},
  // ]
  const fetchPosts = async () => {
    const { data } = await supabase
      .from('Mucom')
      .select()
      .order('created_at', { ascending: true });

    // set state of posts
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path: "/display/:id",
      element: <DisplayPost data={posts} />

    },
    {
      path: "/new",
      element: <CreatePost />
    }
  ]);

  return (

    <div className="App">

      <div className="header">
        <a className="home-link" key="home-button" >
          <Link to="/" style={{ color: 'white' }}>Home</Link>
        </a>

        <h1>🎵 Mucom 🎵</h1>
        <h5>Music Community for Everyone</h5>
        {/* <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link> */}
        <Link to="/new"><button className="headerBtn"> Create a post  </button></Link>
        {/* <CreatePost /> */}
        {/* <ReadPosts posts={posts} /> */}

      </div>
      {element}
    </div>

  );
}

export default App;
