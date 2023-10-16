import "./App.css";
import OpenAI from "openai";
import { useState } from "react";
function App() {
  const [image, setImage] = useState(null);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true,
  });

  const generateImage = async () => {
    const image = await openai.images.generate({
      prompt: "A cute baby sea otter",
    });

    console.log(image.data);
    setImage(image.data[0].url);
  };
  return (
    <div className="App">
      <button onClick={generateImage}>Generate Image</button>
      {image && <img src={image} alt={"openai 이미지 생성"} />}
    </div>
  );
}

export default App;
