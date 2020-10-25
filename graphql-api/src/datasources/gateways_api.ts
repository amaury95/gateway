import { RESTDataSource } from "apollo-datasource-rest";
import Axios from "axios";
import { Gateway } from "../types/gateway";

export default class GatewayAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/";
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
    return await this.delete(`gateways/${id}`);
  }
}
