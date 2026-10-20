import { Computer, } from "../models/computerTypes";
import { userRegisterDetails } from "./registerData";

export const computerNames = {
  simple: "Simple Computer",
  cheap: "Build your own cheap computer",
  custom: "Build your own computer",
  expensive: "Build your own expensive computer",
} as const;

export const giftCardDetails = {
  recipientName: "larry Test",
  recipientEmail: "recipient.test@example.com",
  senderName: `${userRegisterDetails.firstName} ${userRegisterDetails.lastName}`,
  senderEmail: userRegisterDetails.email
};


export const computerDetails: Computer[] = [
  {
    name: computerNames.simple,
    options: {
      processor: "Slow",
      ram: "4 GB [+20.00]",
      hdd: "320 GB",
      software: "Image Viewer",
    }
  },
  {
    name: computerNames.cheap,
    options: {
      processor: "Medium [+15.00]",
      ram: "4 GB [+20.00]",
      hdd: "400 GB [+100.00]",
      software: "Image Viever [+5.00]"
    }
  },
  {
    name: computerNames.custom,
    options: {
      processor: "2.2 GHz Intel Pentium Dual-Core E2200",
      ram: "4GB [+20.00]",
      hdd: "400 GB [+100.00]",
      os: "Windows 10 [+60.00]",
      software: "Acrobat Reader [+10.00]"
    }
  },
  {
    name: computerNames.expensive,
    options: {
      processor: "Fast [+100.00]",
      ram: "8GB [+60.00]",
      hdd: "400 GB [+100.00]",
      software: "Office Suite [+100.00]"
    }
  }
]
