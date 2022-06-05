import { Category } from './category'

export interface Blog {
  id: string;
  title: string;
  publishedAt: string;
  category: Category;
  body: string;
}
