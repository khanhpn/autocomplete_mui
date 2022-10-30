import { useState, useEffect, useCallback } from "react";

import { TextField, Checkbox, Autocomplete, Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import currentApi from "./api/ApiUtil";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const App = () => {
  const [currentValue, setCurrentValue] = useState([]);
  const [value, setValue] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("a");

  useEffect(() => {
    fetch(currentApi(currentKeyword))
      .then((response) => response.json())
      .then((data) => {
        const drinks = data.drinks;
        setCurrentValue(drinks);
      });
  }, [currentKeyword]);

  const handleInputText = useCallback((event) => {
    setCurrentKeyword(event.target.value);
  }, []);

  console.log("value: ", value);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "10px"
      }}
    >
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={currentValue}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        disableCloseOnSelect
        getOptionLabel={(option) => option.strDrink}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.strDrink}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Checkboxes"
            placeholder="Name"
            onChange={(event) => handleInputText(event)}
          />
        )}
      />
    </Box>
  );
};

export default App;
