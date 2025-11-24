import { Request, Response } from "express";
import { validateZod } from "../../utils/validationHandler";
import subscriberService from "./subscriber.service";
import { addSubscriberSchema } from "./subscriberSchema";

class SubscriberController {
  async addSubscriber(req: Request, res: Response) {
    const validationResult = validateZod(addSubscriberSchema, req.body);
    const result = await subscriberService.add(validationResult);
    res.status(201).json({ data: result, message: "success" });
  }
  async getAllSubscriber(req: Request, res: Response) {
    const result = await subscriberService.getAll();
    res.status(200).json({ data: result, message: "success" });
  }
}

export const subscriberController = new SubscriberController();
