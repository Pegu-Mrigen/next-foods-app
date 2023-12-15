"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import LeftSide from "@/components/icons/LeftSide";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation'
import MenuItemForm from "@/components/layout/MenuItemForm";

const NewItemsPage = () => {
  const session = useSession();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);
  const [imgData, setImgData] = useState({});
  const [data, setData] = useState({});

  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [redirectToItems, setRedirectToItems] = useState(false);
const router = useRouter()

  const { status } = session;

  useEffect(() => {
    const uploadFile = () => {
      toast.success("Uploading...");

      const name = new Date().getTime() + file.name;

      //console.log(name)
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
      console.log(uploadTask);
      
    };
    file && uploadFile();

    console.log(uploadFile);
    

    // toast.success("Upload completed")
  }, [file]);

  const { loading, userData } = useProfile();

  if (loading) {
    return "Loading user info...";
  }
  // if(!data.admin){
  //   return "Not an admin..."
  // }

  
  // const handleFormSubmit = async (e, data) => {
  const handleFormSubmit = async (e, newData) => {
    e.preventDefault();
    newData={...newData}
    
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        //body: JSON.stringify({ image: data?.img, name, description, basePrice }),
        body: JSON.stringify({...newData, image: data?.img}),
        headers: { "Content-type": "application/json" },
      });
      
     
      
      if (response.ok) resolve();
      else reject();
      
      
      
    });
    
    await toast.promise(savingPromise, {
      loading: "Saving the food item",
      success: "Saved",
      error: "Error",
    });
    console.log(savingPromise)
    setRedirectToItems(true)
    
    
    
  };


  if (redirectToItems) {
    return redirect('/menu-items');
  }

  

  return (
    <section className="flex flex-col mt-8 items-center justify-center">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-2xl mx-auto ">
     <Link href="/menu-items"  className="button">
     <LeftSide />
     Show all menu item
     </Link>
     </div>
     
      
      <div className="flex">
      <div className="max-w-md mx-auto mt-8 grid" style={{ gridTemplateColumns: "1fr" }} >
        {data?.img ? (
          <Image
            className="rounded-lg w-full h-full "
             src={data.img || imgData}
            //src={data.img}
            alt=""
            width={150}
            height={150}             
          />
        ) : (
          <div className="bg-gray-200 p-4 text-gray-500 rounded-lg flex justify-center items-center mt-7 ">
            No Image
          </div>
        )}
        <label>
          <input
            // type={(perc !== null && perc < 100) ? "":"file"}
            type="file"
            className="hidden"
            //onChange={handleFileChange}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <span
            className="block border border-gray-300 rounded-lg  p-2 m-2 text-center cursor-pointer"
            type="submit"
          >
            {perc !== null && perc < 100 ? "Uploading" : "Edit"}
          </span>
        </label>
      </div>
      {/* <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
        <div className="flex items-start  p-2 justify-center gap-4">
          <div className="grow">
            <label>Menu item name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label> Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Base price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form> */}
    <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}  />
      </div>
      
    </section>
  );
};

export default NewItemsPage;
