import { EventEmitter } from "events";

// Creating a singleton EventEmitter instance to share across modules
export const eventEmitter = new EventEmitter();
