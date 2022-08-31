import { useEffect, useState } from "react";
import { IConvertResult, IState } from "types";
import { Container, Button, Stack, TextField, Typography } from "@mui/material";
import { SwapHorizRounded } from "@mui/icons-material";
import { CurrencyAutocomplete } from "components/CurrencyAutocomplete/CurrencyAutocomplete";
import css from "./Converter.module.css";

interface ConverterProps extends IState {
    apiError: number | undefined;
    currencyData: IConvertResult | undefined;
    fullCurrencyName: string;
}

export const Converter = (props: ConverterProps) => {
    const { apiError, setTo, setFrom, setAmount, to, from, amount, currencyData, fullCurrencyName } = props;
    const [fromCurrencyName, setFromCurrencyName] = useState<string>("");
    const [toCurrencyName, setToCurrencyName] = useState<string>("United States Dollar");

    useEffect(() => {
        setFromCurrencyName(fullCurrencyName);
    }, [fullCurrencyName]);

    const fetchFromValue = (e: React.SyntheticEvent, value: string[]) => {
        if (value) {
            setFromCurrencyName(value[1]);
            setFrom(value[0]);
        };
    };

    const fetchToValue = (e: React.SyntheticEvent, value: string[]) => {
        if (value) {
            setToCurrencyName(value[1]);
            setTo(value[0]);
        }
    };

    const fetchValueFromField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const fetchValueFromTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value);
    };

    const fetchValueToTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value);
    };

    const swapValueOfCurrency = () => {
        setFrom(to);
        setTo(from);
        setFromCurrencyName(toCurrencyName);
        setToCurrencyName(fromCurrencyName);
    };

    const showElementIfValuesEnter = () => {
        if (amount && to && from) {
            return (<Stack>
                <Typography sx={{ color: "#5c667b" }}>
                    {amount + " " + fromCurrencyName + " = "}
                </Typography>
                <Typography sx={{ color: "#2e3c57", fontSize: 30 }}>
                    {currencyData?.result === undefined ? null : currencyData.result + " " + toCurrencyName}
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
                        <TextField
                            sx={{ minWidth: 120 }}
                            value={amount}
                            onChange={fetchValueFromField}
                            label="Ввести сумму"
                        />
                        <CurrencyAutocomplete
                            inputValue={from}
                            onChange={fetchFromValue}
                            onChangeTextField={fetchValueFromTextField}
                            label="Конвертировать из"
                        />
                        <Button variant="text" onClick={() => swapValueOfCurrency()}>
                            <SwapHorizRounded fontSize="large" />
                        </Button>
                        <CurrencyAutocomplete
                            inputValue={to}
                            onChange={fetchToValue}
                            onChangeTextField={fetchValueToTextField}
                            label="Конвертировать в"
                        />
                    </Stack>
                    {showElementIfValuesEnter()}
                </Container>}
        </div>
    );
};
