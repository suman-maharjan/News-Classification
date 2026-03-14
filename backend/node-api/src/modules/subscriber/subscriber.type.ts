import { MongooseSubscriberRepository } from "./mongoose.subscriber.repository";

export type Subscriber = {
  email: string;
};

export interface SubscriberRepository {
  create(payload: any): Promise<Subscriber>;
  getAll(): Promise<any>;
  subscriberExists(email: string): Promise<boolean>;
}

export const subscriberRepository = new MongooseSubscriberRepository();
