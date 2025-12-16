/**
 * Admin index page - redirects to dashboard or appropriate landing.
 * This page is protected by the admin layout's requireSession() guard.
 */
export default function AdminPage() {
    // TODO: Redirect to dashboard once implemented
    // For now, show a simple placeholder
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
                Welcome to the admin area. Dashboard coming soon.
            </p>
        </div>
    );
}
