import { useState } from "react";
import { IConvertResult, IState } from "types";
import { Container, Button, Stack, Typography, TextField } from "@mui/material";
import { SwapHorizRounded } from "@mui/icons-material";
import { CurrencyAutocomplete } from "components/CurrencyAutocomplete";
import css from "./Converter.module.css";
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";


interface ConverterProps extends IState {
    apiError?: number;
    currencyData: IConvertResult | undefined;
}

export const Converter = (props: ConverterProps) => {
    const { apiError, setTo, setFrom, setAmount, to, from, amount, currencyData, currencyNameTo, setCurrencyNameTo } = props;
    const [fromCurrencyName, setFromCurrencyName] = useState<string>("United States Dollar");
    const resultOfAmount = new Intl.NumberFormat("ru-RU").format(Number(currencyData) * amount);

    const fetchFromValue = (e: React.SyntheticEvent, value: string[] | null) => {
        if (value) {
            setFromCurrencyName(value[1]);
            setFrom(value[0].toLocaleLowerCase());
        };
    };

    const fetchToValue = (e: React.SyntheticEvent, value: string[] | null) => {
        if (value) {
            setCurrencyNameTo(value[1]);
            setTo(value[0].toLocaleLowerCase());
        }
    };

    const fetchValueFromAmountField = (e: any) => {
        setAmount(e.value);
    };

    const swapValueOfCurrency = () => {
        setFrom(to);
        setTo(from);
        setFromCurrencyName(currencyNameTo);
        setCurrencyNameTo(fromCurrencyName);
    };

    const showElementIfValuesEnter = () => {
        if (to && from) {
            return (<Stack>
                <Typography sx={{ color: "#5c667b" }}>
                    {new Intl.NumberFormat("ru-RU").format(amount) + " " + fromCurrencyName + " = "}
                </Typography>
                <Typography sx={{ color: "#2e3c57", fontSize: 30 }}>
                    {resultOfAmount + " " + currencyNameTo}
                </Typography>
            </Stack>);
        } else {
            return (<svg className={css.loader} viewBox="25 25 50 50">
                <circle className={css.itemOfLoader} r="20" cy="50" cx="50"></circle>
            </svg>);
        }
    };


    return (
        <div className={css.converter}>
            {apiError ?
                <Container sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Typography sx={{ fontSize: 44, color: "#FFFFFF" }}
                        variant="overline"
                        component="h2">Error {apiError}</Typography>
                    <img className={css.imageError} src="/undraw_server_down.svg" alt="" />
                </Container>
                :
                <Container maxWidth="md" sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 220,
                    backgroundColor: "#FFFFFF",
                    p: 4,
                    gap: 4,
                    borderRadius: "8px",
                    boxShadow: "#2337504d 0px 6px 12px",
                }}>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <NumberFormat
                            sx={{ minWidth: 120 }}
                            value={amount}
                            type="text"
                            label="Ввести сумму"
                            customInput={TextField}
                            thousandSeparator={true}
                            prefix={getSymbolFromCurrency(`${from}`)}
                            onValueChange={fetchValueFromAmountField}
                        />
                        <CurrencyAutocomplete
                            value={from}
                            onChange={fetchFromValue}
                            label="Конвертировать из"
                        />
                        <Button variant="text" onClick={() => swapValueOfCurrency()}>
                            <SwapHorizRounded fontSize="large" />
                        </Button>
                        <CurrencyAutocomplete
                            value={to ? to : "AED"}
                            onChange={fetchToValue}
                            label="Конвертировать в"
                        />
                    </Stack>
                    {showElementIfValuesEnter()}
                </Container>}
        </div>
    );
};
