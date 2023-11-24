import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

const LandingPage = () => {
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log("All chat :", chat);
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementsByName("input-form")[0].reset();
    const data = {
      prompt: inputText,
    };

    try {
      const chats = { messageType: "message", value: inputText };
      setChat((prevData) => [...prevData, chats]);
      const response = await axios.post("http://localhost:3000/message", data);
      const resData = { messageType: "response", value: response.data.result };
      setChat((prevData) => [...prevData, resData]);
      setInputText("");
      // console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
    // console.log("all chat :",chat)
  };

  return (
    <div
      class="d-flex align-items-center justify-content-center"
      style={{ marginTop: "6rem" }}
    >
      <div class="card" style={{ width: "38rem" }}>
        <div class="card-header">AI - ChatBot</div>

        <div className="chatbox" style={{ height: "25rem", overflowY: "auto" , backgroundColor:"#fbf6d5"}}>
          {chat.map((element) => {
            if (element.messageType === "message") {
              return (
                <div className="chatbox-body d-flex justify-content-end">
                  <div
                    className="px-2 py-1 "
                    style={{
                      backgroundColor: "#d5dafb",
                      borderRadius: "6px",
                      width: "fit-content",
                      margin: "1rem",
                    }}
                  >
                    {element.value}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="chatbox-body d-flex justify-content-start">
                  <div
                    className="px-2 py-1 "
                    style={{
                      backgroundColor: "#d2f8d2",
                      borderRadius: "6px",
                      width: "fit-content",
                      margin: "1rem",
                    }}
                  >
                    {element.value}
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div class="card-footer p-1">
          <form name="input-form">
          <div class="input-group my-3 mx-1" style={{ width: "37rem" }}>
            <input
              type="text"
              class="form-control "
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              placeholder="Enter text here..."
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
