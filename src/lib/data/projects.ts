export type IProject = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  date: string;
  category: string;
};

export const projects: IProject[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.",
    longDescription: `
      <h2>Project Overview</h2>
      <p>This e-commerce platform is a comprehensive solution for online retail businesses. Built with modern web technologies, it provides a seamless shopping experience for customers and powerful management tools for administrators.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Product catalog with advanced search and filtering</li>
        <li>Shopping cart with real-time updates</li>
        <li>Secure payment processing with Stripe integration</li>
        <li>User authentication and profile management</li>
        <li>Order tracking and history</li>
        <li>Admin dashboard for inventory and order management</li>
        <li>Responsive design for all devices</li>
        <li>SEO optimized product pages</li>
      </ul>
      
      <h2>Technical Implementation</h2>
      <p>The platform leverages Next.js for server-side rendering and optimal performance. The backend is powered by Supabase, providing real-time database updates and secure authentication. Payment processing is handled through Stripe's robust API.</p>
      
      <h2>Challenges & Solutions</h2>
      <p>One of the main challenges was implementing real-time inventory updates across multiple users. This was solved using Supabase's real-time subscriptions, ensuring accurate stock levels at all times.</p>
      
      <h2>Results</h2>
      <p>The platform has successfully handled thousands of transactions with a 99.9% uptime. Page load times average under 2 seconds, and the conversion rate improved by 35% compared to the previous solution.</p>
    `,
    image:
      "https://ik.imagekit.io/zzot6yvyh/portofolio/ecommerce.jpg?updatedAt=1759605616194",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Tailwind CSS",
    ],
    github: "#",
    live: "#",
    date: "2024-01",
    category: "Full-Stack",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates and team features.",
    longDescription: `
      <h2>Project Overview</h2>
      <p>A powerful task management application designed for teams to collaborate effectively. Built with real-time capabilities to ensure all team members stay in sync.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Real-time task updates across all connected clients</li>
        <li>Project boards with customizable columns</li>
        <li>Task assignments and due dates</li>
        <li>Team collaboration with comments and mentions</li>
        <li>File attachments and task descriptions</li>
        <li>Activity timeline and notifications</li>
        <li>Dark/light mode support</li>
        <li>Mobile-responsive interface</li>
      </ul>
      
      <h2>Technical Implementation</h2>
      <p>Built with React and TypeScript for type safety and maintainability. Uses Supabase for real-time data synchronization and authentication. State management is handled with Jotai for optimal performance.</p>
      
      <h2>Challenges & Solutions</h2>
      <p>Managing complex state with real-time updates required careful architecture. Implemented optimistic updates with rollback capabilities to ensure a smooth user experience even with network latency.</p>
      
      <h2>Results</h2>
      <p>The application supports hundreds of concurrent users with sub-second update propagation. User satisfaction scores increased by 45% after migration from the legacy system.</p>
    `,
    image:
      "https://ik.imagekit.io/zzot6yvyh/portofolio/dashboard.jpg?updatedAt=1759605616411",
    technologies: ["React", "TypeScript", "Supabase", "Jotai", "shadcn/ui"],
    github: "#",
    live: "#",
    date: "2023-12",
    category: "Web App",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "Real-time weather dashboard with forecasts, maps, and weather alerts.",
    longDescription: `
      <h2>Project Overview</h2>
      <p>An intuitive weather dashboard that provides comprehensive weather information with beautiful visualizations and real-time updates.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Current weather conditions with detailed metrics</li>
        <li>7-day weather forecast with hourly breakdowns</li>
        <li>Interactive weather maps</li>
        <li>Severe weather alerts and notifications</li>
        <li>Location search with autocomplete</li>
        <li>Favorite locations management</li>
        <li>Weather history and trends</li>
        <li>Customizable units (metric/imperial)</li>
      </ul>
      
      <h2>Technical Implementation</h2>
      <p>Integrates with multiple weather APIs to provide accurate and comprehensive data. Uses React Query for efficient data fetching and caching. Charts are rendered using Recharts for smooth animations and responsive design.</p>
      
      <h2>Challenges & Solutions</h2>
      <p>Handling rate limits from weather APIs required implementing intelligent caching strategies and request batching. Background updates ensure fresh data without exceeding API limits.</p>
      
      <h2>Results</h2>
      <p>The dashboard serves weather data to thousands of users daily with 99.5% accuracy. Average session duration is 5+ minutes, indicating high user engagement.</p>
    `,
    image:
      "https://ik.imagekit.io/zzot6yvyh/portofolio/weather-app.jpg?updatedAt=1759605616386",
    technologies: [
      "React",
      "TypeScript",
      "Recharts",
      "OpenWeather API",
      "Tailwind CSS",
    ],
    github: "#",
    live: "#",
    date: "2023-11",
    category: "Dashboard",
  },
];
