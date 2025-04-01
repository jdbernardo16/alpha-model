<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { HomePageData, Post } from '../types';
import HeroBanner from '../components/slider/HeroBanner.vue';
import NewsSlider from '../components/slider/NewsSlider.vue';
import ProjectForm from '../components/general/ProjectForm.vue';

const GET_HOME = `
    query getHome {
        page(id: "home", idType: URI) {
            id
            title
            slug
            ... on WithAcfHomepage {
                homepage {
                frame1 {
                        gallery {
                            nodes {
                                id
                                sourceUrl
                                srcSet
                                altText
                            }
                        }
                    }
                    frame2 {
                        image {
                            node {
                                id
                                sourceUrl
                                altText
                            }
                        }
                        title
                        description
                    }
                    frame3 {
                        title
                    }
                    frame4 {
                        title
                        description
                    }
                }
            }
        }
    }`;

// Query to get the latest 6 blog posts
const GET_LATEST_BLOGS = `
    query GetLatestBlogs {
        posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
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
                            title # Use nested title
                        }
                        # No need for isFeatured or full content here
                    }
                }
            }
        }
    }
`;

const cms = ref<HomePageData | null>(null);
const latestPosts = ref<Post[]>([]); // Ref for blog posts
const loading = ref(true); // Combined loading state for simplicity
const error = ref<Error | null>(null); // Combined error state

onMounted(async () => {
    loading.value = true;
    error.value = null;
    try {
        const [homeResponse, blogResponse] = await Promise.all([
            axios.post('https://admin.alphatalentmanagement.com/graphql', { query: GET_HOME }),
            axios.post('https://admin.alphatalentmanagement.com/graphql', {
                query: GET_LATEST_BLOGS,
            }),
        ]);

        // Log the raw homepage response for debugging
        console.log('Raw homeResponse:', JSON.stringify(homeResponse.data, null, 2));

        // Check for GraphQL errors specifically for the homepage query
        if (homeResponse.data.errors) {
            console.error('GraphQL errors in homeResponse:', homeResponse.data.errors);
            // Optionally set the main error ref if needed
            // error.value = new Error('Failed to fetch homepage data.');
        }

        // Process homepage data
        if (homeResponse.data.data?.page?.homepage) {
            cms.value = homeResponse.data.data.page.homepage as HomePageData;
            console.log('Processed cms data:', JSON.stringify(cms.value, null, 2));
        } else {
            console.warn(
                'Homepage data object (`page.homepage`) not found or unexpected structure in response:',
                homeResponse.data.data,
            );
            // Keep cms.value as null if data is not found at the expected path
        }

        // Process blog data
        if (blogResponse.data.data?.posts?.nodes) {
            // Filter out posts without necessary blog data (thumbnail and title)
            latestPosts.value = blogResponse.data.data.posts.nodes.filter(
                (post: any) =>
                    post.blog?.blogContent?.thumbnail?.node?.sourceUrl &&
                    (post.blog?.blogContent?.title || post.title),
            );
        } else {
            console.warn('Latest blog posts not found or unexpected structure:', blogResponse.data);
            latestPosts.value = [];
        }
    } catch (err) {
        console.error('Error fetching data for HomePage:', err);
        // Set a general error, but don't nullify data that might have been fetched successfully before the error.
        // Individual checks within the 'try' block already handle cases where data might be missing from a specific response.
        error.value = err as Error;
        // cms.value = null; // Avoid nullifying potentially successful fetches
        // latestPosts.value = []; // Avoid nullifying potentially successful fetches
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <!-- Hero Section -->
    <hero-banner :banner="cms?.frame1?.gallery?.nodes || []" />

    <section>
        <div class="max-w-[1440px] m-auto px-4 lg:px-20 py-10 lg:py-16">
            <p class="text-xl font-bold mb-6 lg:hidden block font-serif text-primary-gold">
                {{ cms?.frame2?.title }}
            </p>
            <div
                class="flex lg:flex-row flex-col items-center justify-between lg:space-x-20 lg:space-y-0 space-y-10"
            >
                <div class="w-full lg:w-1/2">
                    <div class="aspect-w-1 aspect-h-1 overflow-hidden">
                        <img
                            v-if="cms?.frame2?.image?.node"
                            class="w-full object-cover"
                            :src="cms?.frame2?.image?.node?.sourceUrl"
                            :alt="cms?.frame2?.image?.node?.altText"
                        />
                    </div>
                </div>
                <div class="w-full lg:w-1/2">
                    <div class="mb-6">
                        <p
                            class="text-xl font-bold mb-3 lg:block hidden font-serif text-primary-gold"
                        >
                            {{ cms?.frame2?.title }}
                        </p>
                    </div>
                    <div>
                        <div
                            class="wysiwyg whitespace-pre-wrap"
                            v-html="cms?.frame2?.description"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <news-slider :cms="cms?.frame3" :posts="latestPosts" />

    <ProjectForm :cms="cms?.frame4" />
</template>
