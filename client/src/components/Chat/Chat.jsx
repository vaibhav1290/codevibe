import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import Box from "@mui/material/Box";
import SidenavAppBar from "../SidenavAppbar";

import { CometChat } from "@cometchat-pro/chat";
import { CometChatUI } from "./CometChatWorkspace/src";

const COMETCHAT_CONSTANTS = {
  APP_ID: "249268f742d08b51",
  REGION: "in",
  AUTH_KEY: "c692f05dee0ed712e29220a1e305af57a48eab1c",
};

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .autoEstablishSocketConnection(true)
  .build();

CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  (error) => {
    console.log("Initialization failed with an error : ", error);
  }
);

function Chat() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
      setUid(user?.uid);
      setAvatar(user?.photoURL);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  let ChatUser = new CometChat.User(uid);
  ChatUser.setName(name);
  ChatUser.setAvatar(avatar);
  CometChat.createUser(ChatUser, COMETCHAT_CONSTANTS.AUTH_KEY).then(
    (ChatUser) => {
      console.log("User created successfully : ", { ChatUser });
    },
    (error) => {
      console.log("Error creating user : ", { error });
    }
  );

  CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY).then(
    (user) => {
      console.log("Login Successful:", { user });
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );

  return (
    <Box sx={{ display: "flex" }}>
      <SidenavAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 7, margin: 1, height: 650 }}>
        <CometChatUI />
      </Box>
    </Box>
  );
}

export default Chat;
