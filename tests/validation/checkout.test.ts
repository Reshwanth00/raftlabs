import { validateCheckout } from "@/lib/validators/checkout";

describe("Checkout input validation", () => {
  it("fails when all fields are empty", () => {
    const errors = validateCheckout({
      name: "",
      address: "",
      phone: "",
      email: "",
    });

    expect(errors.name).toBeDefined();
    expect(errors.address).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it("fails when email is invalid", () => {
    const errors = validateCheckout({
      name: "John",
      address: "Somewhere",
      phone: "9876543210",
      email: "invalid-email",
    });

    expect(errors.email).toBe("Email is invalid");
  });

  it("passes with valid email", () => {
    const errors = validateCheckout({
      name: "John",
      address: "Somewhere",
      phone: "9876543210",
      email: "john@example.com",
    });

    expect(errors.email).toBeUndefined();
  });

  it("passes when all inputs are valid", () => {
    const errors = validateCheckout({
      name: "John",
      address: "Somewhere",
      phone: "9876543210",
      email: "john@example.com",
    });

    expect(Object.keys(errors).length).toBe(0);
  });
});
