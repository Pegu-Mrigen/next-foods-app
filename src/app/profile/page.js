"use client";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const session = useSession();
  const [username, setUsername] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);
  const [imgData, setImgData] = useState({});
  const [data, setData] = useState(null);
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const { status } = session;
  

  useEffect(() => {
    if (status === "authenticated") {
      
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUserInfo(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  if (!session || status === "unauthenticated") {
    return <h1>Please login!</h1>;
  }
  if (status === "loading" || !profileFetched) {
    return "loading profile...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function  handleProfileUpdate (e, data){
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response)
       resolve()
      else reject();
      // if (response.ok) resolve();
      // else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved successfully!",
      error: "Error",
    });
  };

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={userInfo} onSave={handleProfileUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
