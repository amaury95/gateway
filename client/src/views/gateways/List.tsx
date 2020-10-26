import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Gateway } from "models";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeripheralsList from "views/peripherals/List";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import GatewayForm from "./Form";
import { red } from "@material-ui/core/colors";

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
    color: red[500],
  },
}));

export default function GatewaysList(props: { items: Gateway[] }) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [showForm, setShowForm] = useState(false);
  const [formTarget, setFormTarget] = useState({} as Gateway);
  const toggleShow = () => setShowForm(!showForm);

  return (
    <div className={classes.root}>
      <GatewayForm
        open={showForm}
        handleClose={toggleShow}
        target={formTarget}
        setTarget={setFormTarget}
      />
      <Accordion
        onClick={() => {
          setFormTarget({} as Gateway);
          setShowForm(true);
        }}
        expanded={false}
      >
        <AccordionSummary>
          <Button color="primary" startIcon={<AddIcon />}>
            Create Gateway
          </Button>
        </AccordionSummary>
      </Accordion>
      {props.items.map((item) => (
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
              onClick={() => {
                setFormTarget(item);
                setShowForm(true);
              }}
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
