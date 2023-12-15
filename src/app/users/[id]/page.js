"use client";
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const { loading, userData } = useProfile();

  const { id } = useParams();

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        const user = users.find((u) => u._id === id);
        setUser(user);
      });
    });
  }, [id]);

  const handleSaveButtonClick = async (e, data) => {
    e.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error occurred while saving user...",
    });
  };

  if (loading) {
    return "Loading user info... ";
  }
  if (!userData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        User info form
        <div>
          <UserForm user={user} onSave={handleSaveButtonClick} />
        </div>
      </div>
    </section>
  );
};

export default EditUserPage;
