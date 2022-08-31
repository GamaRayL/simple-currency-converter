import React, { useEffect, useState } from 'react';
import { IConvertResult } from 'types';
import { Typography } from '@mui/material';
import { Converter } from 'components/Converter';
import css from "./App.module.css";


function App() {
  const [apiError, setApiError] = useState<number>();
  const [currencyData, setCurrencyData] = useState<IConvertResult | undefined>();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(1);
  const [fullCurrencyName, setFullCurrencyName] = useState<string>("");

  useEffect(() => {
    async function getCurrencyBasedLang() {
      const browserLang = window.navigator.language;
      const api = `https://restcountries.com/v3.1/alpha/${browserLang}`;

      try {
        const response = await fetch(api);
        const data = await response.json();
        const currency = Object.getOwnPropertyNames(data[0].currencies);
        const currencyCode = currency[0];
        const currencyName = data[0].currencies[currencyCode].name;
        setFullCurrencyName(currencyName);
        setFrom(currencyCode);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrencyBasedLang();
  }, []);

  useEffect(() => {
    async function getCurrencyData() {
      const api = `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`;

      const myHeaders = new Headers();
      myHeaders.append("apikey", "TBizbaaEyUT9pyoSJNd4DnsVz8BAsBkq");

      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders
      };

      try {
        const response = await fetch(api, requestOptions);
        if (response.status >= 400 && response.status <= 599) {
          setApiError(response.status);
        } else {
          const data = await response.json();
          setCurrencyData(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCurrencyData();
  }, [amount, from, to]);


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
        fullCurrencyName={fullCurrencyName}
      />
    </div>
  );
}

export default App;
