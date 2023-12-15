"use client";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
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
  const [file, setFile] = useState("")
  const [perc, setPerc] = useState(null);
  const [imgData, setImgData] = useState({});
  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

 



  const { status } = session;
  
  
  useEffect(() => {
   
    const uploadFile = () => {
      toast.success("Uploading...")
     
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
                default: ;
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
        console.log(uploadTask)
        
      };
      file && uploadFile();
      
      console.log(uploadFile)
     
      // toast.success("Upload completed")
    }, [file]);
  
  console.log(data);

  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.data.user.name);
      setImgData(session.data.user.image);
      fetch("/api/profile").then(response=>{
        // response.json().then(data=>console.log(data))
        response.json().then(data=>
          
          {
            setCity(data.city)
            setCountry(data.country)
            setPostalCode(data.postalCode)
            setStreetAddress(data.streetAddress)
            setPhone(data.phone)
            setIsAdmin(data.admin)
            setProfileFetched(true)
          })
      })
    }
  }, [session, status]);

  if (!session || (status === "unauthenticated") ) {
    return <h1>Please login!</h1> ;
  }
  if (status === "loading" || !profileFetched) {
    return "loading profile...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

//const data.img = session.data.user.image;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // setSaved(false);
    // // setIsSaving(true);
    // toast("saving...")
    // const response = await fetch("/api/profile", {
    //   method: "PUT",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify({ name: username, image:data.img }),
    // });
    // setIsSaving(false);
    // if (response.ok) {
    //   setSaved(true);

    //   toast.success("Profile saved successfully!")
    // }
    const savingPromise= new Promise(async (resolve, reject)=>{

    
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: username, image:data.img,
      
      streetAddress, phone, postalCode, city, country}),
    });
    
    if (response.ok) resolve()

   else  reject()
      

     
  })

  await toast.promise(savingPromise,{
    loading:"Saving...",
    success:"Profile saved successfully!",
    error:"Error",
  })

  };

  // const handleFileChange = async (e) => {
  //   //e.preventDefault()
  //   console.log(e);

  //   const files = e.target.files;
  //   if (files?.length === 1) {
  //     const data = new FormData();
  //     data.set("file", files[0]);
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: data,
  //       // headers:{"Content-Type":"multipart/form-data"}
  //     });
  //   }
  // };
  return (
    <section className="mt-8">

     <UserTabs isAdmin={isAdmin} />
    
     

      {session?(<div className="max-w-2xl mx-auto mt-8">
        {/* {saved && (
          <SuccessBox>Profile saved successfully!</SuccessBox>
        )}
        {isSaving && (
          <InfoBox>Saving...</InfoBox>
        )} */}
        {/* {isUploading && (
          <h2 className="text-center bg-blue-100 p-2 rounded-lg border border-blue-400">
            Uploading...
          </h2>
        )} */}
        <div className="flex gap-2">
          <div>
            <div className="bg-gray-200  rounded-lg max-w-[120px]">
              <Image

                className="rounded-lg w-full h-full mb-1"
                src={data.img || imgData}
                
                alt=""
                width={300}
                height={300}
              />
              <label> 
                <input  
                  // type={(perc !== null && perc < 100) ? "":"file"}
                  type="file"
                  className="hidden"
                 //onChange={handleFileChange}
                 onChange={(e)=>setFile(e.target.files[0])}
                  
                />
                {/* <span
                className="block border border-gray-300 rounded-lg  p-2 text-center cursor-pointer"
                type="submit"
                >
                Edit
                </span> */}
                
                <span  
                className="block border border-gray-300 rounded-lg  p-2 text-center cursor-pointer"
                type="submit"
                >
                

                {(perc !== null && perc < 100) ? "Uploading":"Edit"}
                
                </span>
              </label>

              
              
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileUpdate}>
            <label>First and last name</label>
            <input
              type="text"
              placeholder="First and last name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              disabled={"true"}
              value={session.data.user.email}
            />
            <label>Phone</label>
            <input
              type="tel"
              
              placeholder="Phone number"

              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Street address</label>
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
           <div className="flex gap-2">
           <div>
           <label>Postal code</label>
            <input 
            
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              
            />
           </div>
            <div>
            <label>City</label>
            <input
            
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            </div>
           </div>
           <label>Country</label>
           <input 
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>):"Please login!"}
    </section>
  );
};

export default ProfilePage;
