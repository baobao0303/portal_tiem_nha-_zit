export interface CategoryBO {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  thumbnail?: string;
  isActive: boolean;
}
