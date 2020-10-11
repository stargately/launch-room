const Client = require("@sendgrid/client/src/classes/client");

export interface SendArgs {
  title?: string;
  date?: Date;
  url?: string;
  forwardedFor?: string;
  imageUrls?: Array<string>;
  short?: string;
  unsubscribeGroup?: number;
  htmlContent: string;

  content: string;
  pinImageUrl?: string;
  generateTextImage?: boolean;
}

type Opts = {
  sendgridApiKey: string;
  listName: string;
  senderId: string;
  unsubscribeUrl?: string;
  unsubscribeGroup?: number;
};

export type Recipient = {
  email: string;
  lastName?: string;
  firstName?: string;
};

export class SendgridClient {
  client: any;

  opts: Opts;

  listId: number;

  constructor(opts: Opts) {
    this.client = new Client();
    this.client.setApiKey(opts.sendgridApiKey);
    this.opts = opts;
    this.createListIfNotExists();
  }

  async createListIfNotExists(): Promise<void> {
    try {
      const request = {
        method: "GET",
        url: `/v3/marketing/lists`,
      };
      const [, body] = await this.client.request(request);
      for (const list of body.result) {
        if (list.name === this.opts.listName) {
          this.listId = list.id;
          return;
        }
      }
      await this.createList();
    } catch (e) {
      await this.createList();
    }
  }

  async createList(): Promise<void> {
    try {
      const request = {
        method: "POST",
        url: `/v3/marketing/lists`,
        body: {
          name: this.opts.listName,
        },
      };
      const [, body] = await this.client.request(request);
      this.listId = body.id;
    } catch (e) {
      throw new Error(
        `failed to createList ${this.opts.listName}: ${JSON.stringify(
          e.response.body.errors
        )}`
      );
    }
  }

  async addToList(recipient: Recipient): Promise<void> {
    if (!this.listId) {
      await this.createListIfNotExists();
    }
    try {
      const request = {
        method: "PUT",
        url: `/v3/marketing/contacts`,
        body: {
          list_ids: [this.listId],
          contacts: [
            {
              email: recipient.email,
              // first_name: recipient.firstName,
              // last_name: recipient.lastName
            },
          ],
        },
      };
      await this.client.request(request);
    } catch (e) {
      throw new Error(
        `failed to addToList, status: ${e.code} ${e.message}: ${JSON.stringify(
          e.response.body
        )}`
      );
    }
  }
}
