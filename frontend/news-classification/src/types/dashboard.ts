export type TMessage = {
  input: string;
  response: string;
  algorithm: string;
  type: "success" | "error";
};
export type TAlgorithm = {
  id: string;
  value: string;
};

export type TNews = {
  news: string;
  algorithm: TAlgorithm;
};
