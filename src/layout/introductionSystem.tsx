"use client";
import { useIdStudentStore } from "@/store/idStudent/state";
import { useIdTeacherStore } from "@/store/idTeacher/state";
import FooterComponent from "@/components/footer/footerComp";
import NavigasiBar from "@/components/navigasiBar/navbar";
import { useEffect } from "react";

export default function LayoutIntroductionsSystem({ children }: any) {
  const fetchIdStudent = useIdStudentStore((func: any) => func.fetchIdStudent);
  const fetchIdTeacher = useIdTeacherStore((func: any) => func.fetchIdTeacher);
  useEffect(() => {
    fetchIdStudent();
  }, []);
  useEffect(() => {
    fetchIdTeacher();
  }, []);
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
      <NavigasiBar />
      {children}
      <FooterComponent />
    </div>
  );
}
