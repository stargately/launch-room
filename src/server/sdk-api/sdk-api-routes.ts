import { MyServer } from "@/server/start-server";
import { Context } from "onefx/lib/types";
import { createDiagnose } from "@/server/sdk-api/services/diagnostic";
import { createGetLatestAll } from "@/server/sdk-api/services/get-latest-all";
import { createGetEval } from "@/server/sdk-api/services/get-eval";
import { createCreateBulk } from "@/server/sdk-api/services/create-bulk";

export function setSdkApiRoutes(server: MyServer) {
  const diagnose = createDiagnose(server);
  const getLatestAll = createGetLatestAll(server);
  const getEval = createGetEval();
  const createBulk = createCreateBulk(server);

  server.get("get-sdk-goals", "/sdk/goals/:clientId", async (ctx: Context) => {
    ctx.response.body = [];
  });

  server.all("get-diagnostic", "/diagnostic", async (ctx: Context) => {
    const resp = diagnose(ctx.request.body);
    ctx.response.body = JSON.stringify(resp);
  });

  server.all("get-latest-all", "/sdk/latest-all", async (ctx: Context) => {
    const sdkKey = ctx.headers.authorization;
    const resp = getLatestAll(sdkKey);
    ctx.response.body = JSON.stringify(resp);
  });

  server.get(
    "get-eval",
    "/sdk/evalx/:clientId/users/:userBase64",
    async (ctx: Context) => {
      const buff = Buffer.from(ctx.params.userBase64, "base64");
      const text = buff.toString("utf8");
      const user = JSON.parse(text);
      ctx.response.body = getEval(user);
    }
  );

  server.post(
    "check-events-bulk",
    "/events/bulk/:clientId",
    async (ctx: Context) => {
      ctx.response.status = 202;
    }
  );

  server.post("create-bulk", "/bulk", async (ctx: Context) => {
    createBulk(ctx.request.body);
    ctx.response.status = 202;
  });
}
