import { MetadataRoute } from "next";

// TypeScript interfaces based on OpenAPI specification
interface Chapter {
  chapterId: string;
  storyId: string;
  storyTitle: string;
  chapterTitle?: string;
  authorName: string;
  authorId: string;
  bodyText: string;
  previousChapter?: string;
  createDate: string;
  keywords: string[];
  likes: number;
  likedByUser?: boolean;
  bookmarkedByUser?: boolean;
}

interface User {
  userId: string;
  userName: string;
  email: string;
  bio: string;
  publishedChapters: Array<{
    storyId: string;
    chapterId: string;
    storyTitle: string;
    chapterTitle?: string;
    authorName: string;
    previousChapter?: string;
    keywords: string[];
    likes?: number;
  }>;
  // Note: createDate is not available in the user response from OpenAPI spec
  // Using current date as fallback for sitemap
}

/**
 * Dynamic Sitemap Generator for Quilted Chronicles
 *
 * This sitemap includes:
 * - Static routes (homepage, auth, info pages)
 * - Dynamic routes (chapters, profiles) - Fetched from database
 * - Chains are handled via individual chapter endpoints (no bulk endpoint available)
 *
 * IMPLEMENTATION NOTES:
 * - Uses real database queries via actual API endpoints from OpenAPI spec
 * - Implements pagination to fetch all available data (up to 10 pages per category)
 * - Graceful error handling for each API call
 * - Fallback to current date if no timestamp available
 * - Based on actual API structure from OpenAPI specification
 *
 * REQUIRED API ENDPOINTS (from OpenAPI spec):
 * - GET /user?page={n} (returns users with userName, userId, createDate)
 * - GET /chapter?page={n} (returns chapters with chapterId, storyId, createDate)
 * - GET /chain/{chapterId} (individual chain, not suitable for bulk sitemap)
 *
 * DATABASE FIELD MAPPING (from OpenAPI spec):
 * - Users: userName (for profile URLs), createDate
 * - Chapters: chapterId, createDate
 * - Chains: Not included (no bulk endpoint available)
 *
 * PAGINATION:
 * - Automatically fetches all pages until empty response or 10-page limit
 * - Prevents infinite loops while ensuring comprehensive coverage
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.quiltedchronicles.org";
  const currentDate = new Date();

  // Static routes with their priorities and change frequencies
  const staticRoutes = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },

    // Core functionality - high priority
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/createStory`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },

    // User authentication - medium priority
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },

    // Information pages - medium priority
    {
      url: `${baseUrl}/howitworks`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  try {
    // Fetch dynamic routes from your database via API
    const dynamicRoutes: MetadataRoute.Sitemap = [];

    // Fetch real chapters from your database using /chapter endpoint with pagination
    try {
      let page = 1;
      let hasMoreChapters = true;
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;

      while (hasMoreChapters && page <= 10) {
        // Limit to 10 pages to avoid infinite loops
        const chaptersResponse = await fetch(
          `${backendUrl}/chapter?page=${page}`
        );
        if (chaptersResponse.ok) {
          const chapters = await chaptersResponse.json();
          if (chapters.length === 0) {
            hasMoreChapters = false;
          } else {
            chapters.forEach((chapter: Chapter) => {
              dynamicRoutes.push({
                url: `${baseUrl}/chapter/${chapter.chapterId}`,
                lastModified: new Date(chapter.createDate || currentDate),
                changeFrequency: "weekly" as const,
                priority: 0.7,
              });
            });
            page++;
          }
        } else {
          hasMoreChapters = false;
        }
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }

    // Fetch real users from your database using /user endpoint with pagination
    try {
      let page = 1;
      let hasMoreUsers = true;
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;

      while (hasMoreUsers && page <= 10) {
        // Limit to 10 pages to avoid infinite loops
        const usersResponse = await fetch(`${backendUrl}/user?page=${page}`);
        if (usersResponse.ok) {
          const users = await usersResponse.json();
          if (users.length === 0) {
            hasMoreUsers = false;
          } else {
            users.forEach((user: User) => {
              dynamicRoutes.push({
                url: `${baseUrl}/profile/${user.userName}`,
                lastModified: currentDate, // Users don't have createDate in API response
                changeFrequency: "monthly" as const,
                priority: 0.5,
              });
            });
            page++;
          }
        } else {
          hasMoreUsers = false;
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    // Note: Chains are not included in bulk sitemap generation
    // because the API only provides individual chain endpoints (/chain/{chapterId})
    // Each chapter can be accessed via /chapter/{chapterId} which is already covered above

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return only static routes if dynamic routes fail
    return staticRoutes;
  }
}
