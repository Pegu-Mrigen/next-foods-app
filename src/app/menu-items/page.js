"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { storage } from "@/libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { resolve } from "styled-jsx/css";
import Link from "next/link";
import RightSide from "@/components/icons/RightSide";

const MenuItemsPage = () => {
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
  const [isAdmin, setIsAdmin] = useState(true);
  const [profileFetched, setProfileFetched] = useState(false);

  const { status } = session;

  // useEffect(() => {
  //   const uploadFile = () => {
  //     toast.success("Uploading...");

  //     const name = new Date().getTime() + file.name;

  //     //console.log(name)
  //     const storageRef = ref(storage, file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         setPerc(progress);
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         // Handle successful uploads on complete
  //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           // console.log('File available at', downloadURL);
  //           setData((prev) => ({ ...prev, img: downloadURL }));
  //         });
  //       }
  //     );
  //     console.log(uploadTask);
  //   };
  //   file && uploadFile();

  //   console.log(uploadFile);

  //   // toast.success("Upload completed")
  // }, [file]);


  const [menuItems, setMenuItems]=useState([])

  const { loading, userData } = useProfile();

  useEffect(() => {

    fetch("/api/menu-items").then(res=>{
      res.json().then(menuItems=>{
        setMenuItems(menuItems)
      })
    })
    
    
  }, [])
  

  if (loading) {
    return "Loading user info...";
  }
  // if(!data.admin){
  //   return "Not an admin."
  // }
  if(!isAdmin){
    return "Not an admin."
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify({ image: data.img, name, description, basePrice }),
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
  };
  return (
    // <section className="mt-8">
    //   <UserTabs isAdmin={true} />
    //   <div className="mt-4 grid " style={{ gridTemplateColumns: "1fr" }}>
    //     {data?.img ? (
    //       <Image
    //         className="rounded-lg w-full h-full mb-1"
    //         // src={data.img || imgData}
    //         src={data.img}
    //         alt=""
    //         width={300}
    //         height={300}
    //       />
    //     ) : (
    //       <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 ">
    //         No Image
    //       </div>
    //     )}
    //     <label>
    //       <input
    //         // type={(perc !== null && perc < 100) ? "":"file"}
    //         type="file"
    //         className="hidden"
    //         //onChange={handleFileChange}
    //         onChange={(e) => setFile(e.target.files[0])}
    //       />

    //       <span
    //         className="block border border-gray-300 rounded-lg  p-2 m-2 text-center cursor-pointer"
    //         type="submit"
    //       >
    //         {perc !== null && perc < 100 ? "Uploading" : "Edit"}
    //       </span>
    //     </label>
    //   </div>
    //   <form className="mt-8 max-w-md mx-auto" onClick={handleFormSubmit}>
    //     <div className="flex items-start  p-2 justify-center gap-4">
    //       <div className="grow">
    //         <label>Menu item name</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //         <label> Description</label>
    //         <input
    //           type="text"
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //         />
    //         <label>Base price</label>
    //         <input
    //           type="text"
    //           value={basePrice}
    //           onChange={(e) => setBasePrice(e.target.value)}
    //         />
    //         <button type="submit">Save</button>
    //       </div>
    //     </div>
    //   </form>
    // </section>
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
     <div className="mt-8">
     <Link href="/menu-items/new"  className="button">Create new menu item
     <RightSide />
     </Link>
     </div>
     <div>
      <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
      <div className="grid grid-cols-3 gap-2">
      {menuItems?.length>0 && menuItems.map((item)=>(
        <Link href={"/menu-items/edit/"+ item._id} key={item._id} className="bg-gray-200 rounded-lg p-2 flex flex-col items-center justify-center">
         <div className="relative"  >
         <Image src={item.image || "/Cherry.png "} alt="" width={200} height={200} className="rounded-md  " /></div> <div className="text-center mt-2">{item.name}</div></Link>
      ))}
      </div>
     </div>
    </section>
  );
};

export default MenuItemsPage;
