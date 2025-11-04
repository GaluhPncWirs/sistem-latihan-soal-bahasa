import { useEffect, useState } from "react";

export function useGetIdStudent() {
  const [getId, setGetId] = useState<string>("");
  useEffect(() => {
    async function getIdStudent() {
      const getToken = localStorage.getItem("sessionTokenLoginStudent");
      if (getToken) {
        const request = await fetch(`/api/decodeToken?token=${getToken}`);
        //   .then((res: any) => res.json())
        //   .then((data: any) => data.data.idStudent);
        const response = await request.json();

        return setGetId(response.data.idStudent);
      }
    }
    getIdStudent();
  }, []);

  return getId;
}
