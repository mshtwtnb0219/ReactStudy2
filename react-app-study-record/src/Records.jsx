import { useEffect, useState } from "react";
import { getAllRecords } from "./utils/supabaseFunction";

export const Records = () => {
  // 記録
  const [records, setRecords] = useState([]);
  // エラー
  const [error, setError] = useState("");
  const disable = !error === "";

  // 学習内容
  const [studyContent, setStudyContent] = useState("");
  // 学習時間
  const [studyTime, setStudyTime] = useState(0);
  // 合計時間の算出
  const totalTime = records.reduce((sum, record) => {
    return sum + parseInt(record.time);
  }, 0);

  // 学習内容の取得
  const onChangeContent = (e) => setStudyContent(e.target.value);
  // 学習時間の取得
  const onChangeTime = (e) => setStudyTime(e.target.value);

  // supabaseからの値取得
  useEffect(() => {
    const getRecords = async () => {
      const records = await getAllRecords();
      setRecords(records.data);
      console.log(records.data)
    };

    getRecords();
  }, []);

  // 学習時間の登録
  const onClickRecord = () => {
    if (studyContent === "" || !studyTime > 0) {
      setError("入力されていない項目があります。");
      return;
    }
    const record = {
      id: crypto.randomUUID(),
      title: studyContent,
      time: studyTime,
    };

    setRecords([...records, record]);
    setError("");
  };
  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <form>
          <p>
            学習内容
            <input onChange={onChangeContent}></input>
          </p>
          <p>
            学習内容
            <input
              type="number"
              value={studyTime}
              onChange={onChangeTime}
            ></input>
            時間
          </p>
          <p>入力されている学習内容：{studyContent}</p>
          <p>入力されている学習時間：{studyTime}</p>
        </form>
      </div>
      <p disabled={disable}>{error}</p>

      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.title} {record.time}時間
          </li>
        ))}
      </ul>
      <button onClick={onClickRecord}>登録</button>
      <p>合計時間：{totalTime}/1000(h)</p>
    </>
  );
};
