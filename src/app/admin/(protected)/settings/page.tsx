"use client";

import { LogoutButton } from "@/components/admin/LogoutButton";

// ============================================================================
// ICONS
// ============================================================================

const UserIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ============================================================================
// COMPONENTS
// ============================================================================

function SettingSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez votre compte administrateur
        </p>
      </div>

      {/* Profile Section */}
      <SettingSection
        icon={<UserIcon />}
        title="Compte"
        description="Informations de votre compte administrateur"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@horama.ai"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 bg-gray-50"
              disabled
            />
            <p className="mt-1 text-xs text-gray-400">
              L&apos;email ne peut pas être modifié
            </p>
          </div>
        </div>
      </SettingSection>

      {/* Logout Section */}
      <SettingSection
        icon={<LogoutIcon />}
        title="Déconnexion"
        description="Se déconnecter de l'interface d'administration"
      >
        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Terminer la session
            </p>
            <p className="text-xs text-gray-500">
              Vous serez redirigé vers la page de connexion
            </p>
          </div>
          <LogoutButton
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            label="Se déconnecter"
          />
        </div>
      </SettingSection>
    </div>
  );
}
