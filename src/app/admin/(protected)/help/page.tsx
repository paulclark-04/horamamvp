"use client";

// ============================================================================
// ICONS
// ============================================================================

const MailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 6l-10 7L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function HelpPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Centre d&apos;aide</h1>
        <p className="mt-2 text-gray-500">
          Contactez notre équipe support pour toute question
        </p>
      </div>

      {/* Info */}
      <div className="mx-auto max-w-2xl rounded-xl border border-blue-200 bg-blue-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-blue-600">
            <InfoIcon />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Interface d&apos;administration</h3>
            <p className="mt-1 text-sm text-blue-700">
              Cette interface vous permet de gérer les leads, contacts, documents et candidatures
              reçus via le site vitrine Horama.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-center text-white">
        <h2 className="text-xl font-bold">Besoin d&apos;aide ?</h2>
        <p className="mt-2 text-blue-100">
          Notre équipe support est disponible pour répondre à vos questions
        </p>
        <div className="mt-6">
          <a
            href="mailto:support@horama.ai"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-blue-600 shadow-lg transition-all hover:shadow-xl"
          >
            <MailIcon />
            <span>support@horama.ai</span>
          </a>
        </div>
      </div>
    </div>
  );
}
