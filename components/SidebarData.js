import React from 'react'
import SportsEsportsSharpIcon from '@mui/icons-material/SportsEsportsSharp';
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ThreePSharpIcon from '@mui/icons-material/ThreePSharp';

export const SidebarData=[
    {
        title:"Home",
        icon: <HomeSharpIcon/>,
        path:"/",
    },
    {
        title:"ゲーム",
        icon: <SportsEsportsSharpIcon/>,
        path:"/game",
    },
    {
        title:"ランキング",
        icon: <EmojiEventsSharpIcon/>,
        path:"/rank",
    },
    {
        title:"About",
        icon: <ThreePSharpIcon/>,
        path:"/about",        
    },
    {
        title:"デバッグ",
        icon: <ThreePSharpIcon/>,
        path:"/debug",
    }
]