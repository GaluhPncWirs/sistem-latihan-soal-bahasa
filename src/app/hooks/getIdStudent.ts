import { useState } from "react";

export function useGetIdStudent(tokenJWT: any) {
  const [getId, setGetId] = useState<string>("");
  async function getIdStudent() {
    if (tokenJWT) {
      const request = await fetch(`/api/decodeToken?token=${tokenJWT}`);
      const response = await request.json();
      return setGetId(response.data.idStudent);
    }
  }
  getIdStudent();

  return getId;
}
