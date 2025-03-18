"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Building, Globe, Hash } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function UserProfileDashboard() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
  }, [user, loading, router]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-rose-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const fields = [
    { icon: User, label: "Name", key: "name" },
    { icon: Mail, label: "Email", key: "email", disabled: true },
    { icon: Phone, label: "Phone", key: "phone" },
    { icon: MapPin, label: "Address", key: "address" },
    { icon: Building, label: "City", key: "city" },
    { icon: Globe, label: "State", key: "state" },
    { icon: Hash, label: "Pincode", key: "pincode" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-rose-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Profile Dashboard</CardTitle>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name || "",
                            email: user.email || "",
                            phone: user.phone || "",
                            address: user.address || "",
                            city: user.city || "",
                            state: user.state || "",
                            pincode: user.pincode || "",
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label
                        htmlFor={field.key}
                        className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                      >
                        <field.icon className="w-4 h-4" />
                        <span>{field.label}</span>
                      </Label>
                      {isEditing ? (
                        <Input
                          id={field.key}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.key]: e.target.value,
                            })
                          }
                          disabled={field.disabled}
                          className={field.disabled ? "bg-gray-100" : ""}
                        />
                      ) : (
                        <p className="text-gray-900 pt-1">
                          {formData[field.key as keyof typeof formData] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
