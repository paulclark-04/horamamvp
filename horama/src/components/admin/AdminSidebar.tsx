import Link from "next/link";

const NAV_ITEMS = [
    { href: "/admin/boite-de-reception", label: "Boîte de réception" },
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/qualification-leads", label: "Qualification leads" },
    { href: "/admin/gestion-contacts", label: "Gestion contacts" },
    { href: "/admin/gestion-documents", label: "Gestion documents" },
];

export function AdminSidebar() {
    return (
        <aside className="w-72 border-r border-zinc-200 bg-white p-6">
            <div className="mb-8">
                <div className="text-sm font-semibold tracking-wide text-zinc-500">
                    Horama
                </div>
                <div className="text-lg font-bold text-zinc-900">Admin</div>
            </div>

            <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

