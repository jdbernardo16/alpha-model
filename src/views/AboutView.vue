<script lang="ts" setup>
import { ref, onMounted } from 'vue';
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

const cms = ref<AboutUsData | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);
onMounted(async () => {
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_ABOUT,
        });
        cms.value = response.data.data.page.aboutUs;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
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
