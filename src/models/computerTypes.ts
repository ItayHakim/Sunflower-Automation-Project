export type ComputerName =
  | "Simple Computer"
  | "Build your own cheap computer"
  | "Build your own computer"
  | "Build your own expensive computer";

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