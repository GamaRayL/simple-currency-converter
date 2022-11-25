import { Dispatch, SetStateAction } from "react";

export const getCurrency = async (setApiError?: Dispatch<SetStateAction<number>>) => {
  const browserLang = window.navigator.language.substring(0, 2);
  const api = `https://restcountries.com/v3.1/alpha/${browserLang}`;
  const response = await fetch(api);
  if (!response.ok) {
    setApiError!(response.status);
  }
  const data = await response.json();
  return data[0].currencies;
};

export const getConvertedCurrency = async (fromInput: string, toInput: string, setApiError?: Dispatch<SetStateAction<number>>) => {
  const api = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromInput}/${toInput}.json`;
  const response = await fetch(api);
  if (!response.ok) {
    setApiError!(response.status);
  }
  return await response.json();
};