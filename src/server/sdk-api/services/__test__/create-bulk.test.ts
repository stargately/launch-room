import test from "ava";
import { createCreateBulk } from "@/server/sdk-api/services/create-bulk";
import { mockLogger } from "./mocks";

test("createBulk", async (t) => {
  const reqBody = [
    {
      kind: "index",
      creationDate: 1600233412007,
      user: {
        key: "aa0ceb",
        name: "Grace Hopper",
        email: "gracehopper@example.com",
      },
    },
    {
      startDate: 1600233412007,
      endDate: 1600233412007,
      features: {
        announcements: {
          default: false,
          counters: [{ value: true, count: 1, variation: 0, version: 2 }],
        },
      },
      kind: "summary",
    },
  ];
  const createBulk = createCreateBulk({ logger: mockLogger });
  t.notThrows(() => {
    createBulk(reqBody);
  });
});
