<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { HomePageData } from '../types';

const GET_HOME = `
    query getHome {
        page(id: "home", idType: URI) {
            id
            title
            slug
            ... on WithAcfHomepage {
                homepage {
                    frame1 {
                        header
                        description
                        buttonText
                        buttonLink
                        image {
                            node {
                                id
                                sourceUrl
                                srcSet
                                altText
                            }
                        }
                    }
                }
            }
        }
    }
`;

const result = ref<HomePageData | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

onMounted(async () => {
    try {
        const response = await axios.post('https://admin-aamm.uatproject.website/graphql', {
            query: GET_HOME,
        });
        result.value = response.data.data as HomePageData;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section
        class="relative min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden"
    >
        <div class="container mx-auto px-4 py-20 lg:py-32">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
                <div class="space-y-6 lg:space-y-8 z-10">
                    <h1
                        class="text-5xl lg:text-7xl font-serif text-white leading-tight min-h-[3rem]"
                    >
                        <template v-if="loading">Loading...</template>
                        <template v-else>{{ result?.page?.homepage?.frame1?.header }}</template>
                    </h1>
                    <p class="text-lg lg:text-xl text-neutral-300 max-w-xl min-h-[2rem]">
                        <template v-if="loading">Loading...</template>
                        <template v-else>{{
                            result?.page?.homepage?.frame1?.description
                        }}</template>
                    </p>
                    <div class="flex items-center gap-6 pt-4">
                        <Button
                            size="lg"
                            class="bg-[#E91E63] hover:bg-[#D81B60] text-white rounded-full px-8"
                            :href="result?.page?.homepage?.frame1?.buttonLink"
                            v-if="!loading"
                        >
                            {{ result?.page?.homepage?.frame1?.buttonText }}
                        </Button>
                    </div>
                </div>

                <div class="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full">
                    <div class="relative h-[500px] lg:h-full w-full">
                        <div
                            class="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] h-[120%] bg-[#E91E63] rounded-l-full"
                        />
                        <img
                            loading="eager"
                            :src="result?.page?.homepage?.frame1?.image?.node?.sourceUrl"
                            :srcset="result?.page?.homepage?.frame1?.image?.node?.srcSet"
                            :alt="result?.page?.homepage?.frame1?.image?.node?.altText"
                            class="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full object-cover rounded-l-full"
                            v-if="!loading"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
