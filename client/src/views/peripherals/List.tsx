import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Peripheral } from "models";
import React, { Fragment, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import PeripheralForm from "./Form";

type PeripheralsList = {
  items: Peripheral[];
  // parent id
  id: string;
};

export default function PeripheralsList(props: PeripheralsList) {
  const [showForm, setShowForm] = useState(false);
  const [formTarget, setFormTarget] = useState({} as Peripheral);
  const toggleShow = () => setShowForm(!showForm);

  return (
    <Fragment>
      <PeripheralForm
        open={showForm}
        handleClose={toggleShow}
        target={formTarget}
        setTarget={setFormTarget}
      />
      <Table aria-label="caption table">
        <caption>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setFormTarget({
                gatewayId: props.id,
                status: "offline",
              } as Peripheral);
              setShowForm(true);
            }}
          >
            Add Peripheral
          </Button>
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell align="center">Creation Date</TableCell>
            <TableCell align="center">Uid</TableCell>
            <TableCell align="center">Connection Status</TableCell>
            <TableCell align="right">Edit Peripheral</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.vendor}
              </TableCell>
              <TableCell align="center">{item.created}</TableCell>
              <TableCell align="center">{item.uid}</TableCell>
              <TableCell align="center">{item.status}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    setFormTarget(item);
                    setShowForm(true);
                  }}
                >
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
