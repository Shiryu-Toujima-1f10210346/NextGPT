import React from "react";
import SportsEsportsSharpIcon from "@mui/icons-material/SportsEsportsSharp";
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ThreePSharpIcon from "@mui/icons-material/ThreePSharp";
import AdbIcon from "@mui/icons-material/Adb";
import AddCardIcon from "@mui/icons-material/AddCard";

export const SidebarData = [
  // {
  //   id: "home",
  //   title: "ホーム",
  //   icon: <HomeSharpIcon />,
  //   selected: <HomeSharpIcon style={{ color: "white" }} />,
  //   path: "/",
  // },
  {
    id: "resultList",
    title: "対戦履歴",
    icon: <HomeSharpIcon style={{ color: "white" }} />,
    selected: <HomeSharpIcon />,
    path: "/resultList",
  },
  {
    id: "rank",
    title: "ランキング",
    icon: <EmojiEventsSharpIcon style={{ color: "white" }} />,
    selected: <EmojiEventsSharpIcon />,
    path: "/rank",
  },
  {
    id: "game",
    title: "ゲーム",
    icon: <SportsEsportsSharpIcon style={{ color: "white" }} />,
    selected: <SportsEsportsSharpIcon />,
    path: "/game",
  },
  {
    id: "info",
    title: "インフォ",
    icon: <AdbIcon style={{ color: "white" }} />,
    selected: <AdbIcon />,
    path: "/info",
  },
  {
    id: "odai",
    title: "お題",
    icon: <AddCardIcon style={{ color: "white" }} />,
    selected: <AddCardIcon />,
    path: "/odai",
  },
];
