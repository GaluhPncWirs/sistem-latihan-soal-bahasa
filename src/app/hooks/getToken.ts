import { useEffect, useState } from "react";

export function useGetToken() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const tokenJWT = localStorage.getItem("sessionTokenLoginStudent");
    if (tokenJWT) {
      setToken(tokenJWT);
    }
  }, []);

  return token;
}
