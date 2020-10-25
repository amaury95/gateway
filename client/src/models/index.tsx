export interface Peripheral {
  id: string;
  uid: number;
  vendor: string;
  created: string;
  status: "online" | "offline";
}

export interface Gateway {
  id: string;
  name: string;
  serial: string;
  address: string;
}

export interface GatewayEdges extends Gateway {
  edges: {
    peripherals: Peripheral[];
  };
}
