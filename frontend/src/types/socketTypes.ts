type TNewsResultSuccess = {
  message: "success";
  data: {
    algorithm: string;
    prediction: string;
  };
};

type TNewsResultError = {
  message: "error";
  error: "string";
};

export type TNewsResult = TNewsResultSuccess | TNewsResultError;

export interface TServerToClientEvents {
  "news:result": (data: TNewsResult) => void;
}

export interface TClientToServerEvents {
  "news:send": (data: { news: string; type: string }) => void;
}
