import request from "supertest";

const BASE_URL = "http://localhost:3000";

describe("Orders API – contract & validation tests", () => {
  /**
   * GET /api/orders
   */
  it("GET /api/orders → should return 200 and array", async () => {
    const res = await request(BASE_URL).get("/api/orders");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /**
   * POST /api/orders – missing items
   */
  it("POST /api/orders → should fail if items are missing", async () => {
    const res = await request(BASE_URL)
      .post("/api/orders")
      .send({
        customer: {
          name: "Test",
          address: "Address",
          phone: "9999999999",
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/items/i);
  });

  /**
   * POST /api/orders – empty items array
   */
  it("POST /api/orders → should fail if items array is empty", async () => {
    const res = await request(BASE_URL)
      .post("/api/orders")
      .send({
        items: [],
        customer: {
          name: "Test",
          address: "Address",
          phone: "9999999999",
        },
      });

    expect(res.status).toBe(400);
  });

  /**
   * POST /api/orders – missing customer
   */
  it("POST /api/orders → should fail if customer is missing", async () => {
    const res = await request(BASE_URL)
      .post("/api/orders")
      .send({
        items: [{ menuId: "123", quantity: 1 }],
      });

    expect(res.status).toBe(400);
  });

  /**
   * GET /api/orders/:id – invalid id
   */
  it("GET /api/orders/:id → should return 404 for invalid id", async () => {
    const res = await request(BASE_URL).get(
      "/api/orders/000000000000000000000000"
    );

    expect(res.status).toBe(404);
  });

  /**
   * PATCH /api/orders/:id – invalid status
   */
  it("PATCH /api/orders/:id → should reject invalid status", async () => {
    const res = await request(BASE_URL)
      .patch("/api/orders/000000000000000000000000")
      .send({ status: "INVALID_STATUS" });

    // Depending on validation order → 400 or 404 is acceptable
    expect([400, 404]).toContain(res.status);
  });

  /**
   * PATCH /api/orders/:id – missing status
   */
  it("PATCH /api/orders/:id → should fail if status is missing", async () => {
    const res = await request(BASE_URL)
      .patch("/api/orders/000000000000000000000000")
      .send({});

    expect([400, 404]).toContain(res.status);
  });
});
