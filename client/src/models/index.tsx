export interface Peripheral {
  id: string;
  gatewayId: string;
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
  edges: {
    peripherals: Peripheral[];
  };
}
