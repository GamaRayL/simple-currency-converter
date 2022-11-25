import { FC } from "react";
import { ResultProps } from "types";
import { Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";

const Loader = styled.svg`
  width: 3.25em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;

  @keyframes rotate4 {
    100% {
     transform: rotate(360deg);
    }
  }
`;

const LoaderCircle = styled.circle`
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;

  @keyframes dash4 {
    0% {
     stroke-dasharray: 1, 200;
     stroke-dashoffset: 0;
    }

    50% {
     stroke-dasharray: 90, 200;
     stroke-dashoffset: -35px;
    }

    100% {
     stroke-dashoffset: -125px;
    }
  }
`;

export const Result: FC<ResultProps> = (props) => {
  const { toInput, fromInput, amount, fromCurrencyName, сurrencyValue, currencyFullNameTo } = props;
  const resultOfAmount = new Intl.NumberFormat("ru-RU").format(Number(сurrencyValue) * amount);

  return (
    <>
      {
        toInput && fromInput && amount
          ?
          <Stack>
            <Typography sx={{ color: "#5c667b" }}>
              {new Intl.NumberFormat("ru-RU").format(amount) + " " + fromCurrencyName + " = "}
            </Typography>
            <Typography sx={{ color: "#2e3c57", fontSize: 30 }}>
              {resultOfAmount + " " + currencyFullNameTo}
            </Typography>
          </Stack>
          :
          <Loader viewBox="25 25 50 50">
            <LoaderCircle r="20" cy="50" cx="50" />
          </Loader>
      }
    </>
  );
};