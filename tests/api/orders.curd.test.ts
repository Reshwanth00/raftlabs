import request from "supertest";

const BASE_URL = "http://localhost:3000";

describe("Orders API – contract tests", () => {
  /**
   * GET /api/orders
   */
  it("GET /api/orders → returns 200 and array", async () => {
    const res = await request(BASE_URL).get("/api/orders");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  /**
   * POST /api/orders – missing items
   */
  it("POST /api/orders → fails when items are missing", async () => {
    const res = await request(BASE_URL)
      .post("/api/orders")
      .send({
        customer: {
          name: "Test",
          address: "Addr",
          phone: "9999999999",
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/items/i);
  });

  /**
   * POST /api/orders – empty items
   */
  it("POST /api/orders → fails when items array is empty", async () => {
    const res = await request(BASE_URL)
      .post("/api/orders")
      .send({
        items: [],
        customer: {
          name: "Test",
          address: "Addr",
          phone: "9999999999",
        },
      });

    expect(res.status).toBe(400);
  });

  /**
   * GET /api/orders/:id – invalid id
   */
  it("GET /api/orders/:id → returns 404 for invalid id", async () => {
    const res = await request(BASE_URL).get(
      "/api/orders/000000000000000000000000"
    );

    expect(res.status).toBe(404);
  });

  /**
   * PATCH /api/orders/:id – invalid status
   */
  it("PATCH /api/orders/:id → rejects invalid status", async () => {
    const res = await request(BASE_URL)
      .patch("/api/orders/000000000000000000000000")
      .send({ status: "INVALID_STATUS" });

    expect([400, 404]).toContain(res.status);
  });
});
