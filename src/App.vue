<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

const cms = ref<HeaderFooter | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);
onMounted(async () => {
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_HEADER_FOOTER,
        });
        cms.value = response.data.data.page.headerFooter;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <the-header :cms="cms?.header" />
    <RouterView />
    <the-footer :cms="cms?.footer" />
</template>
