import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./searchbar.css";
import usePlaces from "../../hooks/usePlaces";

export default function Searchbar(props) {
  const [selected, setSelected] = useState("");
  const [tag, setTag] = useState("");
  const places = usePlaces(tag);

  const handleTag = (e, v) => {
    setTag(v);
  };

  const handleSelected = (e, v) => {
    const p = places[v];
    setSelected(v);
    if (p.bbox) {
      //some places such as municipalities have a bounding box. nice.
      props.fitBounds(p.bbox);
    } else {
      //otherwise just use the center coordinate
      props.flyTo(p.center);
    }
  };

  /*
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      console.log("value", e.target.value);
      // put the login here
    }
  };
  */

  return (
    <Autocomplete
      className="autocomplete"
      inputValue={tag} //the typed text
      onInputChange={handleTag}
      value={selected} //the selected option
      onChange={handleSelected}
      freeSolo
      id="search-place"
      disableClearable
      options={Object.keys(places)}
      renderInput={(params) => (
        <TextField
          //onKeyDown={keyPress}
          className="textfield"
          {...params}
          label="Sök plats"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
