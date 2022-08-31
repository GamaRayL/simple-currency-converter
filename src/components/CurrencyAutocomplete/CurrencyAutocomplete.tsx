import { Autocomplete, Box, TextField } from "@mui/material";
import data from "store/data.json";
import "currency-flags/dist/currency-flags.css";

interface CurrencyAutocompleteProps {
    inputValue: string;
    label: string;
    onChange: (e: React.SyntheticEvent, value: string[]) => void;
    onChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CurrencyAutocomplete = (props: CurrencyAutocompleteProps) => {
    const { label, inputValue, onChange, onChangeTextField } = props;
    const options = Object.entries(data).map((option) => {
        const firstLetter = option[0][0];
        return {
            firstLetter: firstLetter,
            ...option,
        };
    });

    return (
        <Autocomplete
            sx={{ minWidth: 120 }}
            autoHighlight
            fullWidth
            inputValue={inputValue}
            disableClearable
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            onChange={onChange}
            getOptionLabel={(option) => option[0]}
            isOptionEqualToValue={(option, value) => option[0] === value[0]}
            groupBy={(option) => option.firstLetter}
            renderOption={(props, option) => (
                <Box component="li" sx={{ display: "flex", gap: 2, fontSize: 14 }} {...props}>
                    <div className={`currency-flag currency-flag-${option[0].toLowerCase()}`}></div>
                    {option[0]} {" – "} {option[1]}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    onChange={onChangeTextField}
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
};