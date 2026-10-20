import { computerNames } from "../testData/productsData";

export type ComputerName = (typeof computerNames)[keyof typeof computerNames];

export type ComputerOptions = {
  processor: string;
  ram: string;
  hdd: string;
  os?: string;
  software: string;
};

export type Computer = {
  name: ComputerName;
  options: ComputerOptions;
};
