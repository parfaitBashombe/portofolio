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

export const blogPosts: IPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, best practices for component organization, and maintainable code patterns.",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful planning and adherence to best practices. In this post, we'll explore how TypeScript can help create more maintainable and robust applications.</p>
      
      <h2>Project Structure</h2>
      <p>A well-organized project structure is crucial for scalability. Here's a recommended approach:</p>
      <ul>
        <li>Separate concerns with clear folder structures</li>
        <li>Use feature-based organization for larger projects</li>
        <li>Keep components small and focused</li>
        <li>Implement proper type definitions</li>
      </ul>
      
      <h2>TypeScript Benefits</h2>
      <p>TypeScript provides several advantages for React development:</p>
      <ul>
        <li>Type safety and better IDE support</li>
        <li>Catch errors during development</li>
        <li>Improved code documentation</li>
        <li>Better refactoring capabilities</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices to build scalable applications:</p>
      <ul>
        <li>Use custom hooks for reusable logic</li>
        <li>Implement proper error boundaries</li>
        <li>Optimize performance with React.memo and useMemo</li>
        <li>Write comprehensive tests</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications with TypeScript requires discipline and following established patterns. By implementing these practices, you'll create applications that are easier to maintain and extend.</p>
    `,
    date: "2024-01-15",
    readTime: "8 min read",
    category: "React",
    slug: "building-scalable-react-applications",
    tags: ["React", "TypeScript", "Architecture", "Best Practices"],
  },
  {
    id: "2",
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt:
      "Exploring upcoming trends in web development, from AI integration to new frameworks and tools that will shape the future of the web.",
    content: `
      <h2>Introduction</h2>
      <p>The web development landscape is constantly evolving. Let's explore the trends that are shaping the future of web development in 2024 and beyond.</p>
      
      <h2>AI Integration</h2>
      <p>Artificial Intelligence is becoming increasingly integrated into web applications:</p>
      <ul>
        <li>AI-powered code completion and generation</li>
        <li>Intelligent chatbots and customer service</li>
        <li>Personalized user experiences</li>
        <li>Automated testing and optimization</li>
      </ul>
      
      <h2>Modern Frameworks</h2>
      <p>New frameworks and tools are emerging to make development more efficient:</p>
      <ul>
        <li>Server Components for better performance</li>
        <li>Edge computing and distributed systems</li>
        <li>Improved developer experience</li>
        <li>Better integration with cloud services</li>
      </ul>
      
      <h2>Performance and Accessibility</h2>
      <p>The focus on performance and accessibility continues to grow:</p>
      <ul>
        <li>Core Web Vitals optimization</li>
        <li>Progressive Web Apps (PWAs)</li>
        <li>Inclusive design practices</li>
        <li>Mobile-first approach</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting, with AI integration, modern frameworks, and a continued focus on performance and accessibility leading the way.</p>
    `,
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Trends",
    slug: "future-of-web-development-2024",
    tags: ["Web Development", "Trends", "AI", "Future"],
  },
  {
    id: "3",
    title: "Optimizing Web Performance: A Complete Guide",
    excerpt:
      "Comprehensive guide to web performance optimization, covering everything from image optimization to code splitting and caching strategies.",
    content: `
      <h2>Introduction</h2>
      <p>Web performance is crucial for user experience and SEO. This guide covers essential optimization techniques to make your websites faster.</p>
      
      <h2>Image Optimization</h2>
      <p>Images often account for most of a page's weight. Here's how to optimize them:</p>
      <ul>
        <li>Use modern formats like WebP and AVIF</li>
        <li>Implement lazy loading</li>
        <li>Serve responsive images</li>
        <li>Compress images without losing quality</li>
      </ul>
      
      <h2>Code Splitting</h2>
      <p>Break down your JavaScript bundles for better performance:</p>
      <ul>
        <li>Route-based code splitting</li>
        <li>Component-level splitting</li>
        <li>Dynamic imports</li>
        <li>Tree shaking to remove unused code</li>
      </ul>
      
      <h2>Caching Strategies</h2>
      <p>Implement effective caching to reduce server load:</p>
      <ul>
        <li>Browser caching with proper headers</li>
        <li>Service workers for offline functionality</li>
        <li>CDN caching for static assets</li>
        <li>Database query caching</li>
      </ul>
      
      <h2>Performance Monitoring</h2>
      <p>Continuously monitor and improve performance:</p>
      <ul>
        <li>Use Lighthouse for audits</li>
        <li>Monitor Core Web Vitals</li>
        <li>Set up real user monitoring</li>
        <li>Regular performance testing</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Web performance optimization is an ongoing process. By implementing these strategies, you'll create faster, more efficient websites that provide better user experiences.</p>
    `,
    date: "2024-01-01",
    readTime: "12 min read",
    category: "Performance",
    slug: "optimizing-web-performance-guide",
    tags: ["Performance", "Optimization", "Web Development", "Best Practices"],
  },
];
