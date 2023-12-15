import { useEffect, useState } from "react";

export function useProfile(){
    const [userData, setUserData] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);   
       fetch("/api/profile").then(response=>{            
            response.json().then(data=>{                
                setUserData(data)
                setLoading(false)                
              });          
            })
      }, []);
      return {loading, userData};
}