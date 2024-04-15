import { useEffect, useState } from "react"
import axios from "axios";
import Spinner from "./Spinner";
import { Link, useParams } from 'react-router-dom'
import { Navigate } from "react-router-dom";
export default function Postpage() {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [ nav,setNav] = useState(false);
    const [edit,setEdit] = useState(false);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        setLoading(true);
        const singlePost = async () => {
            const token = localStorage.getItem('token');
            if(token){
                const {data} = await axios.get(`http://localhost:3000/post/${id}`,{
                    headers:{
                        'auth':token
                    },
                    withCredentials:true,
                })
                setPost(data.post);
                setEdit(data.editable);
                setLoading(false);
            }else{
                setNav(true);
            }
        }
        singlePost();
    }, [])
    if(nav){
        return <Navigate to={'/'}/>
    }
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return (
        <>
        {loading ?(
            <Spinner/>
        ):(
            <div className="h-screen overflow-auto">
            <h1 className="text-center font-semibold text-4xl py-4 text-white ">{post.title}</h1>
            <h2 className="text-center  text-white">{post.createdAt ? formatDate(post.createdAt) : ''}</h2>

            <h2 className="text-center  text-slate-400">by {post.author ? post.author.name : 'Unknown'}</h2>
            
            {edit && (
               
               <div className=" flex justify-center">
                <Link to={`/post/${id}/edit`}> <h2 
                className="text-white px-3 py-2 bg-black mt-3 rounded-lg hover:cursor-pointer">Edit</h2></Link>
               </div>

            )}

            <div className="flex justify-center py-2">
                <img className="bg-red-300 w-96" src={post.image} />
            </div>

            <p className="text-white text-2xl mx-10 leading-relaxed tracking-wide mb-36">{post.article}</p>
        </div>
        )}
            
        </>
    )
}
