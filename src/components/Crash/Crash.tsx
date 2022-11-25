import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { FC } from "react";

const CustomContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CustomTypography = styled(Typography)`
  font-size: 44px;
  color: #FFFFFF;
`;

const CustomImage = styled.img`
  width: 100%;
`;

interface CrashProps {
  apiError: number;
}

export const Crash: FC<CrashProps> = ({ apiError }) => {
  return (
    <CustomContainer>
      <CustomTypography
        variant="overline"
      >
        Error {apiError}
      </CustomTypography>
      <CustomImage src="/serverDown.svg" alt="Изображение 'Сервер упал'" />
    </CustomContainer>
  );
};