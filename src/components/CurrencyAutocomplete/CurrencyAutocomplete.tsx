import { CurrencyAutocompleteProps } from "types";
import { Autocomplete, Box, TextField } from "@mui/material";
import data from "store/data.json";
import "currency-flags/dist/currency-flags.css";

export const CurrencyAutocomplete = (props: CurrencyAutocompleteProps) => {
  const { label, onChange, value } = props;
  const options = Object.entries(data).map((option) => {
    const firstLetter = option[0][0];
    return {
      firstLetter: firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      fullWidth
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      onChange={onChange}
      value={options.find(q => q[0] === value.toLocaleUpperCase())}
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
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};