"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser) {
        throw new Error("Email already registered. Please login instead.");
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In a real app, this should be hashed
        profileCompleted: false
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profileCompleted: false
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      router.push("/profile");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const login = async (data: LoginData) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === data.email && u.password === data.password);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        profileCompleted: Boolean(
          user.avatar && 
          user.phone && 
          user.address && 
          user.city && 
          user.state && 
          user.pincode
        )
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      
      // Redirect to home page after successful login
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('Not authenticated');
    
    try {
      // Here you would typically make an API call to update the user profile
      // For now, we'll just update the local state
      setUser({ ...user, ...data });
      
      // Add your API call here
      // await api.updateProfile(data);
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
