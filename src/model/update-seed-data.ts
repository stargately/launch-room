import { Model } from "@/model/model";
import { OnefxAuth } from "onefx-auth";

const seedUsers = [
  {
    _id: "5fc9f952b8e8b72f4a7f811e",
    email: "puncsky+dev+alpha@gmail.com",
    ip: "192.0.0.1",
    locale: "en-US",
    password: "launchroomdevpass",
  },
  {
    _id: "5fc9f952b8e8b72f4a7f8112",
    email: "puncsky+dev+beta@gmail.com",
    ip: "192.0.0.1",
    locale: "en-US",
    password: "launchroomdevpass",
  },
];

const seedWorkspaces = [
  {
    _id: "5fca07e0e66beb3159d792f2",
    name: "Fantastic Corp",
    owner: "5fc9f952b8e8b72f4a7f811e",
  },
  {
    _id: "5fca07e0e66beb3159d49218",
    name: "Beancount.io",
    owner: "5fc9f952b8e8b72f4a7f8112",
  },
];

const seedUserWorkspaces = [
  {
    _id: "5fca07e0e66beb3159d591f2",
    user: seedUsers[0]._id,
    workspace: seedWorkspaces[0]._id,
    role: "admin",
  },
  {
    _id: "5fc9f952b8e8b72f4a7f8112",
    user: seedUsers[0]._id,
    workspace: seedWorkspaces[0]._id,
    role: "admin",
  },
];

const seedFlags = [
  {
    key: "alpha-launch-users",
    name: "alpha-launch-users",
    description: "alpha-launch-users",
    workspace: seedWorkspaces[0]._id,
    version: 100,
    // this should be "on", however mongoose does not allow it
    isOn: true,
    trackEvents: false,
    trackEventsFallthrough: false,
    deleted: false,
    prerequisites: [],
    salt: "3eaa44da02e4467790d33e4f957e677b",
    sel: "0885b10ced58494ea3ae649c1d4ef937",
    targets: [],
    rules: [
      {
        id: "b47993ca-fb08-4eac-bc19-839fce50b1ac",
        variation: 0,
        clauses: [
          {
            attribute: "email",
            op: "endsWith",
            values: ["@beancount.io"],
            negate: false,
          },
        ],
        trackEvents: false,
      },
      {
        id: "65947501-e647-44fc-b4e2-f4e025c07157",
        variation: 0,
        clauses: [
          {
            attribute: "email",
            op: "startsWith",
            values: ["jane.doe+", "jackie+"],
            negate: false,
          },
        ],
        trackEvents: false,
      },
    ],
    fallthrough: { variation: 1 },
    offVariation: 1,
    variations: [true, false],
    debugEventsUntilDate: null,
    clientSide: true,
    clientSideAvailability: {
      usingMobileKey: true,
      usingEnvironmentId: true,
    },
    archived: false,
  },
  {
    key: "alpha-launch",
    name: "alpha-launch",
    description: "alpha-launch",
    workspace: seedWorkspaces[0]._id,
    version: 100,
    // this should be "on", however mongoose does not allow it
    isOn: true,
    trackEvents: false,
    trackEventsFallthrough: false,
    deleted: false,
    prerequisites: [],
    salt: "3eaa44da02e4467790d33e4f957e677b",
    sel: "0885b10ced58494ea3ae649c1d4ef937",
    targets: [],
    rules: [
      {
        id: "b47993ca-fb08-4eac-bc19-839fce50b1ac",
        variation: 0,
        clauses: [
          {
            attribute: "email",
            op: "endsWith",
            values: ["@beancount.io"],
            negate: false,
          },
        ],
        trackEvents: false,
      },
      {
        id: "65947501-e647-44fc-b4e2-f4e025c07157",
        variation: 0,
        clauses: [
          {
            attribute: "email",
            op: "startsWith",
            values: ["jane.doe+", "jackie+"],
            negate: false,
          },
        ],
        trackEvents: false,
      },
    ],
    fallthrough: { variation: 1 },
    offVariation: 1,
    variations: [true, false],
    debugEventsUntilDate: null,
    clientSide: true,
    clientSideAvailability: {
      usingMobileKey: true,
      usingEnvironmentId: true,
    },
    archived: true,
  },
  {
    key: "spendingReportSubscription",
    name: "spendingReportSubscription",
    description: "spendingReportSubscription",
    workspace: seedWorkspaces[1]._id,
    version: 2,
    // this should be "on", however mongoose does not allow it
    isOn: true,
    trackEvents: false,
    trackEventsFallthrough: false,
    deleted: false,
    prerequisites: [],
    salt: "2afdfb6f53304d9a990e0c347c061eee",
    sel: "c18957b75318447788891bc8fc7dfa02",
    targets: [],
    rules: [],
    fallthrough: { variation: 0 },
    offVariation: 1,
    variations: [true, false],
    debugEventsUntilDate: null,
    clientSide: false,
    clientSideAvailability: {
      usingMobileKey: true,
      usingEnvironmentId: false,
    },
  },
];

const seedApiTokens = [
  {
    _id: "5fca07e0e66beb3159d59444",
    workspace: seedWorkspaces[0]._id,
    launchRoomToken: "sdk-6576e062-665e-4e1c-bef6-1711b959ddda",
  },
  {
    _id: "5fca07e0e66beb3159d59666",
    workspace: seedWorkspaces[1]._id,
    launchRoomToken: "sdk-6576e062-665e-4e1c-bef6-1711b959dddf",
  },
];

export const updateSeedDate = async (
  auth: OnefxAuth,
  model: Model
): Promise<void> => {
  await Promise.all([...seedUsers.map((u) => auth.user.newAndSave(u))]);
  await Promise.all([
    model.workspaceModel.insertMany(seedWorkspaces),
    model.userWorkspace.insertMany(seedUserWorkspaces),
    model.flagModel.insertMany(seedFlags),
    model.apiTokens.insertMany(seedApiTokens),
  ]);
};
