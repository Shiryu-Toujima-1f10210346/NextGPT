import React from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import ThreePIcon from "@mui/icons-material/ThreeP";
import AdbIcon from "@mui/icons-material/Adb";
import AddCardIcon from "@mui/icons-material/AddCard";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";

export const SidebarData = [
  // {
  //   id: "home",
  //   title: "ホーム",
  //   icon: <HomeIcon />,
  //   selected: <HomeIcon style={{ color: "white" }} />,
  //   path: "/",
  // },
  {
    id: "resultList",
    title: "対戦履歴",
    icon: <HistoryIcon style={{ color: "white" }} />,
    selected: <HistoryIcon />,
    path: "/resultList",
  },
  {
    id: "rank",
    title: "ランキング",
    icon: <EmojiEventsIcon style={{ color: "white" }} />,
    selected: <EmojiEventsIcon />,
    path: "/rank",
  },
  {
    id: "game",
    title: "ゲーム",
    icon: <SportsEsportsIcon style={{ color: "white" }} />,
    selected: <SportsEsportsIcon />,
    path: "/game",
  },
  {
    id: "odai",
    title: "お題",
    icon: <AddCardIcon style={{ color: "white" }} />,
    selected: <AddCardIcon />,
    path: "/odai",
  },
  {
    id: "info",
    title: "インフォ",
    icon: <InfoIcon style={{ color: "white" }} />,
    selected: <InfoIcon />,
    path: "/info",
  },
];
