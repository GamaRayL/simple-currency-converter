import { useEffect, useState } from 'react';
import { IConvertResult, ICurrency } from 'types';
import { getCurrency, getConvertedCurrency } from 'utils/api';
import { Converter } from 'components/Converter';
import { Dispatch, SetStateAction } from "react";
import { Title } from 'components/Title';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';

const CustomApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 140px;
  padding: 20px;
`;

const GlobalStyles = css`
  body {
    background: #1c92d2;
    background: -webkit-linear-gradient(to right, #f2fcfe, #1c92d2);
    background: linear-gradient(to right, #f2fcfe, #1c92d2);
  }
`;


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
    <CustomApp>
      <Global styles={GlobalStyles} />
      <Title />
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
    </CustomApp>
  );
}

export default App;;
