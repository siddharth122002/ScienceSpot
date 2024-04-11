import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nav, setNav] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://sci-spotbackend.vercel.app/login', {
                email: email,
                password: password,
            }, {
                withCredentials: true,
            })
            if (data === "ok") {
                setNav(true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (nav) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="flex justify-center items-center sm:h-screen mt-3">
            <form className="bg-white rounded-lg p-8" 
                onSubmit={(e) => loginHandler(e)}>
                <div className="mb-4">
                    <input
                        className="shadow-lg  border w-full py-2 px-3 text-gray-700"
                        id="email" type="text" value={email} placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <input
                        className="shadow-lg  border w-full py-2 px-3 text-gray-700"
                        id="password" type="password" value={password} placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-red-700 hover:bg-red-800 text-white sm:font-bold py-2 px-4 rounded-lg"
                        type="submit"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    )
}
