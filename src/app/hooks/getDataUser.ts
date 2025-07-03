import { useEffect, useState } from "react";

export function getDataUser() {
  const [dataStudent, setDataStudent] = useState<any>({});
  useEffect(() => {
    const getDataStudent = localStorage.getItem("dataLoginSiswa");
    if (getDataStudent) {
      const convertToObject = JSON.parse(getDataStudent);
      setDataStudent(convertToObject);
    }
  }, []);

  return dataStudent;
}
