import { useEffect, useState } from "react";
import { getAllRecords, insertRecords } from "./utils/supabaseFunction";

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

  // データ読み込み時の制御フラグ
  const [loading, setLoading] = useState(true);

  // supabaseからの値取得
  const getRecords = async () => {
    try {
      setLoading(true);

      const records = await getAllRecords();
      setRecords(records.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 依存配列なし
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRecords();
  }, []);

  // 学習時間の登録
  const onClickRecord = async () => {
    console.log(studyTime)
    if (studyContent === "" || Number(studyTime) <= 0) {
      setError("入力されていない項目があります。");
      return;
    }
    const record = {
      title: studyContent,
      time: studyTime,
    };

    // supabaseの登録
    await insertRecords(record.title, record.time);
    await getRecords();
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
      {loading ? (
        <h3>Loading....</h3>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {record.title} {record.time}時間
            </li>
          ))}
        </ul>
      )}

      <button onClick={onClickRecord}>登録</button>
      <p>合計時間：{totalTime}/1000(h)</p>
    </>
  );
};
