import { useContext } from "react";

import { useSpring, animated as a } from "react-spring";

import { WolfpackContext } from "../js/contexts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileAvatar = () => {
  const { profile } = useContext(WolfpackContext);

  const [profileSpring, setProfileSpring] = useSpring(() => ({
    config: {
      friction: 15,
    },
    scale: 1,
  }));

  console.log(profile);
  return (
    <div className="absolute right-0 p-3 m-5 text-zinc-300 bg-zinc-700 rounded-full">
      <a.div
        className="relative w-16 h-16 rounded-2xl"
        onMouseEnter={() => setProfileSpring({ scale: 1.1 })}
        onMouseLeave={() => setProfileSpring({ scale: 1 })}
        style={
          profile.url === ""
            ? { backgroundColor: "rgb(32,32,36)", ...profileSpring }
            : { backgroundImage: profile.url, ...profileSpring }
        }>
        {profile.url === "" && (
          <div className="relative text-3xl text-center justify-center h-full w-full grid items-center content-center">
            <FontAwesomeIcon icon={"user"} />
          </div>
        )}
      </a.div>
    </div>
  );
};

export default ProfileAvatar;
