import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function AdvList({ advData }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Adventurers</Title>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>Adventurer</TableCell>
            <TableCell>Game Name</TableCell>
            <TableCell>Renamed?</TableCell>
            <TableCell>Mined?</TableCell>
            <TableCell>Gold</TableCell>
            <TableCell>Coins</TableCell>
            <TableCell>Room No.</TableCell>
            <TableCell>Fly?</TableCell>
            <TableCell>Dash?</TableCell>
            <TableCell align="right">Carry?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {advData.map(row => (
            <TableRow key={row}>
              <TableCell>{row.real_name}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.has_rename ? "Y" : null}</TableCell>
              <TableCell>{row.has_mined ? "Y" : null}</TableCell>
              <TableCell>{row.gold}</TableCell>
              <TableCell>{row.lambda_coins}</TableCell>
              <TableCell>{row.room_id}</TableCell>
              <TableCell>{row.can_fly ? "Y" : null}</TableCell>
              <TableCell>{row.can_dash ? "Y" : null}</TableCell>
              <TableCell align="right">{row.can_carry ? "Y" : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
