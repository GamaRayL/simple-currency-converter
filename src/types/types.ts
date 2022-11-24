import { Dispatch, SetStateAction } from "react";

export interface ICurrency {
  name: string;
  symbol: string;
}

export interface IConvertResult {
  [key: number]: number,
}

export interface IState {
  to: string;
  from: string;
  amount: number;
  currencyNameTo: string;
  setTo: Dispatch<SetStateAction<string>>;
  setFrom: Dispatch<SetStateAction<string>>;
  setAmount: Dispatch<SetStateAction<number>>;
  setCurrencyNameTo: Dispatch<SetStateAction<string>>;
}

// Props

export interface ConverterProps extends IState {
  apiError?: number;
  currencyData: IConvertResult | undefined;
}

export interface CurrencyAutocompleteProps {
  value: string;
  label: string;
  onChange: (e: React.SyntheticEvent, value: string[] | null) => void;
}
