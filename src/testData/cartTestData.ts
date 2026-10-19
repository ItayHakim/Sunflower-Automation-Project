import { userRegisterDetails } from "./registerTestData";

export const giftCardDetails = {
  recipientName: "larry Test",
  recipientEmail: "recipient.test@example.com",
  senderName: `${userRegisterDetails.firstName} ${userRegisterDetails.lastName}`,
  senderEmail: userRegisterDetails.email
};
