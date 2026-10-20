export const productSelectors = {
  productDetails: ".product-essential",
  giftCard: {
    recipient: {
      nameInput: "[id$='_RecipientName']",
      emailInput: "[id$='_RecipientEmail']"
    },
    sender: {
      nameInput: "[id$='_SenderName']",
      emailInput: "[id$='_SenderEmail']",
    },
  },
  computer: {
    computerOptions: ".attributes dd",
    dropdown: {
      processor: "#product_attribute_16_5_4",
      ram: "#product_attribute_16_6_5",
    }
  },
  itemCommonSelectors:{
    Name: ".product-name",
    Quantity: ".qty-input",
    Attributes: ".attributes",
  },
  optionDropdown: "select",
  optionRadioButton: "input[type='radio']",
  
};
