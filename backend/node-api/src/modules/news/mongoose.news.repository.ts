import NewsModel, { NewsDocument } from "./news.model";
import { News, PaginationParams } from "./news.type";
import { NewsCreateSchemaType } from "./newsSchema";

export class MongooseNewsRepository {
  private toDomain(doc: NewsDocument): News {
    if (!doc._id) return null;
    return {
      id: doc._id.toString(),
      title: doc?.title,
      author: doc?.author,
      image: doc?.image,
      description: doc?.description,
      category: doc?.category,
      content: doc?.content,
      publishedAt: doc.publishedAt,
      type: doc.type,
      place: doc.place,
    };
  }

  async newsIdExists(id: string): Promise<boolean> {
    const exists = await NewsModel.exists({ _id: id });
    return !!exists;
  }
  async getNewsById(id: string): Promise<News | null> {
    const news = await NewsModel.findOne({ _id: id });
    return this.toDomain(news);
  }

  async findAll(params: PaginationParams) {
    const {
      page = 1,
      limit = 20,
      sortBy = "publishedAt",
      sortOrder = "desc",
      filters = {},
      search,
    } = params;
    const validPage = Math.max(1, Number(page));
    const validLimit = Math.min(Number(limit), 100);
    const skip = (validPage - 1) * validLimit;

    const query = { ...filters };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    const sortObject = {
      [sortBy]: sortOrder === "desc" ? -1 : 1,
      _id: -1,
    } as any;

    const [data, total] = await Promise.all([
      NewsModel.find(query)
        .sort(sortObject)
        .skip(skip)
        .limit(validLimit)
        .select("-__v")
        .lean(),
      NewsModel.countDocuments(query),
    ]);
    return {
      data,
      total,
      page: validPage,
      limit: validLimit,
    };
  }
  async create(payload: NewsCreateSchemaType): Promise<News | null> {
    const news = await NewsModel.create(payload);
    return this.toDomain(news);
  }
  async update(id: string, payload: any) {
    const result = await NewsModel.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true },
    );
    return result;
  }
  async delete(id: string) {
    const result = await NewsModel.findOneAndDelete({ _id: id });
    return result;
  }
}
