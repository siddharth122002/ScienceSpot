import { useEffect, useState } from "react"
import axios from 'axios'
import {Navigate} from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
export default function Create(){
    const [title,setTitle] = useState("")
    const [summary,setSummary] = useState("")
    const [article,setArticle] = useState("")
    const [nav,setNav] = useState(false);
    const [file,setFile] = useState("")
    const { id } = useParams();
    useEffect(() => {
        const singlePost = async () => {
            const {data} = await axios.get(`https://science-spot.vercel.app/post/${id}`,{
                headers:{
                    'auth':`${localStorage.getItem('token')}`
                },
                withCredentials:true,
            })
            setTitle(data.post.title)
            setSummary(data.post.summary)
            setArticle(data.post.article)
        }
        singlePost();
    }, [])

    const creation=async (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('article',article);
        data.set('file',file[0]);
        data.set('id',id);
        try{
            const res =await axios.put(`https://science-spot.vercel.app/post/${id}/edit`,data,{
                headers:{
                    'auth':`${localStorage.getItem('token')}`
                },
                withCredentials:true,
            })
            setNav(true);
        }catch(e){
            setNav(false);
        }
    }
    if(nav){
        return <Navigate to={'/'}/>
    }

    return (
        <div className="p-9 h-screen overflow-auto">
            <form className="bg-white rounded-lg p-8" onSubmit={(e) => creation(e)}>
                <div className="mb-4">
                    <input
                    required
                        className="shadow-lg border w-full py-2 px-3 text-gray-700"
                        type="text" placeholder="Title"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                    required
                        className="shadow-lg border w-full py-2 px-3 text-gray-700"
                        type="text" placeholder="Summary"
                        value={summary} onChange={(e) => setSummary(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="shadow-lg border w-full py-2 px-3 text-gray-700"
                        type="file"
                        onChange={(e) => setFile(e.target.files)}
                    />
                </div>
                <div className="mb-6">
                    <textarea
                    required
                        className="shadow-lg border w-full py-2 px-3 text-gray-700"
                        cols="30" rows="10" placeholder="Article"
                        value={article}
                        onChange={(e) => setArticle(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg"
                        type="submit">
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}