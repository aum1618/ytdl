import axios from "axios";
import React, { useState } from "react";
import logo from "./assets/ytlogo.svg";
// import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const App = () => {
  const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const override = css`
  //   display: block;
  //   margin: 0 auto;
  //   border-color: red;
  // `;

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/download?url=${urlValue}`
      );
      setData(response.data);
      setUrlValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div>
          <img className="w-20 h-20" src={logo} alt="logo" />
        </div>
        <div className="text-4xl font-bold text-white flex items-center justify-center ">
          <h1>
            <span className="text-red-600">Youtube</span> downloader
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Enter URL"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            className="outline-none p-2 bg-blue-200 border-2 border-gray-500 rounded-md md:mr-4"
          />
        </div>
        <div className="bg-blue-600 text-white py-2 px-6 rounded-md cursor-pointer">
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
      <div className="mt-6 align-center flex justify-center flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <RingLoader
              // css={override}
              size={50}
              color={"#ffffff"}
              loading={isLoading}
            />
          </div>
        ) : data !== null ? (
          <div>
            <div className="my-4">
              <iframe width="100%" height="auto" src={data.url} title="video" />
            </div>
            <div className="align-center flex justify-center flex-col">
              {data.info.map((formatName, index) => (
                <div key={index}>
                  <button className="bg-red-600 text-white py-2 px-6 rounded-md cursor-pointer m-2">
                    <a
                      href={formatName.url}
                      target="_blank"
                      download
                      className="outline-none font-bold"
                    >
                      {formatName.mimeType.split(";")[0] + " "}
                      {formatName.hasVideo ? formatName.height + "p" : ""}
                    </a>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-red-600 font-bold mt-10">No download yet</div>
        )}
      </div>
    </div>
  );
};

export default App;
