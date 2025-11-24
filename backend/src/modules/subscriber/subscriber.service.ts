import SubscriberModel from "./subscriber.model";
import { TAddSubscriberSchema } from "./subscriberSchema";

class SubscriberService {
  async add(payload: TAddSubscriberSchema) {
    const subscriber = SubscriberModel.findOne({ email: payload.email });
    if (!subscriber) {
      await SubscriberModel.create(payload);
    }
  }

  async getAll() {
    return SubscriberModel.find();
  }
}

export default new SubscriberService();
