import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard</h2>
                <div className="mb-4">
                    <p className="text-gray-700"><strong>Name:</strong> {user?.name}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                    <p className="text-gray-700"><strong>Role:</strong> {user?.role}</p>
                    {user?.isVerified && <p className="text-green-600 mt-2">✓ Email Verified</p>}
                    {!user?.isVerified && <p className="text-red-600 mt-2">✗ Email Not Verified</p>}
                </div>
                <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;