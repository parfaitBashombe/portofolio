export type IPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  tags: string[];
};

export type IProject = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  longDescription: string;
  longdescription: string;
  image: string;
  main_image: string;
  additional_images: string[];
  technologies: string[];
  github: string;
  live: string;
  date: string;
  category: string;
};

export type ISkill = {
  id: string;
  name: string;
  proficiency: number;
  icon?: string;
};

export type IContactInfo = {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  location?: string;
  resume_url?: string;
};

export type ISocialLink = {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  position?: number;
};

export type ICategory = {
  id: string;
  name: string;
  slug: string;
};

export type ITag = {
  id: string;
  name: string;
  slug: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};
