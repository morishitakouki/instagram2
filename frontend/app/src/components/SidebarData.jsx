import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CreateIcon from '@mui/icons-material/Create';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

export const SidebarData = [
  {
    title: "ホーム",
    icon: <HomeIcon/>,
    link: "/home",
  },
  
  {
    title: "myブログ一覧",
    icon: <ImportContactsIcon/>,
    link: "/index",
  },
  
  {
    title: "ブログ作成",
    icon: <CreateIcon/>,
    link: "/create",
  },
 
  {
    title: "ブックマーク",
    icon: <TurnedInIcon/>,
    link: "/bookmarks",
  }
]
 
  