import React from "react";
import SportsEsportsSharpIcon from "@mui/icons-material/SportsEsportsSharp";
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ThreePSharpIcon from "@mui/icons-material/ThreePSharp";
import AdbIcon from "@mui/icons-material/Adb";
import AddCardIcon from "@mui/icons-material/AddCard";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeSharpIcon />,
    path: "/",
  },
  {
    title: "ゲーム",
    icon: <SportsEsportsSharpIcon />,
    path: "/game",
  },
  {
    title: "ランキング",
    icon: <EmojiEventsSharpIcon />,
    path: "/rank",
  },
  {
    title: "About",
    icon: <ThreePSharpIcon />,
    path: "/about",
  },
  {
    title: "デバッグ",
    icon: <AdbIcon />,
    path: "/debug",
  },
  {
    title: "お題",
    icon: <AddCardIcon />,
    path: "/odai",
  },
];
