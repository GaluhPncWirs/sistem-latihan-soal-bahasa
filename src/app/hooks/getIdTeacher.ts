import { useEffect, useState } from "react";

export function useGetIdTeacher() {
  const [getId, setGetId] = useState("");
  useEffect(() => {
    const getId = localStorage.getItem("idLoginGuru");
    if (getId) {
      setGetId(getId);
    }
  }, []);

  return getId;
}
