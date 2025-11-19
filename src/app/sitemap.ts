import { MetadataRoute } from 'next';
import { getRecentPosts } from '@/lib/api/blogs';
import { getProjects } from '@/lib/api/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://portofolio-beryl-psi.vercel.app';

  try {
    // Fetch all posts and projects
    const [posts, projects] = await Promise.all([
      getRecentPosts(),
      getProjects(),
    ]);

    // Generate blog post URLs
    const blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Generate project URLs
    const projectPages = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      lastModified: new Date(project.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      ...blogPosts,
      ...projectPages,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return basic sitemap if data fetching fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ];
  }
}
