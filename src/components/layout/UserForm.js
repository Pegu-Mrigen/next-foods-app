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
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

const UserForm = ({user, onSave}) => {
  const [username, setUsername] = useState(user?.name||"");  
  const [file, setFile] = useState(user?.file||"")
  const [perc, setPerc] = useState(null);
  const [imgData, setImgData] = useState({});
  const [image, setImage] = useState(user?.image || '');
  const [data, setData] = useState({});
  const [phone, setPhone] = useState(user?.phone ||"");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress||"");
  const [postalCode, setPostalCode] = useState(user?.postalCode||"");
  const [city, setCity] = useState(user?.city||"");
  const [country, setCountry] = useState(user?.country||"");
  const [admin, setAdmin] = useState(user?.admin || false);
  const [profileFetched, setProfileFetched] = useState(false);


  const {userData:loggedInUserData} = useProfile()


  function handleAddressChange(propName, value){

    if(propName==="city") setCity(value)
    if(propName==="phone") setPhone(value)
    if(propName==="country") setCountry(value)
    if(propName==="streetAddress") setStreetAddress(value)
    if(propName==="postalCode") setPostalCode(value)

  }

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
  
  return (
    <section  className="md:flex gap-4">
        <div>
            <div className="bg-gray-200  rounded-lg w-full md:max-w-[120px]">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={data?.img||user?.image}                
                alt=""
                width={300}
                height={300}
              />
              <label> 
                <input  
                  
                  type="file"
                  className="hidden"
                
                 onChange={(e)=>setFile(e.target.files[0])}
                  
                />              
                
                <span  
                className="block border border-gray-300 rounded-lg  p-2 text-center cursor-pointer"
                type="submit"
                >
                

                {(perc !== null && perc < 100) ? "Uploading":"Edit image"}
                
                </span>
              </label>

              
              
            </div>
          </div>
          <form className="grow" onSubmit={e=>onSave(e,{name:username, image:data?.img, phone,streetAddress,city, country,postalCode, admin  })}>
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
              disabled={true}
              value={user?.email}
              placeholder="email"
            />
            {/* <label>Phone</label>
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
           <div className="grid grid-cols-2 gap-2">
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
            /> */}

            <AddressInputs addressProps={{phone, streetAddress, postalCode, city, country}} setAddressProps={handleAddressChange} />
            {loggedInUserData.admin && <div>
              {JSON.stringify(admin)}
              
              
              <label htmlFor="adminCb" className="p-2 inline-flex items-center gap-2 mb-2" ><input id="adminCb" type="checkbox" value={"1"} checked={admin} onChange={e=>setAdmin(e.target.checked)} /><span>Admin</span></label>
            </div>}
            <button type="submit">Save</button>
          </form>
    </section>
  )
}

export default UserForm