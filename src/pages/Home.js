import { useState } from "react";

import Button from "../components/Button.js";
import InputField from "../components/InputField.js";

const Home = () => {
  let [videoUrlInput, setVideoUrlInput] = useState("");
  let [videoUrl, setVideoUrl] = useState("");
  let [isVideoLoaded, setIsVideoLoaded] = useState(false);
  let [captionsList, setCaptionsList] = useState([]);
  let [currCaption, setCurrCaption] = useState("");
  let [startTime, setStartTime] = useState("");
  let [endTime, setEndTime] = useState("");
  let [captionToDisplay, setCaptionToDisplay] = useState("");

  const handleUrlChange = (event) => {
    const url = event.target.value;
    if (!url) {
      setVideoUrl("");
    }
    setVideoUrlInput(url);
  };

  const onLoadVideoFormUrl = () => {
    if (videoUrlInput) {
      setVideoUrl(videoUrlInput.trim());
    }
  };

  const onVideoDataLoaded = (event) => {
    if (event) {
      setIsVideoLoaded(true);
    }
  };

  const handleVideoLoadError = (event) => {
    setIsVideoLoaded(false);
  };

  const handleCaptionChange = (event) => {
    const caption = event.target.value;
    setCurrCaption(caption);
  };

  const handleStartTimeChange = (event) => {
    const startTime = event.target.value;
    setStartTime(startTime);
  };

  const handleEndTimeChange = (event) => {
    const endTime = event.target.value;
    setEndTime(endTime);
  };

  const addCaption = () => {
    const captionId = Date.now();
    const start = parseInt(startTime);
    const end = parseInt(endTime);
    if (captionId && start && end) {
      setCaptionsList((oldCaptionsList) => {
        const newCaptionsList = [...oldCaptionsList];
        newCaptionsList.push({ captionId, currCaption, start, end });
        setStartTime("");
        setEndTime("");
        setCurrCaption("");
        return newCaptionsList;
      });
    }
  };

  const displayCaption = (e) => {
    const currentTime = e.target.currentTime;
    const activeCaptionData = captionsList.find((captionData) => {
      if (currentTime >= parseInt(captionData.start) && currentTime <= parseInt(captionData.end)) {
        return captionData;
      }
      return null;
    });
    let caption = activeCaptionData ? activeCaptionData.currCaption : "";
    setCaptionToDisplay(caption);
  };

  const removeCaption = (captionId) => {
    const idx = captionsList.findIndex((captionData) => {
      return captionData.captionId === captionId;
    });
    if (idx > -1) {
      const newCaptionsList = [...captionsList];
      newCaptionsList.splice(idx, 1);
      setCaptionsList(newCaptionsList);
    }
  };

  return (
    <>
      <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-30 xl:mx-30 2xl:mx-[10rem] mt-10 mb-5">
        <div className="md:grid md:grid-flow-col md:grid-cols-5 md:gap-4">
          <InputField
            value={videoUrlInput}
            label="Video URL"
            type="text"
            placeholder="Enter video URL ..."
            onChange={handleUrlChange}
            containerClasses="md:col-span-4"
          />
          <Button
            btnText="Load Video"
            btnClasses="mt-2 w-full md:self-end md:mt-0"
            onBtnClick={onLoadVideoFormUrl}
            disabled={videoUrlInput ? false : true}
          />
        </div>
        {videoUrl && (
          <div className="lg:flex mt-10">
            <video
              onError={handleVideoLoadError}
              onLoadedData={onVideoDataLoaded}
              onTimeUpdate={displayCaption}
              src={videoUrl}
              controls
              className={`w-full lg:mr-10 lg:w-[35rem] xl:w-[45rem] self-center ` + (!isVideoLoaded ? "hidden" : "block")}
            ></video>
            {isVideoLoaded && (
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
                <div className="mt-3 grid grid-flow-col gap-5 grid-cols-2">
                  <InputField
                    inputType="input"
                    value={startTime}
                    label="Start Time"
                    type="number"
                    name="startTime"
                    placeholder="Start time (in sec)"
                    onChange={handleStartTimeChange}
                    min={0}
                    max={endTime}
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
                    max={999999999999999}
                  />
                </div>
                {(startTime || endTime) && (isNaN(parseInt(startTime)) || isNaN(parseInt(endTime)) || parseInt(startTime) > parseInt(endTime)) && (
                  <p className="mt-2 text-red-400 text-lg font-medium">Invlid timestamps!!!</p>
                )}
                <Button
                  classes="block"
                  btnText="Add Caption"
                  btnClasses="mt-5 w-full"
                  onBtnClick={addCaption}
                  disabled={
                    startTime &&
                    endTime &&
                    currCaption &&
                    !isNaN(parseInt(startTime)) &&
                    !isNaN(parseInt(endTime)) &&
                    parseInt(startTime) <= parseInt(endTime)
                      ? false
                      : true
                  }
                />
              </div>
            )}
          </div>
        )}
        {videoUrl && isVideoLoaded && captionToDisplay && (
          <div className="bg-[#3E5879] text-[rgba(216,196,182,1)] font-semibold whitespace-pre-wrap mt-2 px-5 py-3 rounded w-full lg:mr-10 lg:w-[35rem] xl:w-[45rem]">
            {captionToDisplay}
          </div>
        )}
        {videoUrl && !isVideoLoaded && <div className="mt-24 text-center text-4xl font-bold text-[#3E5879]">Invalid Video URL !!!</div>}
      </div>
      {videoUrl && captionsList.length > 0 && (
        <div className="mx-5 sm:mx-10 md:mx-20 lg:mx-30 xl:mx-30 2xl:mx-[10rem] mt-10 mb-10">
          <h1 className="text-2xl font-semibold mb-3">Added Captions</h1>
          {captionsList.map((captionData) => {
            return (
              <div key={captionData.captionId} className="bg-[rgba(216,196,182,0.3)] rounded-md grid mt-2 px-5 py-2">
                <div className="flex justify-between w-full">
                  <div className="flex text-stone-500 text-md font-semibold self-center">
                    <p className="mr-8">From:&nbsp; {captionData.start} sec</p>
                    <p className="">To:&nbsp; {captionData.end} sec</p>
                  </div>
                  <div className="text-red-500 text-xl self-center cursor-pointer" onClick={() => removeCaption(captionData.captionId)}>
                    &#x274c;
                  </div>
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
