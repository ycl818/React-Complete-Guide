import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import BuildIcon from "@mui/icons-material/Build";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [highlight, setHighlight] = useState("General");
  const listArray = [
    {
      name: "General",
      icon: <BuildIcon />,
      link: "general",
    },
    {
      name: "Variables",
      icon: <HiveIcon />,
      link: "variables",
    },
  ];
  return (
    <Box bgcolor="#111217" className="fullHeightBox" p={2}>
      <List>
        {listArray.map((listElement) => (
          <ListItem
            key={listElement.name}
            sx={{
              borderLeft:
                highlight === listElement.name ? "2px solid #F05A28" : "",
            }}
          >
            <ListItemButton
              component={Link}
              to={listElement.link}
              onClick={() => {
                setHighlight(`${listElement.name}`);
              }}
            >
              <ListItemIcon
                sx={{ color: highlight === listElement.name ? "#59dbf2" : "" }}
              >
                {listElement.icon}
              </ListItemIcon>
              <ListItemText
                primary={listElement.name}
                sx={{
                  color: highlight === listElement.name ? "#59dbf2" : "white",
                }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
