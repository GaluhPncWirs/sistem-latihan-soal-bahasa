import { useConvertDate } from "./getConvertDate";

export function useGetDeadlineExams() {
  // untuk fitur deadline
  const waktuHariIni = useConvertDate(new Date().toISOString(), {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .split(" ")
    .slice(0, 3)
    .join(" ");

  const waktuDurasiIni = useConvertDate(new Date().toISOString(), {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .split(" ")
    .slice(4, 5)
    .join(" ");
  function toMinute(val: any) {
    const deleteDot = val.replace(/[:.]/g, "-");
    const [hoursStr, minuteStr = "0"] = deleteDot.split("-").map(Number);
    return hoursStr * 60 + minuteStr;
  }

  function convertDateToISO(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const resultConvert = `${year}-${month}-${day}`;
    return new Date(resultConvert + "T00:00:00").getTime();
  }

  function resultDeadlineExam(tenggat_waktu: string, tgl_ujian: string) {
    const [startTimeExam, endTimeExams] = tenggat_waktu
      .split("-")
      .map((item: any) => item.trim());

    const mulaiUjian = toMinute(startTimeExam);
    const akhirUjian = toMinute(endTimeExams);
    const hariIni = toMinute(waktuDurasiIni);

    let messageExams = "";

    if (tgl_ujian === waktuHariIni) {
      if (hariIni < mulaiUjian) {
        messageExams += "Ujian Belum Dimulai";
      } else if (hariIni > akhirUjian) {
        messageExams += "Ujian Telah Lewat Batas Waktu";
      } else {
        return "ke ujian";
      }
    } else if (convertDateToISO(tgl_ujian) > convertDateToISO(waktuHariIni)) {
      messageExams += "Ujian Belum Dimulai";
    } else {
      messageExams += "Ujian Telah Lewat Batas Waktu";
    }
    return messageExams;
  }
}
