import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { Centered } from "components/styled";
import { GatewayEdges } from "models";
import React, { useContext } from "react";
import { Store } from "store";
import { SetNotification } from "store/actions";
import GatewaysList from "./List";

const GATEWAY_EDGES_QUERY = gql`
  query GetAll {
    items: getGateways {
      id
      serial
      name
      address
      edges {
        peripherals {
          id
          gatewayId
          uid
          vendor
          created
          status
        }
      }
    }
  }
`;

export default function GatewaysProvider() {
  const { dispatch } = useContext(Store);

  const { data, loading, error } = useQuery<{ items: GatewayEdges[] }>(
    GATEWAY_EDGES_QUERY
  );

  if (loading) {
    return (
      <Centered>
        <CircularProgress />
      </Centered>
    );
  }

  if (error) {
    dispatch(SetNotification(error.message, "alert"));
  }

  if (data) {
    return <GatewaysList items={data.items} />;
  }

  return (
    <Centered>
      <h1>Your connection is broken. Please contact developer for support.</h1>
    </Centered>
  );
}
