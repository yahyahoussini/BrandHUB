import type { BlogPost } from '../types';

// ============================================================================
// MOCK GEMINI API SERVICE
// ============================================================================
// This is a mock service that simulates calls to the Google Gemini API.
// In a real application, you would replace this with a call to the actual
// Gemini API client.
//
// To implement the real API:
// 1. Install the Google Gemini API client: `npm install @google/generative-ai`
// 2. Uncomment the commented-out code below.
// 3. Set your `GEMINI_API_KEY` in a `.env.local` file.
// ============================================================================

// --- Mock Implementation ---

const mockBlogPosts: BlogPost[] = [
  {
    id: 'post1',
    titleKey: 'The Future of 3D Web Design',
    summaryKey: 'Explore the latest trends and technologies shaping the future of immersive web experiences.',
    contentKey: 'The future of web design is three-dimensional. With the advent of technologies like WebGL, Three.js, and React Three Fiber, creating immersive, interactive 3D experiences in the browser has never been more accessible. These technologies are pushing the boundaries of what\'s possible on the web, allowing designers and developers to create everything from interactive product showcases to full-blown virtual worlds. As we move forward, we can expect to see even more websites that break the 2D plane and offer users a truly engaging and memorable experience.',
    authorKey: 'AI Author',
    dateKey: 'August 5, 2025',
    imageUrl: 'https://picsum.photos/seed/blog1/600/400',
  },
  {
    id: 'post2',
    titleKey: 'The Art of Interactive Storytelling',
    summaryKey: 'How to use 3D and animation to tell compelling stories that captivate your audience.',
    contentKey: 'Interactive storytelling is a powerful way to engage users and create a lasting impression. By combining 3D graphics, animation, and user interaction, you can create narratives that unfold in response to the user\'s actions. This creates a sense of agency and immersion that traditional, linear storytelling can\'t match. Whether you\'re building a marketing website, an educational tool, or a game, interactive storytelling can help you connect with your audience on a deeper level.',
    authorKey: 'AI Author',
    dateKey: 'August 4, 2025',
    imageUrl: 'https://picsum.photos/seed/blog2/600/400',
  },
  {
    id: 'post3',
    titleKey: 'Optimizing Performance in 3D Web Apps',
    summaryKey: 'Tips and tricks for ensuring your 3D websites run smoothly on all devices.',
    contentKey: 'While 3D web experiences can be incredibly powerful, they can also be demanding on system resources. Optimizing performance is crucial to ensure that your site is accessible and enjoyable for all users, regardless of their device. Some key optimization techniques include using low-poly models, compressing textures, implementing level of detail (LOD), and using efficient rendering techniques. By paying attention to performance, you can create stunning 3D websites that are also fast and responsive.',
    authorKey: 'AI Author',
    dateKey: 'August 3, 2025',
    imageUrl: 'https://picsum.photos/seed/blog3/600/400',
  },
];

export const generateBlogPosts = (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    // Simulate a network delay
    setTimeout(() => {
      resolve(mockBlogPosts);
    }, 1500);
  });
};


// --- Real Gemini API Implementation (Example) ---
/*
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Generate 3 short, engaging blog posts about the future of 3D web design and interactive experiences. For each post, provide a title, a short summary, a main content body, an author (e.g., 'AI Author'), and a date. Format the output as a JSON array of objects.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // The response from the AI will be a string, so you need to parse it as JSON.
    // This assumes the AI returns a valid JSON string.
    const posts = JSON.parse(text);

    // You might need to add image URLs manually or have another system for that.
    return posts.map((post, index) => ({
      ...post,
      id: `post${index + 1}`,
      imageUrl: `https://picsum.photos/seed/blog${index + 1}/600/400`,
    }));

  } catch (error) {
    console.error("Error generating blog posts from Gemini API:", error);
    // Return an empty array or handle the error as needed
    return [];
  }
};
*/
