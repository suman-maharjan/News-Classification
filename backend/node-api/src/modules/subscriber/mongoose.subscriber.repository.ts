import SubscriberModel from "./subscriber.model";
import { Subscriber, SubscriberRepository } from "./subscriber.type";

export class MongooseSubscriberRepository implements SubscriberRepository {
  async create(payload: any): Promise<any> {
    await SubscriberModel.create(payload);
  }
  async getAll(): Promise<any> {
    return SubscriberModel.find();
  }
  async subscriberExists(email: string) {
    const res = await SubscriberModel.exists({ email });
    return !!res;
  }
}
