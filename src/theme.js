import { createTheme } from "@mui/material";

const drawerWidth = 220;
const theme = createTheme((theme) => ({
  root: {
    display: "flex",
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },

  hide: {
    display: "none",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default theme;
