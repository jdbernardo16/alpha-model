<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import type { HeaderFooter } from '@/types';
import { RouterView } from 'vue-router';
import TheHeader from '@/components/general/TheHeader.vue';
import TheFooter from '@/components/general/TheFooter.vue';
import axios from 'axios';
const GET_HEADER_FOOTER = `
    query getHeaderFooter {
        page(id: "header-footer", idType: URI) {
            id
            title
            slug
            ... on WithAcfHeaderFooter {
                headerFooter {
                    header {
                        logo {
                            node {
                                id
                                sourceUrl
                                altText
                            }
                        }
                    }
                    footer {
                        address
                        contactNumber
                        email
                        socialMedia {
                            icon {
                                node {
                                    id
                                    sourceUrl
                                    altText
                                }
                            }
                            link
                        }
                        footerCopyright
                    }
                }
            }
        }
    }`;

const cms = useStorage<HeaderFooter | null>('headerFooterData', null);
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
    const fetchHeaderFooter = async () => {
        const initialLoad = loading.value; // Check if this is the very first load
        try {
            const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
                query: GET_HEADER_FOOTER,
            });
            cms.value = response.data.data.page.headerFooter; // Update cache/ref
            error.value = null; // Clear previous errors on success
        } catch (err) {
            console.error('Failed to fetch header/footer:', err); // Log error
            error.value = err as Error;
            // Keep potentially stale cms.value
        } finally {
            // Only set loading to false in finally if it was the initial load
            if (initialLoad) {
                loading.value = false;
            }
        }
    };

    // Trigger the fetch in the background (don't await)
    fetchHeaderFooter();
});
</script>

<template>
    <the-header :cms="cms?.header" />
    <RouterView />
    <the-footer :cms="cms?.footer" />
</template>
