-- =============================================================================
-- SEED DATA - Données d'exemple pour démonstration
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. LEADS & CONTACTS
-- -----------------------------------------------------------------------------

INSERT INTO public.leads_contacts (type, nom, prenom, email, telephone, societe, statut) VALUES
  -- Leads
  ('lead', 'Dupont', 'Marie', 'marie.dupont@techcorp.fr', '06 12 34 56 78', 'TechCorp', 'new'),
  ('lead', 'Martin', 'Jean', 'jean.martin@innovate.io', '06 98 76 54 32', 'Innovate.io', 'contacted'),
  ('lead', 'Bernard', 'Sophie', 'sophie.bernard@startup.com', '07 11 22 33 44', 'StartupXYZ', 'qualified'),
  ('lead', 'Petit', 'Lucas', 'lucas.petit@bigcompany.fr', '06 55 66 77 88', 'BigCompany', 'new'),
  ('lead', 'Robert', 'Emma', 'emma.robert@digital.fr', '07 99 88 77 66', 'Digital Agency', 'contacted'),
  ('lead', 'Richard', 'Thomas', 'thomas.richard@enterprise.com', '06 44 33 22 11', 'Enterprise SA', 'lost'),
  ('lead', 'Durand', 'Camille', 'camille.durand@fintech.io', '07 12 34 56 78', 'FinTech Solutions', 'qualified'),
  ('lead', 'Moreau', 'Antoine', 'antoine.moreau@retail.fr', '06 87 65 43 21', 'Retail Plus', 'new'),
  -- Contacts
  ('contact', 'Lefebvre', 'Julie', 'julie.lefebvre@partner.com', '06 11 22 33 44', 'Partner Inc', NULL),
  ('contact', 'Garcia', 'Pierre', 'pierre.garcia@vendor.fr', '07 55 66 77 88', 'Vendor SA', NULL),
  ('contact', 'Roux', 'Claire', 'claire.roux@consultant.io', '06 99 88 77 66', 'Consulting Group', NULL);

-- -----------------------------------------------------------------------------
-- 2. INTERACTIONS (liées aux leads)
-- -----------------------------------------------------------------------------

-- On récupère les IDs des leads pour créer les interactions
DO $$
DECLARE
  lead_marie_id uuid;
  lead_jean_id uuid;
  lead_sophie_id uuid;
  lead_emma_id uuid;
  lead_camille_id uuid;
BEGIN
  SELECT id INTO lead_marie_id FROM public.leads_contacts WHERE email = 'marie.dupont@techcorp.fr';
  SELECT id INTO lead_jean_id FROM public.leads_contacts WHERE email = 'jean.martin@innovate.io';
  SELECT id INTO lead_sophie_id FROM public.leads_contacts WHERE email = 'sophie.bernard@startup.com';
  SELECT id INTO lead_emma_id FROM public.leads_contacts WHERE email = 'emma.robert@digital.fr';
  SELECT id INTO lead_camille_id FROM public.leads_contacts WHERE email = 'camille.durand@fintech.io';

  INSERT INTO public.interactions (type, notes, date, lead_id) VALUES
    ('email', 'Premier contact par email suite à la demande sur le site. Intéressé par nos services IA.', NOW() - INTERVAL '5 days', lead_marie_id),
    ('call', 'Appel de découverte de 30 minutes. Besoin identifié : automatisation des processus métier.', NOW() - INTERVAL '3 days', lead_jean_id),
    ('meeting', 'Réunion en visio pour présentation de notre solution. Très bon retour, demande de devis.', NOW() - INTERVAL '2 days', lead_sophie_id),
    ('email', 'Envoi de la proposition commerciale détaillée avec planning prévisionnel.', NOW() - INTERVAL '1 day', lead_sophie_id),
    ('call', 'Relance téléphonique. En attente de validation budget interne.', NOW() - INTERVAL '4 days', lead_emma_id),
    ('email', 'Demande de documentation technique supplémentaire.', NOW() - INTERVAL '6 hours', lead_emma_id),
    ('meeting', 'Démonstration produit réalisée. Client convaincu, passage à la phase de négociation.', NOW() - INTERVAL '12 hours', lead_camille_id),
    ('other', 'Contact LinkedIn - Échange informel sur les tendances du marché.', NOW() - INTERVAL '7 days', lead_marie_id);
END $$;

-- -----------------------------------------------------------------------------
-- 3. OFFRES D'EMPLOI
-- -----------------------------------------------------------------------------

INSERT INTO public.offres_emploi (titre, description, statut) VALUES
  ('Développeur Full Stack Senior',
   'Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe technique. Stack : React, Node.js, PostgreSQL. Expérience minimum 5 ans.',
   'published'),
  ('Data Scientist',
   'Poste de Data Scientist pour travailler sur des projets innovants en IA et Machine Learning. Python, TensorFlow, expérience en NLP appréciée.',
   'published'),
  ('Chef de Projet Digital',
   'Gestion de projets digitaux complexes pour nos clients grands comptes. Méthodologie Agile, excellent relationnel client requis.',
   'published'),
  ('Stagiaire Développement Web',
   'Stage de 6 mois pour accompagner l''équipe sur le développement de nos applications web. Formation assurée.',
   'draft'),
  ('UX/UI Designer',
   'Conception d''interfaces utilisateur innovantes. Maîtrise Figma, expérience en Design System.',
   'archived');

-- -----------------------------------------------------------------------------
-- 4. CANDIDATURES
-- -----------------------------------------------------------------------------

DO $$
DECLARE
  offre_fullstack_id uuid;
  offre_datascientist_id uuid;
  offre_chef_projet_id uuid;
BEGIN
  SELECT id INTO offre_fullstack_id FROM public.offres_emploi WHERE titre = 'Développeur Full Stack Senior';
  SELECT id INTO offre_datascientist_id FROM public.offres_emploi WHERE titre = 'Data Scientist';
  SELECT id INTO offre_chef_projet_id FROM public.offres_emploi WHERE titre = 'Chef de Projet Digital';

  INSERT INTO public.candidatures (nom, prenom, email, cv_url, offre_id, statut) VALUES
    ('Lemaire', 'Julien', 'julien.lemaire@gmail.com', NULL, offre_fullstack_id, 'new'),
    ('Fontaine', 'Marine', 'marine.fontaine@outlook.fr', NULL, offre_fullstack_id, 'reviewing'),
    ('Chevalier', 'Maxime', 'maxime.chevalier@yahoo.fr', NULL, offre_datascientist_id, 'new'),
    ('Girard', 'Léa', 'lea.girard@gmail.com', NULL, offre_datascientist_id, 'reviewing'),
    ('Bonnet', 'Alexandre', 'alexandre.bonnet@proton.me', NULL, offre_chef_projet_id, 'new'),
    ('Mercier', 'Charlotte', 'charlotte.mercier@gmail.com', NULL, offre_fullstack_id, 'hired'),
    ('Blanc', 'Nicolas', 'nicolas.blanc@outlook.com', NULL, offre_datascientist_id, 'rejected');
END $$;

-- -----------------------------------------------------------------------------
-- 5. CATEGORIES & ARTICLES
-- -----------------------------------------------------------------------------

INSERT INTO public.categories (nom) VALUES
  ('Intelligence Artificielle'),
  ('Développement Web'),
  ('Data Science'),
  ('Actualités Horama');

DO $$
DECLARE
  cat_ia_id uuid;
  cat_web_id uuid;
  cat_data_id uuid;
  cat_horama_id uuid;
BEGIN
  SELECT id INTO cat_ia_id FROM public.categories WHERE nom = 'Intelligence Artificielle';
  SELECT id INTO cat_web_id FROM public.categories WHERE nom = 'Développement Web';
  SELECT id INTO cat_data_id FROM public.categories WHERE nom = 'Data Science';
  SELECT id INTO cat_horama_id FROM public.categories WHERE nom = 'Actualités Horama';

  INSERT INTO public.articles (titre, slug, contenu, statut, published_at, category_id) VALUES
    ('L''IA générative révolutionne le monde de l''entreprise',
     'ia-generative-entreprise',
     'L''intelligence artificielle générative transforme profondément les processus métier. Découvrez comment les entreprises adoptent ces nouvelles technologies pour gagner en productivité et en innovation.',
     'published',
     NOW() - INTERVAL '10 days',
     cat_ia_id),
    ('Les meilleures pratiques React en 2025',
     'meilleures-pratiques-react-2025',
     'React continue d''évoluer avec de nouvelles fonctionnalités. Server Components, Suspense, et les dernières optimisations de performance sont au programme de cet article technique.',
     'published',
     NOW() - INTERVAL '5 days',
     cat_web_id),
    ('Introduction au Machine Learning pour les débutants',
     'introduction-machine-learning',
     'Le Machine Learning n''a jamais été aussi accessible. Cet article vous guide dans vos premiers pas avec Python et les bibliothèques essentielles comme scikit-learn.',
     'published',
     NOW() - INTERVAL '3 days',
     cat_data_id),
    ('Horama lève 2M€ pour accélérer son développement',
     'horama-levee-fonds',
     'Horama annonce une levée de fonds de 2 millions d''euros pour accélérer le développement de sa plateforme d''IA et recruter de nouveaux talents.',
     'published',
     NOW() - INTERVAL '1 day',
     cat_horama_id),
    ('Les tendances DevOps à surveiller',
     'tendances-devops',
     'Kubernetes, GitOps, Platform Engineering... Quelles sont les tendances qui vont façonner le DevOps dans les années à venir ?',
     'draft',
     NULL,
     cat_web_id);
END $$;
