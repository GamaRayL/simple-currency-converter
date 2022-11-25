import { useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { ConverterProps } from "types";
import { CurrencyAutocomplete } from "components/CurrencyAutocomplete";
import getSymbolFromCurrency from "currency-symbol-map";
import { Container, Stack, Typography, TextField } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import css from "./Converter.module.css";

export const Converter = (props: ConverterProps) => {
  const { apiError, setToInput, setFromInput, setAmount, toInput, fromInput, amount, сurrencyValue, currencyFullNameTo, setCurrencyFullNameTo } = props;
  const [fromCurrencyName, setFromCurrencyName] = useState<string>("United States Dollar");
  const resultOfAmount = new Intl.NumberFormat("ru-RU").format(Number(сurrencyValue) * amount);

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

  const showElementIfValuesEnter = () => {
    if (fromInput && fromInput) {
      return (<Stack>
        <Typography sx={{ color: "#5c667b" }}>
          {new Intl.NumberFormat("ru-RU").format(amount) + " " + fromCurrencyName + " = "}
        </Typography>
        <Typography sx={{ color: "#2e3c57", fontSize: 30 }}>
          {resultOfAmount + " " + currencyFullNameTo}
        </Typography>
      </Stack>);
    } else {
      return (<svg className={css.loader} viewBox="25 25 50 50">
        <circle className={css.itemOfLoader} r="20" cy="50" cx="50"></circle>
      </svg>);
    }
  };

  return (
    <div className={css.converter}>
      {apiError ?
        <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography sx={{ fontSize: 44, color: "#FFFFFF" }}
            variant="overline"
            component="h2">Error {apiError}</Typography>
          <img className={css.imageError} src="/undraw_server_down.svg" alt="" />
        </Container>
        :
        <Container maxWidth="md" sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          p: 4,
          gap: 4,
          borderRadius: "8px",
          boxShadow: "#2337504d 0px 6px 12px",
        }}>
          <Stack
            sx={{
              display: "flex",
              alignItems: {
                sm: "center",
                xs: "baseline",
              },
              gap: 1,
              flexDirection: {
                sm: "row",
                xs: "column",
              }
            }}
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
            <CurrencyAutocomplete
              value={fromInput}
              onChange={onChangeFromHandler}
              label="Конвертировать из"
            />
            <SwapHoriz sx={{
              cursor: "pointer",
              transition: "0.2s ease-in-out",
              color: "#97a2a0",
              alignSelf: {
                xs: "center",
              },
              "&:hover": { color: "#00c7e0" }
            }}
              fontSize="large"
              onClick={() => onSubmitSwapHandler()} />
            <CurrencyAutocomplete
              value={toInput ? toInput : "AED"}
              onChange={onChangeToHandler}
              label="Конвертировать в"
            />
          </Stack>
          {showElementIfValuesEnter()}
        </Container>}
    </div>
  );
};
