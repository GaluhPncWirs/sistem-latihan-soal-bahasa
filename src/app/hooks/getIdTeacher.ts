import { useEffect, useState } from "react";

export function useGetIdTeacher() {
  const [getId, setGetId] = useState("");
  useEffect(() => {
    async function getIdTeacher() {
      try {
        const request = await fetch("/api/decodeToken", {
          credentials: "include",
        });
        const response = await request.json();
        if (response.status) {
          setGetId(response.data.idTeacher);
        }
      } catch (err) {
        setGetId("");
        console.error("Gagal decode token fg");
      }
    }
    getIdTeacher();
  }, []);

  return getId;
}
