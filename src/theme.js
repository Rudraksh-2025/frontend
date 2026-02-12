import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#111111",
        },
        secondary: {
            main: "#e91e63",
        },
        background: {
            default: "#f5f5f5",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        h4: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export default theme;
