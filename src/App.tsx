import { useEffect, useState } from 'react';
import { IConvertResult, ICurrency } from 'types';
import { getCurrency, getConvertedCurrency } from 'service';
import { Converter } from 'components/Converter';
import { Typography } from '@mui/material';
import css from "./App.module.css";
import { Dispatch, SetStateAction } from "react";

function App() {
  const [apiError, setApiError] = useState<number>();
  const [currencyValue, setCurrencyValue] = useState<IConvertResult>();
  const [fromInput, setFromInput] = useState<string>("usd");
  const [toInput, setToInput] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [currencyFullNameTo, setCurrencyFullNameTo] = useState<string>("");

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
    getConvertedCurrency(fromInput, toInput, setApiError as Dispatch<SetStateAction<number>>)
      .then(data => setCurrencyValue(data[toInput]))
      .catch(error => console.log(error));
  }, [fromInput, toInput]);

  return (
    <div className={css.app}>
      <Typography sx={{
        display: "flex",
        justifyContent: "center",
        pb: 4,
        fontSize: 28,
        color: "#c2fff6"
      }} variant="overline" component="h1">Converter</Typography>
      <Converter
        toInput={toInput}
        fromInput={fromInput}
        amount={amount}
        apiError={apiError}
        setToInput={setToInput}
        setFromInput={setFromInput}
        setAmount={setAmount}
        сurrencyValue={currencyValue}
        currencyFullNameTo={currencyFullNameTo}
        setCurrencyFullNameTo={setCurrencyFullNameTo}
      />
    </div>
  );
}

export default App;;
