import { useEffect, useState } from 'react';
import { IConvertResult, ICurrency } from 'types';
import { getCurrency, getConvertedCurrency } from 'service';
import { Converter } from 'components/Converter';
import { Typography } from '@mui/material';
import css from "./App.module.css";
import { Dispatch, SetStateAction } from "react";

function App() {
  const [apiError, setApiError] = useState<number>();
  const [currencyData, setCurrencyData] = useState<IConvertResult>(); // currencyValue setCurrencyValue
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [currencyNameTo, setCurrencyNameTo] = useState<string>("");

  useEffect(() => {
    getCurrency(setApiError as Dispatch<SetStateAction<number>>)
      .then((currency: ICurrency) => {
        setCurrencyNameTo(Object.values(currency)[0].name);
        setTo(Object.keys(currency)[0].toLocaleLowerCase());
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!to) return;
    getConvertedCurrency(from, to, setApiError as Dispatch<SetStateAction<number>>)
      .then(data => setCurrencyData(data[to]))
      .catch(error => console.log(error));
  }, [from, to]);

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
        to={to}
        from={from}
        amount={amount}
        apiError={apiError}
        setTo={setTo}
        setFrom={setFrom}
        setAmount={setAmount}
        currencyData={currencyData}
        currencyNameTo={currencyNameTo}
        setCurrencyNameTo={setCurrencyNameTo}
      />
    </div>
  );
}

export default App;;
