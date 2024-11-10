export enum NewsTypeEnum {
  Default = "Default",
  Probability = "Probability",
}

export interface ClassifyNewsI {
  news: string;
  type: NewsTypeEnum;
}
