import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        setPosts(props.data);
        // handleSortByNewest();


    }, [props]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // function to handle filtering posts based on search query
    const filterPosts = () => {
        const filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSortedPosts(filteredPosts);
    };


    const handleSortByNewest = () => {
        setSortBy('newest');
        setSortedPosts([...posts].sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        }));
    };

    const handleSortByMostPopular = () => {
        setSortBy('most popular');
        setSortedPosts([...posts].sort((a, b) => {
            return b.count - a.count;
        }));
    };

    return (

        <div>
            <container className="contain"><input type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search by title" />
            <button onClick={filterPosts}>Search</button></container>
            

            {/* <h1 style={{ color: 'blue' }}>Information</h1> */}
            <container className="contain">
            <button onClick={handleSortByNewest}>Newest</button>
            <button onClick={handleSortByMostPopular}>Most Popular</button>
            </container>
            <div className="ReadPosts">
            {
               
            }

                {sortedPosts.length > 0 ? 
                    sortedPosts.map((post, index) =>
                        <Card key={post.id} id={post.id} created_at={post.created_at} title={post.title} content={post.content} image={post.image} count={post.count} />
                    ): posts && posts.length > 0 ?
                    posts.map((post, index) =>
                    <Card key={post.id} id={post.id} created_at={post.created_at} title={post.title} content={post.content} image={post.image} count={post.count} />
                    ) : <h2>{ }</h2>
                }
            </div>
        </div>

        // <div className="ReadPosts">
        //     {
        //         posts && posts.length > 0 ?
        //             posts.map((post, index) =>
        //                 <Card id={post.id} created_at = {post.created_at} title={post.title} content={post.content} image={post.image} count={post.count}/>
        //             ) : <h2>{ }</h2>
        //     }
        // </div>
    )
}

export default ReadPosts;