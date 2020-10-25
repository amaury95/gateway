import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Gateway, GatewayEdges } from "models";
import React, { useContext, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SetGatewayForm } from "store/actions";
import { Store } from "store";
import PeripheralsList from "views/peripherals/List";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "30%",
    flexShrink: 0,
  },
  secondaryItem: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "30%",
    flexShrink: 0,
  },
  editButton: {
    marginLeft: 30,
  },
}));

export default function GatewaysList(props: { items: GatewayEdges[] }) {
  const classes = useStyles();
  const { dispatch } = useContext(Store);

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const openForm = (item: Gateway) => dispatch(SetGatewayForm(item, "open"));

  const [gateways, setGateways] = useState([...props.items]);

  return (
    <div className={classes.root}>
      <Accordion onClick={() => openForm({} as Gateway)} expanded={false}>
        <AccordionSummary>
          <Button color="primary" startIcon={<AddIcon />}>
            Create Gateway
          </Button>
        </AccordionSummary>
      </Accordion>
      {gateways.map((item) => (
        <Accordion
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          key={item.id}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${item.id}bh-content`}
            id={`panel${item.id}bh-header`}
          >
            <Typography className={classes.item}>{item.name}</Typography>
            <Typography className={classes.secondaryItem}>
              {item.serial}
            </Typography>
            <Typography className={classes.secondaryItem}>
              {item.address}
            </Typography>
          </AccordionSummary>
          <div className={classes.editButton}>
            <Button
              color="primary"
              startIcon={<CreateIcon />}
              onClick={() => openForm(item)}
            >
              Edit Gateway
            </Button>
          </div>
          <AccordionDetails>
            <PeripheralsList items={item.edges.peripherals} id={item.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
