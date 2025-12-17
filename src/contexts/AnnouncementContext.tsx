"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface AnnouncementContextType {
  isVisible: boolean;
  isAnimating: boolean;
  dismiss: () => void;
  show: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

interface AnnouncementProviderProps {
  children: ReactNode;
  initialVisible?: boolean;
}

export function AnnouncementProvider({
  children,
  initialVisible = true
}: AnnouncementProviderProps) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  const dismiss = useCallback(() => {
    setIsAnimating(true);
    // Laisser le temps pour l'animation de sortie
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 400); // Durée de l'animation
  }, []);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnnouncementContext.Provider value={{ isVisible, isAnimating, dismiss, show }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    // Retourner des valeurs par défaut si pas de provider (pages sans bandeau)
    return {
      isVisible: false,
      isAnimating: false,
      dismiss: () => {},
      show: () => {},
    };
  }
  return context;
}
