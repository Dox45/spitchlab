"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";

export default function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();
  const { getToken } = useAuth();

  // Get the token when component mounts
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken({ template: 'spitchlab' });
      setToken(token);
    };
    fetchToken();
  }, [getToken]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return; // Don't proceed if no file or token

    setUploading(true);
    setSuccess(false);
    setFailed(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("http://0.0.0.0:8000/upload-document", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setFailed(true);
      }
    } catch (error) {
      setFailed(true);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  return (
    <div className="inline-block">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        disabled={!token || uploading} // Disable if token not loaded or uploading
      />
      <button
        onClick={triggerFileSelect}
        disabled={!token || uploading}
        className={`px-4 py-2 rounded text-white transition ${
          !token
            ? "bg-gray-400 cursor-not-allowed"
            : uploading
            ? "bg-blue-600"
            : success
            ? "bg-green-600 hover:bg-green-700"
            : failed
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {!token
          ? "Loading..."
          : uploading
          ? "Uploading..."
          : success
          ? "Uploaded!"
          : failed
          ? "Failed"
          : "Add Knowledgebase"}
      </button>
    </div>
  );
}