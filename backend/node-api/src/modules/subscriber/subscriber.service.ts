import { subscriberRepository } from "./subscriber.type";
import { TAddSubscriberSchema } from "./subscriberSchema";

class SubscriberService {
  async add(payload: TAddSubscriberSchema) {
    const exists = subscriberRepository.subscriberExists(payload.email);
    if (!exists) {
      await subscriberRepository.create(payload);
    }
  }

  async getAll() {
    return subscriberRepository.getAll();
  }
}

export default new SubscriberService();
