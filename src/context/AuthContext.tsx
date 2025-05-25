"use client";

import { getInstagramProfile } from "@/app/actions/instagramService";
import type React from "react";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

type FacebookPage = {
  page_id: string;
  page_name: string;
  fb_user_id: string;
  ig_id: string;
  is_selected: boolean;
};

type User = any; // Replace with actual User type if available
export type InstagramProfile = {
  biography: string;
  created_at: string;
  followers_count: number;
  follows_count: number;
  ig_id: string;
  is_verified: boolean;
  profile_picture_url?: string;
  user_id: string;
  username: string;
  connected: boolean;
};
type AuthContextType = {
  user: User | null;
  facebookPage: FacebookPage | null;
  instagramProfile: InstagramProfile | null;
  login: (user: User) => void;
  logout: () => void;
  connectPage: (page: FacebookPage | null) => void;
  disconnectPage: () => void;
  setInstagramProfile: (profile: InstagramProfile | null) => void;
  syncInstagramProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [facebookPage, setFacebookPage] = useState<FacebookPage | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [instagramProfile, setInstagramProfile] =
    useState<InstagramProfile | null>(null);

  useEffect(() => {
    const storedPage = localStorage.getItem("facebook_page");
    if (storedPage) {
      try {
        const parsedPage = JSON.parse(storedPage) as FacebookPage;
        setFacebookPage(parsedPage);
      } catch (error) {
        console.error("Error parsing stored Facebook page:", error);
        localStorage.removeItem("facebook_page");
      }
    }
  }, []);

  const connectPage = (page: FacebookPage | null) => {
    setFacebookPage(page);
    if (page) {
      localStorage.setItem("facebook_page", JSON.stringify(page));
    } else {
      localStorage.removeItem("facebook_page");
    }
  };

  const disconnectPage = () => {
    setFacebookPage(null);
    localStorage.removeItem("facebook_page");
  };

  const login = (user: User) => {
    setUser(user);
    // Store user data in local storage or cookies if needed
  };

  const logout = () => {
    setUser(null);
    // Remove user data from local storage or cookies if needed
  };

  const setInstagramProfileAndSave = (profile: InstagramProfile | null) => {
    setInstagramProfile(profile);
    // Optionally, store the profile in local storage or cookies
  };

  const syncInstagramProfile = async () => {
    try {
      const res = await getInstagramProfile(
        localStorage.getItem("access_token") as string
      );
      if (!res.ok) throw new Error("Failed to fetch IG profile");
      const profile: InstagramProfile | null = await res.json();
      setInstagramProfile(profile);
    } catch (err) {
      console.error("Failed to sync IG profile", err);
      setInstagramProfile(null);
    }
  };

  const value: AuthContextType = {
    user,
    facebookPage,
    instagramProfile,
    login,
    logout,
    connectPage,
    disconnectPage,
    setInstagramProfile: setInstagramProfileAndSave,
    syncInstagramProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
