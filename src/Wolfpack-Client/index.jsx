import Load from "./Load";

import { WolfpackContext } from "../js/contexts";

import { useState, useEffect } from "react";

import Popup from "./Popup";
import Menu from "./Menu";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import WolfpackLogo from "./WolfpackLogo";

import { openExternal } from "../js/util";

const WolfpackClient = () => {
  const [popUp, setPopUp] = useState({
    message: "",
    visible: false,
    type: "info",
    options: [{}],
  });

  const [devMode, setDevMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    avatar: "",
    email: "",
    id: "",
    url: "",
    online: false,
  });

  const [appInfo, setAppInfo] = useState({
    name: "",
    versions: {
      project: "",
      node: "",
      chromium: "",
      electron: "",
    },
    devMode: devMode,
    url: "",
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    console.log(window.wolfpack.ipc.ping());
    window.wolfpack.ipc.invoke("app-info").then((info) => {
      setAppInfo(info);
      setDevMode(info.devMode);
    });
  }, []);

  useEffect(() => {}, []);

  console.log(appInfo);

  const [dragSize, setDragSize] = useState({
    width: window.innerWidth - 100,
  });

  useEffect(() => {
    const onResize = (e) => {
      setDragSize({ width: e.target.innerWidth - 100 });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <WolfpackContext.Provider
        value={{
          popUp,
          setPopUp,
          loaded,
          setLoaded,
          appInfo,
          profile,
          setSettingsOpen,
          settingsOpen: settingsOpen,
        }}>
        <div className="bg-zinc-700 text-zinc-300 w-full h-6 rounded-t-lg top-0 relative z-10">
          <div className="absolute left-2 -top-[0.35rem]">
            <button
              onClick={() => openExternal(appInfo.url, { setPopUp })}
              className="w-4 inline top-2 relative mx-1 select-all">
              <WolfpackLogo />
            </button>
            <span className="mx-4">
              [ {appInfo.name} {appInfo.versions.project} ]{" "}
              {appInfo.devMode &&
                `[ Running in dev mode on port ${appInfo.port} ]`}{" "}
            </span>
          </div>
          <div
            style={{ width: dragSize.width }}
            className="bg-zinc-800 h-full absolute m-auto left-0 draggable right-6 -z-10"></div>
          <div className="absolute right-0">
            <button
              onClick={() => window.wolfpack.ipc.send("request-minimize")}>
              <FontAwesomeIcon icon="window-minimize" />
            </button>
            <button
              onClick={() => window.wolfpack.ipc.send("close")}
              className="mx-4">
              <FontAwesomeIcon icon="xmark" />
            </button>
          </div>
        </div>
        <div className="text-zinc-300 fixed w-screen h-screen bg-zinc-900">
          <div
            style={{ visibility: popUp.visible ? "visible" : "hidden" }}
            className="fixed w-screen h-screen z-[9999] bg-neutral-900/50 backdrop-blur-lg">
            <Popup />
          </div>
          <Load />
          <Settings />
          <Menu />
        </div>
      </WolfpackContext.Provider>
    </>
  );
};

export default WolfpackClient;
