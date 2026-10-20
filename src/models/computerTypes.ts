export const computerNames = {
  simple: "Simple Computer",
  cheap: "Build your own cheap computer",
  custom: "Build your own computer",
  expensive: "Build your own expensive computer",
} as const;

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
