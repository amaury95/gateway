import { RESTDataSource } from "apollo-datasource-rest";
import { Peripheral } from "../types/peripheral";
import { Gateway } from "../types/gateway";
import { addr } from "./setup";

export default class GatewayAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = addr;
  }

  async getGateways(): Promise<Gateway[]> {
    return this.get(`gateways`);
  }

  async fetchGateway(id: string): Promise<Gateway> {
    return this.get(`gateways/${id}`);
  }

  async createGateway(data: Gateway): Promise<Gateway> {
    return this.post(`gateways`, data);
  }

  async updateGateway(id: string, data: Gateway): Promise<Gateway> {
    return this.patch(`gateways/${id}`, data);
  }

  async destroyGateway(id: string): Promise<Gateway> {
    return this.delete(`gateways/${id}`);
  }

  async getPeripherals(id: string): Promise<Peripheral> {
    return this.get(`gateways/${id}/peripherals`);
  }
}
