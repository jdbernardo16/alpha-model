<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
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
                        newsItem {
                            label
                            poster {
                                node {
                                    sourceUrl
                                    altText
                                    id
                                }
                            }
                        }
                    }
                    frame4 {
                        title
                        description
                    }
                }
            }
        }
    }`;

const cms = useStorage<HomePageData | null>('homePageData', null);
const loading = ref(true); // Combined loading state for simplicity
const error = ref<Error | null>(null); // Combined error state

onMounted(() => {
    // Check cache first - only set loading false if BOTH are cached
    if (cms.value) {
        loading.value = false; // Data from cache, not loading initially
    } else {
        loading.value = true; // No cache or partial cache, initial load state
    }

    // Define the fetch function
    const fetchHomePageData = async () => {
        const initialLoad = loading.value; // Check if this is the very first load
        error.value = null; // Clear previous errors before fetching

        try {
            const [homeResponse] = await Promise.all([
                axios.post('https://admin.alphatalentmanagement.com/graphql', { query: GET_HOME }),
            ]);

            // Log the raw homepage response for debugging
            // console.log('Raw homeResponse:', JSON.stringify(homeResponse.data, null, 2));

            // Check for GraphQL errors specifically for the homepage query
            if (homeResponse.data.errors) {
                console.error('GraphQL errors in homeResponse:', homeResponse.data.errors);
            }

            // Process homepage data
            if (homeResponse.data.data?.page?.homepage) {
                cms.value = homeResponse.data.data.page.homepage as HomePageData;
                // console.log('Processed cms data:', JSON.stringify(cms.value, null, 2));
            } else {
                console.warn(
                    'Homepage data object (`page.homepage`) not found or unexpected structure in response:',
                    homeResponse.data.data,
                );
                // Keep potentially stale cms.value if fetch fails partially
            }
        } catch (err) {
            console.error('Error fetching data for HomePage:', err);
            error.value = err as Error;
            // Keep potentially stale data in storage
        } finally {
            // Only set loading to false in finally if it was the initial load
            if (initialLoad) {
                loading.value = false;
            }
        }
    };

    // Trigger the fetch in the background (don't await)
    fetchHomePageData();
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

    <news-slider :cms="cms?.frame3" />

    <ProjectForm :cms="cms?.frame4" />
</template>
