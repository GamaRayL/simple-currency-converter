import { Dispatch, SetStateAction } from "react";

export interface ICurrency {
  name: string;
  symbol: string;
}

export interface IConvertResult {
  [key: number]: number,
}
export interface IBase {
  toInput: string;
  fromInput: string;
  amount: number;
  currencyFullNameTo: string;
}

export interface IState extends IBase {
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

export interface InputAutocompleteProps {
  value: string;
  label: string;
  onChange: (e: React.SyntheticEvent, value: string[] | null) => void;
}

export interface ResultProps extends IBase {
  fromCurrencyName: string;
  сurrencyValue: IConvertResult | undefined;
}