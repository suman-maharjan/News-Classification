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

const SubscriberModel =
  (mongoose.models.Subscriber as mongoose.Model<SubscriberType>) ||
  mongoose.model("Subscriber", subscriberSchema);

export default SubscriberModel;
