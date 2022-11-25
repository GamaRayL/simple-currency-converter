import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { ConverterProps } from "types";
import getSymbolFromCurrency from "currency-symbol-map";
import { Container, Stack, TextField } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import { Crash } from "components/Crash";
import styled from "@emotion/styled";
import { InputAutocomplete } from "components/InputAutocomplete";
import { Result } from "components/Result";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 6px 12px #2337504d;
`;

const StyledStack = styled(Stack)`
  display: flex;
  gap: 14px;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;

const StyledSwapHoriz = styled(SwapHoriz)`
  cursor: pointer;
  font-size: 32px;
  transition: 0.2s ease-in-out;
  color: #97a2a0;


  @media screen and (min-width: 600px) {
    align-self: center;
  }

  &:hover {
    color: #00c7e0;
  }
`;

export const Converter = (props: ConverterProps) => {
  const {
    apiError,
    setToInput,
    setFromInput,
    setAmount,
    toInput,
    fromInput,
    amount,
    сurrencyValue,
    currencyFullNameTo,
    setCurrencyFullNameTo } = props;
  const [fromCurrencyName, setFromCurrencyName] = useState<string>("United States Dollar");

  const onChangeFromHandler = (e: React.SyntheticEvent, value: string[] | null) => {
    if (value) {
      setFromCurrencyName(value[1]);
      setFromInput(value[0].toLocaleLowerCase());
    };
  };

  const onChangeToHandler = (e: React.SyntheticEvent, value: string[] | null) => {
    if (value) {
      setCurrencyFullNameTo(value[1]);
      setToInput(value[0].toLocaleLowerCase());
    }
  };

  const onChangeEnterHandler = (e: NumberFormatValues) => {
    setAmount(Number(e.floatValue));
  };

  const onSubmitSwapHandler = () => {
    setFromInput(toInput);
    setToInput(fromInput);
    setFromCurrencyName(currencyFullNameTo);
    setCurrencyFullNameTo(fromCurrencyName);
  };

  return (
    <>
      {apiError
        ? <Crash apiError={apiError} />
        : <StyledContainer maxWidth="md">
          <StyledStack
          >
            <NumberFormat
              sx={{ width: "100%" }}
              value={amount}
              type="text"
              label="Ввести сумму"
              customInput={TextField}
              thousandSeparator={true}
              prefix={getSymbolFromCurrency(`${fromInput}`)}
              onValueChange={onChangeEnterHandler}
            />
            <InputAutocomplete
              value={fromInput}
              onChange={onChangeFromHandler}
              label="Конвертировать из"
            />
            <StyledSwapHoriz
              onClick={() => onSubmitSwapHandler()}
            />
            <InputAutocomplete
              value={toInput ? toInput : "AED"}
              onChange={onChangeToHandler}
              label="Конвертировать в"
            />
          </StyledStack>
          <Result
            сurrencyValue={сurrencyValue}
            toInput={toInput}
            fromInput={fromInput}
            amount={amount}
            fromCurrencyName={fromCurrencyName}
            currencyFullNameTo={currencyFullNameTo}
          />
        </StyledContainer>}
    </>
  );
};
