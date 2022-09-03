import { Dispatch, SetStateAction } from "react";

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