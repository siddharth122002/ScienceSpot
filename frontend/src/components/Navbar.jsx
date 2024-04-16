import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../context/UserContext";

export default function   Home() {
    // const [name, setName] = useState(null);
    const {name,setName}=useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            const token=localStorage.getItem('token');
            if(token){
                try {

                    const  data  = await axios.get('https://science-spot.vercel.app/', {
                        headers:{
                            'auth':token,
                        },
                        withCredentials:true,
                    });

                    if (data.data) {
                        setName(data.data);
                    }
                }
                catch (error) {
                    console.error("Error checking authentication status:", error);
                }
            }
        };

        checkLoggedInStatus();
    }, [setName]);

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setName(null);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const username = name ? name : null;
    return (
        <>
        <div className="flex bg-red-900 justify-between items-center ">
            <Link to={'/'}><h1 className="sm:text-5xl m-4 font-bold text-slate-300 hover:cursor-pointer text-3xl">SciSpot</h1></Link>
            {username && (
                <div className="flex text-slate-300 sm:w-56  justify-between font-medium sm:text-lg text-sm w-44 px-4">
                    <Link to={'/create'}><p className="hover:text-red-400 hover:cursor-pointer ">Create Post</p></Link>
                    <a className="hover:text-red-400 hover:cursor-pointer" onClick={logout}>Log Out</a>
                </div>
            )}
            {!username && (
                <div className="flex text-slate-300 sm:w-56  justify-between font-medium sm:text-lg text-sm w-44 px-4">
                    <p className="hover:text-red-400 hover:cursor-pointer"><Link to={'/login'}>Login</Link></p>
                    <p className="hover:text-red-400 hover:cursor-pointer"><Link to={'/register'}>Register</Link></p>
                </div>
            )}
        </div>
        </>
    );
}
