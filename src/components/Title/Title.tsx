import { Typography } from "@mui/material";

export const Title = () => {
  return (
    <Typography
      variant="overline"
      component="h1"
      sx={{
        display: "flex",
        justifyContent: "center",
        pb: 4,
        fontSize: 28,
        color: "#c2fff6"
      }}>
      Converter
    </Typography>
  );
};