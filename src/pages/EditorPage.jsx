import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initiSocket } from "../socket";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditorPage = ({ userName }) => {
  const [clients, setClients] = useState([]);
  const socketRef = useRef();
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      socketRef.current = await initiSocket();

      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later");
      }

      socketRef.current.emit("join", {
        userName: location.state?.userName,
        roomId,
      });

      socketRef.current.on("joined", ({ clients, userName, socketId }) => {
        if (userName != location.state?.userName) {
          toast.success(`${userName} JOined the room`);
        }
        console.log({ clients, userName, socketId });
        setClients(clients);
      });

      //Listen for disconnected
      socketRef.current.on("disconnected", ({ socketId, userName }) => {
        toast.success(`${userName} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId != socketId);
        });
      });
    }
    init();
    //cleaning function
    return () => {
      //clear memory
      //unsubscribe socker
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo-container">
            <div className="logo">
              <img src="/code.png" alt="" width={40} />
              <h1 className="logoText">CodeSync</h1>
            </div>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients?.map((client) => (
              <Client key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>

        <button className="btn copyBtn">Copy Room Id</button>
        <button
          className="btn leaveBtn"
          onClick={() => {
            navigate("/");
          }}
        >
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
