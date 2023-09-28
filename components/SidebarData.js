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
    icon: <HomeSharpIcon />,
    selected: <HomeSharpIcon style={{ color: "white" }} />,
    path: "/resultList",
  },
  {
    id: "rank",
    title: "ランキング",
    icon: <EmojiEventsSharpIcon />,
    selected: <EmojiEventsSharpIcon style={{ color: "white" }} />,
    path: "/rank",
  },
  {
    id: "game",
    title: "ゲーム",
    icon: <SportsEsportsSharpIcon />,
    selected: <SportsEsportsSharpIcon style={{ color: "white" }} />,
    path: "/game",
  },
  {
    id: "info",
    title: "インフォ",
    icon: <AdbIcon />,
    selected: <AdbIcon style={{ color: "white" }} />,
    path: "/info",
  },
  {
    id: "odai",
    title: "お題",
    icon: <AddCardIcon />,
    selected: <AddCardIcon style={{ color: "white" }} />,
    path: "/odai",
  },
];
