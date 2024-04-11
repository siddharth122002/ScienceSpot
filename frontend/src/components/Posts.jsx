import { useEffect, useState } from "react"
import axios from "axios";
import {Link} from 'react-router-dom'
export default function Post(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const getPosts = async()=>{
            const {data} =await axios.get('http://localhost:3000/posts',{
                withCredentials:true,
            })
            setPosts(data);
        }
        getPosts();
    },[])

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return (
        <>
        <div className="text-white flex-col">
            {posts.map((post,i)=>(
                <Link to={`/post/${post._id}`} key={i}>
                <div className="flex sm:flex-row flex-col bg-red-500/5 sm:py-8 m-8 sm:hover:scale-105 sm:hover:transition-transform pb-3">
                    <img src={post.image} className="text-red-500 sm:w-48"/>
                    <div className="flex flex-col mx-9">
                        <p className="sm:text-3xl uppercase font-bold text-2xl py-4 sm:py-0">{post.title}</p>
                        <p className="sm:text-xl text-lg">{post.summary}</p>
                        
                        <p className="text-slate-400 ">{formatDate(post.createdAt)}</p>
                    </div>
                </div>
            </Link>
            ))}
        </div>
        </>
    )
}