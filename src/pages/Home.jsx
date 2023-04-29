import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleInputEnter = (e) => {
    if (e.code == "Enter") {
      joinRoom();
    }
  };
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("New Room id generated");
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("room Id and user Name is required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <div className="logo-container">
          <div className="logo">
            <img src="/code.png" width={50} />
            <h1>Code Sync</h1>
          </div>
          {/* <p>Real Time Collaboration</p> */}
        </div>

        <p>Paste invitation Room Id</p>

        <div className="inputGroup">
          <input
            type="text"
            className="inputbox"
            placeholder="RoomID"
            onKeyUp={handleInputEnter}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            className="inputbox"
            placeholder="UserName"
            onKeyUp={handleInputEnter}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={joinRoom} className="btn joinBtn">
            Join
          </button>

          <span className="createInfo">
            If you dont have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
