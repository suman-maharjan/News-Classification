import mongoose, { Schema } from "mongoose";

export interface SubscriberType extends Document {
  email: string;
}

const subscriberSchema: Schema<SubscriberType> = new Schema({
  email: {
    type: String,
    required: true,
  },
});

const SubscriberModel: mongoose.Model<SubscriberType> =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default SubscriberModel;
