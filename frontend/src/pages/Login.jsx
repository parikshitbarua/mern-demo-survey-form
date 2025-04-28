import { useState } from "react";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const toggleSingIn = () => {
        setIsSignIn((prevState) => !prevState);
    }
    return (
        <div className="flex items-center justify-center mt-20 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6"> { isSignIn ? "Login" : "Sign Up" }</h1>
                <div className="flex flex-col gap-4">
                    { !isSignIn && <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>}
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="parikshitb"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="harry123@"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition">
                        { isSignIn ? "Sign In" : "Sign Up" }
                    </button>
                    <div className="text-center mt-4">
                        { isSignIn ?
                            <p className="text-sm text-gray-600">
                            New to EZSurveys? <span
                            className="text-blue-600 font-medium cursor-pointer hover:underline"
                            onClick={() => toggleSingIn()}
                        >
                            Sign Up Now
                            </span>
                            </p> :
                            <p className="text-sm text-gray-600">
                                Already Have an Account? <span
                                className="text-blue-600 font-medium cursor-pointer hover:underline"
                                onClick={() => toggleSingIn()}
                            >
                                Login
                            </span>
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
