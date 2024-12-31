import { useState } from "react";

import Button from "../components/Button.js";
import InputField from "../components/InputField.js";

const Home = () => {
  let [videoUrl, setVideoUrl] = useState("");
  let [captionsList, setCaptionsList] = useState([]);
  let [currCaption, setCurrCaption] = useState("");
  let [startTime, setStartTime] = useState("0");
  let [endTime, setEndTime] = useState("0");
  let [captionToDisplay, setCaptionToDisplay] = useState("");

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
  };

  const handleCaptionChange = (e) => {
    const caption = e.target.value;
    setCurrCaption(caption);
  };

  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;
    setStartTime(startTime);
  };

  const handleEndTimeChange = (e) => {
    const endTime = e.target.value;
    setEndTime(endTime);
  };

  const addCaption = () => {
    setCaptionsList((oldCaptionsList) => {
      const start = parseInt(startTime);
      const end = parseInt(endTime);
      const newCaptionsList = [...oldCaptionsList];
      newCaptionsList.push({ currCaption, start, end });
      setStartTime(0);
      setEndTime(0);
      setCurrCaption("");
      return newCaptionsList;
    });
  };

  const displayCaption = (e) => {
    console.log(currCaption);
    const currentTime = e.target.currentTime;
    const activeCaptionData = captionsList.find((captionData) => {
      console.log(captionData);
      if (currentTime >= parseInt(captionData.start) && currentTime <= parseInt(captionData.end)) {
        return captionData;
      }
      return null;
    });
    let caption = activeCaptionData ? activeCaptionData.currCaption : "";
    setCaptionToDisplay(caption);
    console.log(captionsList);
  };

  return (
    <>
      <div>
        <InputField value={videoUrl} type="text" placeholder="Enter video URL ..." onChange={handleUrlChange} />

        {videoUrl && <video onTimeUpdate={displayCaption} src={videoUrl} controls style={{ width: "600px", height: "auto" }}></video>}
        {videoUrl && (
          <div id="caption-display" style={{ background: "rgba(0, 0, 0, 0.5)", color: "red", padding: "10px", whiteSpace: "pre-wrap" }}>
            {captionToDisplay}
          </div>
        )}
      </div>
      {videoUrl && (
        <div className="grid grid-flow-col grid-cols-2 gap-6">
          <div className="mt-5 border-r-2 border-r-stone-400">
            <InputField
              inputType="textarea"
              value={currCaption}
              label="Caption"
              placeholder="Enter Caption ..."
              onChange={handleCaptionChange}
              min={0}
            />
            <div className="mt-3 grid grid-flow-col">
              <InputField
                inputType="input"
                value={startTime}
                label="Start Time"
                type="number"
                placeholder="Start time (sec)"
                onChange={handleStartTimeChange}
                min={0}
              />
              <InputField
                inputType="input"
                value={endTime}
                label="End Time"
                type="number"
                placeholder="End time (sec)"
                onChange={handleEndTimeChange}
                min={startTime}
              />
            </div>
            <Button classes="block" btnText="Add Caption" btnClasses="ml-5 mt-5" onBtnClick={addCaption} />
          </div>
          <div className="mt-5 mr-5">
            <h1 className="text-center text-xl font-semibold mb-5">Added Captions</h1>
            <div className="bg-stone-100 rounded-md">
              {captionsList.map((captionData) => {
                return (
                  <div className="grid grid-flow-col grid-cols-10 mt-2  px-5 py-2">
                    <div className="grid grid-flow-col grid-cols-8 col-span-9">
                      <p className="col-span-6 whitespace-pre !break-words">Caption: {captionData.currCaption}</p>
                      <p>Start Time: {captionData.start}</p>
                      <p>End Time: {captionData.end}</p>
                    </div>
                    <div>&#x274c;</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

// https://res.cloudinary.com/dal5laebp/video/upload/v1735614650/lubwng2rmodymjpyvsow.mp4
