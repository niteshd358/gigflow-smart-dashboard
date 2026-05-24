import { useNavigate, Link } from "react-router-dom";
import { useForm  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema } from "../validators/authValidator";
import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";





const LoginPage = () => {

    const navigate = useNavigate(); 

    const setAuth = useAuthStore(
        (state) => state.setAuth
    );

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema)
    });
    
    const onSubmit = async (data : any) => {
        try {
            const response = await loginUser(data);
            setAuth (response.user, response.token);
            
            toast.success("Login successful");
            navigate("/dashboard");
        }
        catch (error : any) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white  p-8 rounded-2xl shadow-lg w-full max-w-md" 
            >
                {/* Logo */}
                <div className="p-6 text-center ">
                            <h1 className="text-4xl font-bold text-blue-600">
                            GigFlow
                            </h1>

                            <p className="text-gray-500 text-sm mt-1">
                            Smart Leads Dashboard
                            </p>
                </div>

                {/* EMail */}
                <div className="mb-4">
                    <input 
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full border p-3 rounded-lg"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.email.message)}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <input type="password" 
                        placeholder="Password"
                        {...register("password")}
                        className="w-full border p-3 rounded-lg"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.password.message)}
                        </p>
                    )}
                </div>

                {/* Submit BUttion*/}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    Login
                </button>

                <p className="mt-4 text-center">
                    Don&apos;t have an account?{" "}

                    <Link 
                        to="/register"
                        className="text-blue-600 font-medium"
                    >   
                        Register
                    </Link>
                </p>

            </form>
        </div>
    );

};


export default LoginPage;