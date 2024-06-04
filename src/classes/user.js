const User = class {
  constructor(email, password) {
    (this.firstName = ""),
      (this.lastName = ""),
      (this.id = email),
      (this.password = password),
      (this.contactPhoneNumber = ""),
      (this.streetName = ""),
      (this.houseNumber = ""),
      (this.postalNumber = ""),
      (this.city = ""),
      (this.paymentOption = ""),
      (this.payingPhoneNumber = ""),
      (this.cardNumber = ""),
      (this.expirationDate = ""),
      (this.cvc = ""),
      (this.favorites = []);
  }
};
export default User;
