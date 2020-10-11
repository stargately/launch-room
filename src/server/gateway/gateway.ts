import mongoose from "mongoose";
import { MyServer } from "@/server/start-server";
import { SendgridClient } from "@/shared/newsletter/sendgrid-client";

export type Gateways = {
  mongoose: mongoose.Mongoose;
  sendgridClient: SendgridClient;
};

export function setGateways(server: MyServer): void {
  server.gateways = server.gateways || {};

  if (!server.config.gateways.mongoose) {
    server.logger.warn(
      "cannot connect to the database without gateways.mongoose.uri provided in configuration"
    );
  } else {
    mongoose.connect(server.config.gateways.mongoose.uri).catch((err) => {
      server.logger.warn(`failed to connect mongoose: ${err}`);
    });
    server.gateways.mongoose = mongoose;
  }

  server.gateways.sendgridClient = new SendgridClient(
    server.config.gateways.sendgrid
  );
}
