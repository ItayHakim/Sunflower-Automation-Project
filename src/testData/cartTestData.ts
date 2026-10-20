import { Computer, ComputerOptions } from "../models/computerTypes";
import { userRegisterDetails } from "./registerTestData";

export const giftCardDetails = {
  recipientName: "larry Test",
  recipientEmail: "recipient.test@example.com",
  senderName: `${userRegisterDetails.firstName} ${userRegisterDetails.lastName}`,
  senderEmail: userRegisterDetails.email
};


export const computerDetails: Computer[] = [
  {
    name: "Simple Computer",
    options: {
      processor: "Slow",
      ram: "4 GB [+20.00]",
      hdd: "320 GB",
      software: ["Image Viewer"],
    }
  },
  {
    name: "Build your own cheap computer",
    options: {
      processor: "Medium [+15.00]",
      ram: "4 GB [+20.00]",
      hdd: "400 GB [+100.00]",
      software: ["Image Viewer [+5.00]"]
    }
  },
  {
    name: "Build your own computer",
    options: {
      processor: "2.2 GHz Intel Pentium Dual-Core E2200",
      ram: "4GB [+20.00]",
      hdd: "400 GB [+100.00]",
      os: "Windows 10 [+60.00]",
      software: ["Acrobat Reader [+10.00]"]
    }
  },
  {
    name: "Build your own expensive computer",
    options: {
      processor: "Fast [+100.00]",
      ram: "8GB [+60.00]",
      hdd: "400 GB [+100.00]",
      software: ["Office Suite [+100.00]"]
    }
  }
]
