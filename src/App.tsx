import React, { useEffect, useState } from 'react';
import { IConvertResult } from 'types';
import { Converter } from 'components/Converter';
import { Typography } from '@mui/material';
import css from "./App.module.css";

function App() {
  const [apiError, setApiError] = useState<number>();
  const [currencyData, setCurrencyData] = useState<IConvertResult>();
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [currencyNameTo, setCurrencyNameTo] = useState<string>("");

  useEffect(() => {
    async function getCurrencyBasedLang() {
      const browserLang = window.navigator.language.substring(0, 2);

      const api = `https://restcountries.com/v3.1/alpha/${browserLang}`;
      try {
        const response = await fetch(api);
        const data = await response.json();
        const currency = Object.getOwnPropertyNames(data[0].currencies);
        const currencyCode = currency[0];
        const currencyName = data[0].currencies[currencyCode].name;
        setCurrencyNameTo(currencyName);
        setTo(currencyCode.toLocaleLowerCase());
      } catch (error) {
        console.log(error);
      }
    }
    getCurrencyBasedLang();
  }, []);

  useEffect(() => {
    if (!to) return;
    async function getCurrencyData() {
      const api = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`;
      try {
        const response = await fetch(api);
        if (response.status >= 400 && response.status <= 599) {
          setApiError(response.status);
        } else {
          const data = await response.json();
          setCurrencyData(data[to]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCurrencyData();
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
