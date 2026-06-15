import { supabase } from "./supabase";

// データ取得(全件)
export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records;
};

export const insertRecords = async (title, time) => {
  const { error } = await supabase.from("study-record").insert([
    {
      title,
      time,
    },
  ]);

  if (error) {
    console.error(error);
    return;
  }
};
