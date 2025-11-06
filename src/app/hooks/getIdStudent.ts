import { useEffect, useState } from "react";

export function useGetIdStudent() {
  const [getId, setGetId] = useState<string>("");

  useEffect(() => {
    async function getIdStudent() {
      try {
        const request = await fetch(`/api/decodeToken`, {
          credentials: "include",
        });
        const response = await request.json();
        if (response.status) {
          setGetId(response.data.idStudent);
        }
      } catch (err) {
        setGetId("");
        console.error("Gagal mengambil ID student");
      }
    }
    getIdStudent();
  }, []);

  return getId;
}
