"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/utils/axios";

export default function EditProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    business_name: "",
    contact_info: "",
    logo_url: "",
    banner_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get(`/auth/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.put(`/auth/${id}`, profile);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>

      {message && <p className={`mb-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700">Business Name</label>
        <input
          type="text"
          name="business_name"
          value={profile.business_name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <label className="block text-gray-700">Contact Info</label>
        <input
          type="text"
          name="contact_info"
          value={profile.contact_info}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <label className="block text-gray-700">Logo URL</label>
        <input
          type="text"
          name="logo_url"
          value={profile.logo_url}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <label className="block text-gray-700">Banner URL</label>
        <input
          type="text"
          name="banner_url"
          value={profile.banner_url}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          className={`w-full mt-4 px-4 py-2 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
