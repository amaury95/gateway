import { RESTDataSource } from "apollo-datasource-rest";
import { Peripheral } from "../types/peripheral";
import { addr } from "./setup";

export default class PeripheralAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = addr;
  }

  async getPeripherals(): Promise<Peripheral[]> {
    return this.get(`peripherals`);
  }

  async fetchPeripheral(id: string): Promise<Peripheral> {
    return this.get(`peripherals/${id}`);
  }

  async createPeripheral(data: Peripheral): Promise<Peripheral> {
    return this.post(`peripherals`, data);
  }

  async updatePeripheral(id: string, data: Peripheral): Promise<Peripheral> {
    return this.patch(`peripherals/${id}`, data);
  }

  async destroyPeripheral(id: string): Promise<Peripheral> {
    return this.delete(`peripherals/${id}`);
  }
}
