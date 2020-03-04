import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 400
    }
  },
  button: {
    margin: theme.spacing(1),
    width: 200
  }
}));

const CredentialsForm = ({ handleChange, handleAPIsave, apiState }) => {
  const classes = useStyles();
  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleAPIsave}
      >
        <TextField
          InputLabelProps={{ shrink: true }}
          id="standard-size-small"
          label="API KEY"
          value={apiState}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Remember me
        </Button>
      </form>
    </div>
  );
};

export default CredentialsForm;
