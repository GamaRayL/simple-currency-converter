import { Dispatch, SetStateAction } from "react";

export interface ICurrency {
  name: string;
  symbol: string;
}

export interface IConvertResult {
  [key: number]: number,
}

export interface IState {
  toInput: string;
  fromInput: string;
  amount: number;
  currencyFullNameTo: string;
  setToInput: Dispatch<SetStateAction<string>>;
  setFromInput: Dispatch<SetStateAction<string>>;
  setAmount: Dispatch<SetStateAction<number>>;
  setCurrencyFullNameTo: Dispatch<SetStateAction<string>>;
}

export interface IApi {
  setApiError?: Dispatch<SetStateAction<number>>;
}

// Props

export interface ConverterProps extends IState {
  apiError?: number;
  сurrencyValue: IConvertResult | undefined;
}

export interface CurrencyAutocompleteProps {
  value: string;
  label: string;
  onChange: (e: React.SyntheticEvent, value: string[] | null) => void;
}
