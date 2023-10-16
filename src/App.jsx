import "./App.css";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const cofiguration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(cofiguration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: "this is a test",
      n: 1,
      size: "1024x1024",
    });
    console.log(res.data.data[0].url);
  };
  return (
    <div className="App">
      <button onClick={generateImage}>Generate Image</button>
    </div>
  );
}

export default App;
