export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to access the admin dashboard
                    </p>
                </div>

                {/* TODO: Implement Supabase email/password login form */}
                <div className="mt-8 space-y-6">
                    <p className="text-center text-gray-500">
                        Login form placeholder. Implementation pending.
                    </p>
                </div>
            </div>
        </div>
    );
}
