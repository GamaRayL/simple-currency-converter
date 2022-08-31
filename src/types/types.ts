import { Dispatch, SetStateAction } from "react";

export interface IConvertResult {
    date: string,
    info: {
        rate: number;
        timestamp: number;
    };
    query: {
        amount: number;
        from: string;
        to: string;
    };
    result: number;
    success: boolean;
}


export interface IState {
    to: string;
    from: string;
    amount: number;
    setTo: Dispatch<SetStateAction<string>>;
    setFrom: Dispatch<SetStateAction<string>>;
    setAmount: Dispatch<SetStateAction<number>>;
}