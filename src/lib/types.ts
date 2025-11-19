export type IProject = {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Optional for backward compatibility
  longdescription?: string; // Database field name
  image: string; // Legacy support
  main_image: string; // Main project image
  additional_images: string[]; // Additional images array
  technologies: string[];
  github: string;
  live: string;
  date: string;
  category: string;
  user_id?: string; // From database
};

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
