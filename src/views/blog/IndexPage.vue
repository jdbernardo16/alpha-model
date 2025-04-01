<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import type { Post } from '@/types'; // Assuming a Post type exists or needs creation

// GraphQL Query
const GET_BLOGS = `
    query getBlogs {
        posts {
            nodes {
                title # Top-level title (might differ from blog.blogContent.title)
                slug
                ... on WithAcfBlog {
                    blog {
                        blogContent {
                            thumbnail {
                                node {
                                    sourceUrl
                                    altText
                                    id
                                }
                            }
                            title # Nested title within blog content
                            teaser
                            publishedDate
                            author
                            category
                            content # Full content (might not be needed for index page)
                        }
                        isFeatured
                    }
                }
            }
        }
    }
`;

const allPosts = ref<Post[]>([]); // Initialize with empty array
const loading = ref(true);
const error = ref<Error | null>(null);

onMounted(async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_BLOGS,
        });

        if (response.data.data?.posts?.nodes) {
            // Filter out posts that don't have the necessary ACF blog data
            allPosts.value = response.data.data.posts.nodes.filter(
                (node: any) => node.blog?.blogContent,
            );
        } else {
            console.warn('No blog posts found or unexpected data structure:', response.data);
            allPosts.value = []; // Set to empty array if no data
        }
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        error.value = err as Error;
        allPosts.value = []; // Clear posts on error
    } finally {
        loading.value = false;
    }
});

// Pagination
const postsPerPage = 6;
const currentPage = ref(1);
// Calculate total pages based on non-featured posts
const totalPages = computed(() => {
    const nonFeaturedCount = allPosts.value.filter((post: any) => !post.blog?.isFeatured).length;
    return Math.ceil(nonFeaturedCount / postsPerPage);
});

// Featured post is the one marked with isFeatured = true
const featuredPost = computed(() => {
    // Find the first post where blog.isFeatured is true
    return allPosts.value.find((post: any) => post.blog?.isFeatured) || null;
});

// Posts for the current page, excluding the featured post, sorted by date
const posts = computed(() => {
    const nonFeatured = allPosts.value
        .filter((post: any) => !post.blog?.isFeatured)
        // Sort by publishedDate descending (newest first)
        .sort(
            (a: any, b: any) =>
                new Date(b.blog.blogContent.publishedDate).getTime() -
                new Date(a.blog.blogContent.publishedDate).getTime(),
        );

    const startIndex = (currentPage.value - 1) * postsPerPage;
    return nonFeatured.slice(startIndex, startIndex + postsPerPage);
});

// Change page
const changePage = (page: number) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Format date
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
<template>
    <div class="max-w-7xl mx-auto px-4 py-12 lg:min-h-screen">
        <!-- Loading State -->
        <div
            v-if="loading"
            class="text-center py-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <p>Loading blog posts...</p>
            <!-- Optional: Add a spinner animation -->
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16 text-red-600">
            <p>Failed to load blog posts. Please try again later.</p>
            <p class="text-sm text-gray-500 mt-2">{{ error.message }}</p>
        </div>

        <!-- Content Display -->
        <div v-else>
            <!-- Blog Header -->
            <div class="mb-16">
                <h1 class="text-4xl font-light uppercase mb-6 tracking-wide">BLOG</h1>
                <div class="w-24 h-0.5 bg-black"></div>
            </div>

            <!-- Featured Post -->
            <div v-if="featuredPost && featuredPost.blog?.blogContent" class="mb-20">
                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="lg:w-2/3 relative overflow-hidden group">
                        <router-link
                            :to="`/blogs/${featuredPost.slug}`"
                            class="block aspect-w-1 aspect-h-1 overflow-hidden"
                        >
                            <img
                                v-if="featuredPost.blog?.blogContent?.thumbnail?.node?.sourceUrl"
                                :src="featuredPost.blog.blogContent.thumbnail.node.sourceUrl"
                                :alt="
                                    featuredPost.blog?.blogContent?.thumbnail?.node?.altText ||
                                    featuredPost.blog?.blogContent?.title
                                "
                                class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                v-else
                                class="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500"
                            >
                                No Image Available
                            </div>
                        </router-link>
                        <div
                            class="absolute top-4 left-4 bg-black text-white text-xs uppercase tracking-widest py-1 px-3"
                        >
                            Featured
                        </div>
                    </div>
                    <div class="lg:w-1/3 flex flex-col justify-center">
                        <div class="text-sm text-gray-500 uppercase tracking-wider mb-3">
                            {{ formatDate(featuredPost.blog.blogContent.publishedDate) }}
                        </div>
                        <h2 class="text-3xl font-light mb-4">
                            {{ featuredPost.blog?.blogContent?.title || featuredPost.title }}
                        </h2>
                        <p
                            v-if="featuredPost.blog?.blogContent?.teaser"
                            class="text-gray-700 mb-6 line-clamp-4"
                        >
                            {{ featuredPost.blog.blogContent.teaser }}
                        </p>
                        <router-link
                            :to="`/blogs/${featuredPost.slug}`"
                            class="inline-flex items-center text-black border-b border-black pb-1 hover:text-gray-700 hover:border-gray-700 transition-colors"
                        >
                            Read More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Blog Post Grid -->
            <div
                v-if="posts.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
            >
                <div v-for="post in posts" :key="post.slug" class="group">
                    <div class="overflow-hidden mb-4">
                        <router-link
                            :to="`/blogs/${post.slug}`"
                            class="block aspect-w-1 aspect-h-1 overflow-hidden w-full"
                        >
                            <img
                                v-if="post.blog?.blogContent?.thumbnail?.node?.sourceUrl"
                                :src="post.blog.blogContent.thumbnail.node.sourceUrl"
                                :alt="
                                    post.blog?.blogContent?.thumbnail?.node?.altText ||
                                    post.blog?.blogContent?.title
                                "
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div
                                v-else
                                class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
                            >
                                No Image Available
                            </div>
                        </router-link>
                    </div>
                    <div
                        v-if="post.blog?.blogContent?.publishedDate"
                        class="text-sm text-gray-500 uppercase tracking-wider mb-2"
                    >
                        {{ formatDate(post.blog.blogContent.publishedDate) }}
                    </div>
                    <h3
                        class="text-xl font-medium mb-3 group-hover:text-gray-700 transition-colors"
                    >
                        <router-link :to="`/blogs/${post.slug}`">
                            {{ post.blog?.blogContent?.title || post.title }}
                        </router-link>
                    </h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">
                        {{ post.blog?.blogContent?.teaser }}
                    </p>
                    <router-link
                        :to="`/blogs/${post.slug}`"
                        class="inline-flex items-center text-black text-sm border-b border-black pb-0.5 hover:text-gray-700 hover:border-gray-700 transition-colors"
                    >
                        Continue Reading
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </router-link>
                </div>
            </div>
            <div v-else class="text-center text-gray-500 mb-16">No blog posts available.</div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-12">
                <!-- Previous Button (Optional) -->
                <!-- <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 border border-gray-300 disabled:opacity-50"
                > Prev </button> -->

                <button
                    v-for="page in totalPages"
                    :key="page"
                    class="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                    :class="{ 'bg-black text-white': currentPage === page }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </button>

                <!-- Next Button (Optional) -->
                <!-- <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 border border-gray-300 disabled:opacity-50"
                > Next </button> -->
            </div>
        </div>
        <!-- End Content Display -->
    </div>
</template>
