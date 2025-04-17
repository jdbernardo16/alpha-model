<template>
    <div class="max-w-4xl mx-auto px-4 py-12 relative">
        <!-- Back to blog link -->
        <div class="mb-8">
            <a
                href="#"
                @click.prevent="goBack"
                class="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Go Back
            </a>
        </div>

        <!-- Loading State -->
        <div
            v-if="loading"
            class="text-center py-16 min-h-screen bg-white grid place-content-center fixed top-0 left-0 w-full"
        >
            <p>Loading post...</p>
            <!-- Optional: Add a spinner -->
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16 text-red-600">
            <p>Failed to load post. It might not exist or there was a network issue.</p>
            <p class="text-sm text-gray-500 mt-2">{{ error.message }}</p>
        </div>

        <!-- Post Content Display -->
        <div v-else-if="post">
            <!-- Blog Post Header -->
            <div class="mb-8">
                <div
                    v-if="post.blog?.blogContent?.publishedDate || post.blog?.blogContent?.category"
                    class="text-sm text-gray-500 uppercase tracking-wider mb-3"
                >
                    <span v-if="post.blog?.blogContent?.publishedDate">
                        {{ formatDate(post.blog.blogContent.publishedDate) }}
                    </span>
                    <span v-if="post.blog?.blogContent?.category">
                        • {{ post.blog.blogContent.category }}
                    </span>
                </div>
                <h1 class="text-4xl font-light mb-6">
                    {{ post.blog?.blogContent?.title || post.title }}
                </h1>
                <div v-if="post.blog?.blogContent?.author" class="flex items-center">
                    <!-- Author image removed as it's not in the query -->
                    <span class="text-sm">By {{ post.blog.blogContent.author }}</span>
                </div>
            </div>

            <!-- Featured Image -->
            <div v-if="post.blog?.blogContent?.thumbnail?.node?.sourceUrl" class="mb-10">
                <img
                    :src="post.blog.blogContent.thumbnail.node.sourceUrl"
                    :alt="
                        post.blog.blogContent.thumbnail?.node?.altText ||
                        post.blog.blogContent.title ||
                        post.title
                    "
                    class="w-full h-auto object-cover"
                />
            </div>

            <!-- Blog Content -->
            <div
                v-if="post.blog?.blogContent?.content"
                class="prose prose-lg max-w-none mb-12 wysiwyg"
                v-html="post.blog.blogContent.content"
            ></div>
            <div v-else class="mb-12 text-gray-500">Content is not available for this post.</div>

            <!-- Share Section -->
            <div class="border-t border-b border-gray-200 py-6 mb-12">
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-700">Share this article</div>
                    <div class="flex space-x-4">
                        <a
                            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.blog?.blogContent?.title || post.title || 'Check out this post')}`"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                />
                            </svg>
                        </a>
                        <a
                            :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.blog?.blogContent?.title || post.title || 'Check out this post')}`"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-500 hover:text-blue-800 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                />
                            </svg>
                        </a>
                        <a
                            :href="`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(post.blog?.blogContent?.title || post.title || 'Check out this post')}`"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <!-- Related Posts Section Removed - Needs dynamic implementation -->
        </div>
        <!-- Closes v-else-if="post" -->
        <div v-else class="text-center py-16 text-gray-500">
            <!-- v-else immediately follows -->
            The requested blog post could not be found.
        </div>
    </div>
    <!-- Closes the main wrapper -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';
import axios from 'axios';
import type { Post } from '@/types';

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);

const post = ref<Post | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

// URL computation that's safe for SSR
const currentUrl = computed(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
});

// Base URL for absolute URLs (important for OG tags)
const baseUrl = computed(() => {
    if (typeof window === 'undefined') return 'https://alphatalentmanagement.com';
    return window.location.origin;
});

// GraphQL Query remains the same
const GET_BLOG_BY_SLUG = `
    query GetBlogBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            title
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
                        title
                        teaser
                        publishedDate
                        author
                        category
                        content
                    }
                    isFeatured
                }
            }
        }
    }
`;

// Format date
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Fetch post function - separated for better organization
const fetchPost = async (currentSlug: string) => {
    if (!currentSlug) {
        error.value = new Error('Blog slug is missing or invalid.');
        loading.value = false;
        post.value = null;
        return;
    }

    loading.value = true;
    error.value = null;

    const storageKey = `blogData_${currentSlug}`;

    // Try loading from cache first
    try {
        const cachedData = localStorage.getItem(storageKey);
        if (cachedData) {
            post.value = JSON.parse(cachedData);
            loading.value = false;
            console.log(`Loaded blog post ${currentSlug} from cache.`);
            updateMetaTags(); // Important! Ensure metadata updates even with cached data
        }
    } catch (e) {
        console.error(`Failed to parse cached blog data for ${currentSlug}:`, e);
        localStorage.removeItem(storageKey);
    }

    // Always fetch fresh data
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_BLOG_BY_SLUG,
            variables: { slug: currentSlug },
        });

        const freshData = response.data.data?.post;

        if (freshData?.blog?.blogContent) {
            post.value = freshData;
            try {
                localStorage.setItem(storageKey, JSON.stringify(freshData));
            } catch (e) {
                console.error(`Failed to cache blog data for ${currentSlug}:`, e);
            }
            error.value = null;
            updateMetaTags(); // Update metadata with fresh data
        } else if (freshData) {
            console.warn('Post found, but missing ACF blog data:', freshData);
            error.value = new Error('Post data is incomplete.');
            if (!post.value) loading.value = false;
        } else {
            console.warn('Post not found:', response.data);
            error.value = new Error('Post not found.');
            if (!post.value) loading.value = false;
        }

        if (response.data.errors) {
            console.error('GraphQL errors:', response.data.errors);
            if (!error.value) {
                error.value = new Error(response.data.errors.map((e: any) => e.message).join(', '));
            }
        }
    } catch (err: any) {
        console.error(`Error fetching blog post ${currentSlug}:`, err);
        error.value = err;
    } finally {
        loading.value = false;
    }
};

// Update meta tags - separated for better organization and explicit calling
const updateMetaTags = () => {
    if (!post.value) {
        // Default metadata for when no post is loaded
        useHead({
            title: 'Blog Post - Alpha Talent Management',
            meta: [
                {
                    name: 'description',
                    content: 'Read articles and news from Alpha Talent Management.',
                },
                // Reset OG and Twitter tags to defaults
                { property: 'og:title', content: 'Alpha Talent Management Blog' },
                {
                    property: 'og:description',
                    content: 'Read articles and news from Alpha Talent Management.',
                },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: currentUrl.value },
                { property: 'og:image', content: `${baseUrl.value}/images/AATM_logo.png` },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: 'Alpha Talent Management Blog' },
                {
                    name: 'twitter:description',
                    content: 'Read articles and news from Alpha Talent Management.',
                },
                { name: 'twitter:image', content: `${baseUrl.value}/images/AATM_logo.png` },
            ],
            link: [{ rel: 'canonical', href: currentUrl.value }],
        });
        console.log('Set default meta tags');
        return;
    }

    const blogContent = post.value.blog?.blogContent;
    if (!blogContent) {
        console.warn('Post loaded but blogContent missing');
        return;
    }

    // Create page title
    const title = `${blogContent.title || post.value.title} - Alpha Talent Management Blog`;

    // Create description from teaser or content
    const description = blogContent.teaser
        ? blogContent.teaser.substring(0, 160) + (blogContent.teaser.length > 160 ? '...' : '')
        : blogContent.content
          ? blogContent.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...'
          : `Read the article "${blogContent.title || post.value.title}" on the Alpha Talent Management blog.`;

    // Get image URL, use fallback if needed
    const imageUrl =
        blogContent.thumbnail?.node?.sourceUrl || `${baseUrl.value}/images/AATM_logo.png`;

    // Set meta tags with explicit console logging
    console.log('Updating meta tags for:', title);
    useHead({
        title: title,
        meta: [
            { name: 'description', content: description },
            // Open Graph
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'article' },
            { property: 'og:url', content: currentUrl.value },
            { property: 'og:image', content: imageUrl },
            { property: 'article:published_time', content: blogContent.publishedDate || '' },
            { property: 'article:author', content: blogContent.author || '' },
            // Twitter Card
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: imageUrl },
        ],
        link: [{ rel: 'canonical', href: currentUrl.value }],
    });
    console.log('Meta tags updated successfully');
};

// Lifecycle hooks
onMounted(() => {
    fetchPost(slug.value);
});

// Watch for route changes
watch(slug, (newSlug) => {
    fetchPost(newSlug);
});

// Comment form
const commentForm = ref({
    name: '',
    email: '',
    comment: '',
});

// Submit comment
const submitComment = () => {
    console.log('Comment submitted:', commentForm.value);
    commentForm.value = { name: '', email: '', comment: '' };
    alert('Comment submitted successfully!');
};

// Go back function
const goBack = () => {
    router.go(-1);
};
</script>
