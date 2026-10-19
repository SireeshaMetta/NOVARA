import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, GraduationCap, Shield, Loader2 } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const { login, resendVerification } = useAuth();

    const [role, setRole] = useState("student");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [needsVerification, setNeedsVerification] = useState(false);
    const [unverifiedEmail, setUnverifiedEmail] = useState("");
    const [resendStatus, setResendStatus] = useState("");
    const [resending, setResending] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
        setNeedsVerification(false);
        setResendStatus("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setNeedsVerification(false);
        setResendStatus("");

        const result = await login({ ...formData, role });
        setSubmitting(false);

        if (result.success) {
            if (result.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
            return;
        }

        if (result.needsVerification) {
            setNeedsVerification(true);
            setUnverifiedEmail(result.email);
        }
        setError(result.error);
    };

    const handleResend = async () => {
        setResending(true);
        setResendStatus("");

        const result = await resendVerification(unverifiedEmail);
        setResending(false);
        setResendStatus(
            result.success
                ? "Verification email sent! Check your inbox."
                : result.error
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-600">
                        Novara
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Prepare. Practice. Perform.
                    </p>
                </div>

                <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                    <button
                        type="button"
                        onClick={() => setRole("student")}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                            role === "student"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600"
                        }`}
                    >
                        <GraduationCap size={18} />
                        Student
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("admin")}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                            role === "admin"
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600"
                        }`}
                    >
                        <Shield size={18} />
                        Admin
                    </button>
                </div>

                {error && (
                    <div
                        className={`mb-4 p-3 rounded-xl text-sm ${
                            needsVerification
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {error}
                    </div>
                )}

                {needsVerification && (
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {resending && (
                                <Loader2 size={16} className="animate-spin" />
                            )}
                            Resend verification email
                        </button>
                        {resendStatus && (
                            <p
                                className={`mt-2 text-sm text-center ${
                                    resendStatus.includes("sent")
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {resendStatus}
                            </p>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-500"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="text-right mb-6">
                        <Link
                            to="/forgot-password"
                            className="text-indigo-600 text-sm hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {submitting && (
                            <Loader2 size={18} className="animate-spin" />
                        )}
                        Login as {role === "admin" ? "Admin" : "Student"}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-indigo-600 font-semibold"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
