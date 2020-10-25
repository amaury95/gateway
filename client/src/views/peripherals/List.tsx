import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Peripheral } from "models";
import React, { Fragment, useContext, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import { SetPeripheralForm } from "store/actions";
import { Store } from "store";

type PeripheralsList = {
  items: Peripheral[];
  // parent id
  id: string;
};

export default function PeripheralsList(props: PeripheralsList) {
  const { dispatch } = useContext(Store);

  const openForm = (item: Peripheral) =>
    dispatch(SetPeripheralForm(item, "open"));

  const [items, setItems] = useState(props.items);

  return (
    <Fragment>
      <Table aria-label="caption table">
        <caption>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => openForm({} as Peripheral)}
          >
            Add Peripheral
          </Button>
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell align="center">Creation Time</TableCell>
            <TableCell align="center">Uid</TableCell>
            <TableCell align="center">Connection Status</TableCell>
            <TableCell align="right">Edit Peripheral</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((i) => (
            <TableRow key={i.id}>
              <TableCell component="th" scope="row">
                {i.vendor}
              </TableCell>
              <TableCell align="center">{i.created}</TableCell>
              <TableCell align="center">{i.uid}</TableCell>
              <TableCell align="center">{i.status}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openForm(i)}>
                  <CreateIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
