import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { Centered } from "components/styled";
import { GatewayEdges } from "models";
import React, { Component } from "react";
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

const GATEWAY_CREATED_SUBSCRIPTION = gql`
  subscription CreateGateway {
    item: gatewayCreated {
      id
      serial
      name
      address
    }
  }
`;

export default function GatewaysProvider() {
  const { subscribeToMore, ...result } = useQuery(GATEWAY_EDGES_QUERY);

  return (
    <GatewayPageWithData
      {...result}
      subscriptionFunction={() =>
        subscribeToMore({
          document: GATEWAY_CREATED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const item = subscriptionData.data.item;
            console.log(subscriptionData);
            return Object.assign({}, prev, { items: [item] });
          },
        })
      }
    />
  );
}

type GatewayPageWithDataProps = {
  subscriptionFunction: () => void;

  data?: { items: GatewayEdges[] };
  loading?: boolean;
};

export class GatewayPageWithData extends Component<GatewayPageWithDataProps> {
  componentDidMount() {
    this.props.subscriptionFunction();
  }

  render() {
    if (this.props.loading) {
      return (
        <Centered>
          <CircularProgress />
        </Centered>
      );
    }

    if (this.props.data) {
      return <GatewaysList items={this.props.data.items} />;
    }

    return (
      <Centered>
        <h5>
          It looks like you have a connection error. Please contact developer
          for support.
        </h5>
      </Centered>
    );
  }
}
