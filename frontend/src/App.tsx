import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/api/user/61fd8b608c1c2a001294a4fe");
      console.log({ resp });
      setLoading(false);
      setData(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <span>Загрузка...</span>;
  }

  return (
    <div className="App">
      <h1>Application!</h1>
      {data && (
        <>
          <p>Email: {data.email}</p>
          <p>Username: {data.username}</p>
        </>
      )}
      <button onClick={fetchData}>Сделать запрос</button>
    </div>
  );
}

export default App;
