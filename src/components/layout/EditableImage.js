import Image from "next/image";
import { useEffect } from "react";

export default function EditableImage({ link, setLink }) {
  const [file, setFile] = useState("");

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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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

  return (
    <>
      {link && <Image
        className="rounded-lg w-full h-full mb-1"
        src={data.img || imgData || link}
        alt=""
        width={300}
        height={300}
      />}
      <label>
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <span
          className="block border border-gray-300 rounded-lg  p-2 text-center cursor-pointer"
          type="submit"
        >
          {perc !== null && perc < 100 ? "Uploading" : "Edit"}
        </span>
      </label>
    </>
  );
}
