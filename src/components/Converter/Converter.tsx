import { FC, useState, useEffect } from "react";
import { Container, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { getConvertedCurrency, getCurrency } from "utils/api";
import { IConvertResult, ICurrency } from "types";
import { SwapHoriz } from "@mui/icons-material";
import { InputAutocomplete } from "components/InputAutocomplete";
import { Crash } from "components/Crash";
import { Result } from "components/Result";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";
import styled from "@emotion/styled";

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

export const Converter: FC = () => {
  // UseState`s

  const [fromCurrencyName, setFromCurrencyName] = useState<string>("United States Dollar");
  const [apiError, setApiError] = useState<number>();
  const [currencyValue, setCurrencyValue] = useState<IConvertResult>();
  const [fromInput, setFromInput] = useState<string>("usd");
  const [toInput, setToInput] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [currencyFullNameTo, setCurrencyFullNameTo] = useState<string>("");

  // UseEffects`s

  useEffect(() => {
    getCurrency(setApiError as Dispatch<SetStateAction<number>>)
      .then((currency: ICurrency) => {
        setCurrencyFullNameTo(Object.values(currency)[0].name);
        setToInput(Object.keys(currency)[0].toLocaleLowerCase());
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!toInput) return;
    getConvertedCurrency(fromInput, setApiError as Dispatch<SetStateAction<number>>)
      .then(data => setCurrencyValue(data.fromInput.toInput))
      .catch(error => console.log(error));
  }, [fromInput, toInput]);

// Handler functions

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
            сurrencyValue={currencyValue}
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
