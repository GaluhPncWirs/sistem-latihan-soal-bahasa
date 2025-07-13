import { useEffect, useState } from "react";


export function useGetIdStudent() {
    const [getId, setGetId] = useState("")
    useEffect(() => {
        const getId = localStorage.getItem("idLoginSiswa");
        if(getId){
            setGetId(getId)
        }
    },[])

    return getId
}