<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import axios from 'axios';
interface ImageNode {
    id: string;
    sourceUrl: string;
    altText: string;
}

interface Frame1Data {
    image: {
        node: ImageNode;
    };
    title: string;
    description: string;
}

interface AboutUsData {
    frame1: Frame1Data;
}

const GET_ABOUT = `
    query getAbout {
        page(id: "about-us", idType: URI) {
            id
            title
            slug
            ... on WithAcfAboutUs {
                aboutUs {
                    frame1 {
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
                }
            }
        }
    }
`;

const cms = useStorage<AboutUsData | null>('aboutPageData', null);
const loading = ref(true);
const error = ref<Error | null>(null);
onMounted(() => {
    // Check cache first
    if (cms.value) {
        loading.value = false; // Data from cache, not loading initially
    } else {
        loading.value = true; // No cache, initial load state
    }

    // Define the fetch function
    const fetchAboutData = async () => {
        const initialLoad = loading.value; // Check if this is the very first load
        error.value = null; // Clear previous errors

        try {
            const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
                query: GET_ABOUT,
            });

            if (response.data.data?.page?.aboutUs) {
                cms.value = response.data.data.page.aboutUs; // Update storage/ref
            } else {
                console.warn('About Us data not found or unexpected structure:', response.data);
                // Keep potentially stale cms.value if fetch fails
            }

            // Handle GraphQL errors if they exist
            if (response.data.errors) {
                console.error('GraphQL errors fetching About Us:', response.data.errors);
                if (!error.value) {
                    // Don't overwrite specific errors like 'not found'
                    error.value = new Error(
                        response.data.errors.map((e: any) => e.message).join(', '),
                    );
                }
            }
        } catch (err) {
            console.error('Error fetching About Us data:', err);
            if (!error.value) {
                // Don't overwrite specific errors
                error.value = err as Error;
            }
            // Keep potentially stale data in storage
        } finally {
            // Only set loading to false if it was the initial load
            if (initialLoad) {
                loading.value = false;
            }
        }
    };

    // Trigger the fetch in the background
    fetchAboutData();
});
</script>
<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div v-if="loading" class="flex justify-center items-center min-h-screen">Loading...</div>
        <div v-else-if="error" class="flex justify-center items-center min-h-screen text-red-500">
            Error loading content: {{ error.message }}
        </div>
        <div v-else-if="cms">
            <!-- Main Content -->
            <div class="max-w-6xl mx-auto px-4 py-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <!-- Image Side -->
                    <div class="rounded-lg overflow-hidden shadow-xl">
                        <img
                            :src="cms.frame1.image.node.sourceUrl"
                            :alt="cms.frame1.image.node.altText"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Content Side -->
                    <div>
                        <h2 class="text-3xl font-bold mb-6 text-gray-900">
                            {{ cms.frame1.title }}
                        </h2>

                        <div class="space-y-4 text-gray-800">
                            <div class="leading-relaxed" v-html="cms.frame1.description"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Close v-else-if="cms" -->
    </div>
</template>
