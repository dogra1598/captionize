import { useState } from "react";

import Button from "../components/Button.js";
import InputField from "../components/InputField.js";

const Home = () => {
  let [videoUrl, setVideoUrl] = useState("");
  let [captionsList, setCaptionsList] = useState([]);
  let [currCaption, setCurrCaption] = useState("");
  let [startTime, setStartTime] = useState("");
  let [endTime, setEndTime] = useState("");
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
      setStartTime("");
      setEndTime("");
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
      <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-30 xl:mx-30 2xl:mx-[10rem] mt-10">
        <div className="md:grid md:grid-flow-col md:grid-cols-5 md:gap-4">
          <InputField
            value={videoUrl}
            label="Video URL"
            type="text"
            placeholder="Enter video URL ..."
            onChange={handleUrlChange}
            containerClasses="md:col-span-4"
          />
          <Button btnText="Load Video" btnClasses="mt-2 w-full md:self-end md:mt-0" />
        </div>
        {videoUrl && (
          <div className="lg:flex mt-10">
            <video onTimeUpdate={displayCaption} src={videoUrl} controls className="w-full lg:mr-10 lg:w-[35rem] xl:w-[45rem] self-center"></video>
            <div className="self-center mt-5 lg:mt-0 lg:w-full">
              <InputField
                inputType="textarea"
                value={currCaption}
                label="Caption"
                placeholder="Enter Caption ..."
                onChange={handleCaptionChange}
                rows={6}
                name="captionArea"
                textareaClasses="resize-none"
              />
              <div className="mt-3 grid grid-flow-col gap-5">
                <InputField
                  inputType="input"
                  value={startTime}
                  label="Start Time"
                  type="number"
                  name="startTime"
                  placeholder="Start time (in sec)"
                  onChange={handleStartTimeChange}
                  min={0}
                />
                <InputField
                  inputType="input"
                  value={endTime}
                  label="End Time"
                  type="number"
                  name="endTime"
                  placeholder="End time (in sec)"
                  onChange={handleEndTimeChange}
                  min={startTime}
                />
              </div>
              <Button classes="block" btnText="Add Caption" btnClasses="mt-5 w-full" onBtnClick={addCaption} />
            </div>
          </div>
        )}
        {videoUrl && captionToDisplay && <div className="bg-slate-400  whitespace-pre-wrap mt-2 px-5 py-3 rounded">{captionToDisplay}</div>}
      </div>
      {videoUrl && captionsList.length > 0 && (
        <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-30 xl:mx-30 2xl:mx-[10rem] mt-10 mb-10">
          <h1 className="text-2xl font-semibold mb-3">Added Captions</h1>
          {captionsList.map((captionData) => {
            return (
              <div className="bg-[rgba(216,196,182,0.3)] rounded-md grid mt-2 px-5 py-2">
                <div className="flex justify-between w-full">
                  <div className="flex text-stone-500 text-md font-semibold self-center">
                    <p className="mr-8">From:&nbsp; {captionData.start} sec</p>
                    <p className="">To:&nbsp; {captionData.end} sec</p>
                  </div>
                  <div className="text-red-500 text-xl self-center cursor-pointer">&#x274c;</div>
                </div>
                <div className="mt-2 max-h-36 overflow-x-hidden overflow-y-scroll text-stone-700">
                  <p className="whitespace-pre-wrap !break-words">{captionData.currCaption}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;

// https://res.cloudinary.com/dal5laebp/video/upload/v1735614650/lubwng2rmodymjpyvsow.mp4
