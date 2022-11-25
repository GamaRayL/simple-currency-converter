import { FC } from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const CustomTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
  font-size: 28px;
  color: #c2fff6;
`;

export const Title: FC = () => {
  return (
    <CustomTypography variant="overline">
      Converter
    </CustomTypography>
  );
};