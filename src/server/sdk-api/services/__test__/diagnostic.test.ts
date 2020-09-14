import test from "ava";
import { createDiagnose } from "@/server/sdk-api/services/diagnostic";
import { mockLogger } from "./mocks";

test("diagnostic", async (t) => {
  const input = {
    kind: "diagnostic-init",
    id: {
      diagnosticId: "ea498bfc-ef7d-4192-96d0-fd734b76aabd",
      sdkKeySuffix: "ide-id",
    },
    creationDate: 1600056058649,
    sdk: { name: "node-server-sdk", version: "5.13.4" },
    configuration: {
      customBaseURI: true,
      customStreamURI: false,
      customEventsURI: true,
      eventsCapacity: 10000,
      connectTimeoutMillis: 4105,
      socketTimeoutMillis: 4105,
      eventsFlushIntervalMillis: 4105,
      pollingIntervalMillis: 30000,
      reconnectTimeMillis: 1000,
      streamingDisabled: true,
      usingRelayDaemon: false,
      offline: false,
      allAttributesPrivate: false,
      inlineUsersInEvents: false,
      userKeysCapacity: 1000,
      userKeysFlushIntervalMillis: 300000,
      usingProxy: false,
      usingProxyAuthenticator: false,
      diagnosticRecordingIntervalMillis: 900000,
      dataStoreType: "custom",
    },
    platform: {
      name: "Node",
      osArch: "x64",
      osName: "MacOS",
      osVersion: "19.5.0",
      nodeVersion: "12.16.2",
    },
  };
  const diagnose = createDiagnose({ logger: mockLogger });
  t.truthy(diagnose(input));
});
