```tsx
// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Verticales from "./pages/Verticales";
import UseCases from "./pages/UseCases";
import News from "./pages/News";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verticales" element={<Verticales />} />
        <Route path="/cas-usage" element={<UseCases />} />
        <Route path="/actualites" element={<News />} />
        <Route path="/contact" element={<Contact />} />

        {/* convenience */}
        <Route path="/accueil" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}
```