import { useNavigate,Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerSchema } from "../validators/authValidator";
import { registerUser } from "../services/authService";
import useAuthStore from "../store/authStore";



const RegisterPage = () => {
    const navigate = useNavigate();

    const setAuth = useAuthStore(
        (state) => state.setAuth
    );

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data:any) => {
        try {
            const response = await registerUser(data);

            setAuth(response.user, response.token);

            toast.success("Registration successful");
            navigate("/dashboard");
        }
        catch(error:any){
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return(
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

                {/* NAME */}
                <div className="mb-4">
                    <input 
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                        className="w-full border p-3 rounded-lg" 
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.name.message)}
                        </p>
                    )}
                </div>

                {/* EMAIL */}
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

                {/* PASSWORD */}
                <div className="mb-4">
                    <input 
                        type="password"
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

                {/* ROLE */}
                <div className="mb-6">
                    <select
                        {...register("role")}
                        className="w-full border p-3 rounded-lg"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="sales">Sales</option>
                    </select>

                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.role.message)}
                        </p>
                    )}

                </div>

                {/* REGISTER BUTTON */}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    Register
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium"
                    >
                        Login
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default RegisterPage;