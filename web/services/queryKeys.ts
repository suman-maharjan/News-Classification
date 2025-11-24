export const key = {
  me: () => ["me"],

  news: {
    getAll: () => ["getAllNews"],
    getById: (id: string) => ["News_id", id],
  },

  subscriber: {
    getAll: () => ["getAllSubscribers"],
  },

  comment: {
    getComment: (newsId: string) => [`comment${newsId}`],
  },
};
