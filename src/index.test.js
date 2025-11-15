const request = require("supertest");
const express = require("express");

const app = express();
app.get("/health", (_req, res) => res.json({ ok: true }));

test("health endpoint returns ok", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.ok).toBe(true);
});
