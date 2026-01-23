import { useState } from "react";
import api from "../api/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload", formData);
    setMsg(res.data.message);
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      <p>{msg}</p>
    </div>
  );
}
