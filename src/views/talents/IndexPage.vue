<template>
    <section>
        <div class="max-w-[1440px] m-auto p-4 md:p-10">
            <div class="p-4 md:p-10 shadow-2xl">
                <div
                    class="w-full overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-0"
                >
                    <!-- Image section -->
                    <div class="md:w-3/12 relative overflow-hidden h-fit w-full md:mr-8">
                        <router-link to="/talents/babydoll-villegas">
                            <div class="absolute inset-0 bg-black bg-opacity-10"></div>
                            <div class="w-full aspect-w-[3] aspect-h-[4]">
                                <img
                                    src="/images/model8.png"
                                    alt="Babydoll Villegas"
                                    class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </router-link>
                    </div>

                    <!-- Content section -->
                    <div class="md:w-9/12 md:p-8 p-4 flex flex-col justify-center">
                        <h3 class="uppercase tracking-widest font-bold text-lg md:text-xl">
                            Talent Spotlight
                        </h3>
                        <div class="mb-6">
                            <h1 class="text-3xl md:text-5xl font-bold mt-2 mb-4">
                                Babydoll Villegas
                            </h1>
                            <div class="flex flex-wrap gap-4 mb-8">
                                <span class="px-3 py-1 bg-black text-white text-xs rounded-full"
                                    >Model</span
                                >
                                <span class="px-3 py-1 bg-black text-white text-xs rounded-full"
                                    >Actress</span
                                >
                                <span class="px-3 py-1 bg-black text-white text-xs rounded-full"
                                    >Beauty Queen</span
                                >
                            </div>
                            <div class="w-16 h-0.5 bg-black"></div>
                        </div>

                        <div class="space-y-4 mb-8">
                            <p>
                                A rising star in contemporary cinema, Babydoll brings depth and
                                nuance to every role. Her performance in "Whispers of Tomorrow"
                                earned critical acclaim and established her as one of the most
                                promising talents of her generation.
                            </p>
                        </div>

                        <div>
                            <p class="mb-4 uppercase font-semibold">Follow her on social media:</p>
                            <div class="flex items-center gap-6">
                                <a
                                    href="#"
                                    class="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    <span class="sr-only">Instagram</span>
                                    <img
                                        src="/images/instagram1.svg"
                                        alt="Instagram"
                                        class="h-5 w-5"
                                    />
                                </a>
                                <a
                                    href="#"
                                    class="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    <span class="sr-only">TikTok</span>
                                    <img src="/images/tiktok.svg" alt="TikTok" class="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    class="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    <span class="sr-only">YouTube</span>
                                    <img src="/images/youtube.svg" alt="YouTube" class="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="max-w-[1440px] m-auto py-10 px-4 lg:px-10">
            <h1 class="text-xl font-light mt-2 mb-6">MORE TALENTS</h1>
            <div
                v-if="loading"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10"
            >
                <!-- Skeleton Loader -->
                <div v-for="n in 8" :key="n" class="group">
                    <div
                        class="relative overflow-hidden shadow-lg aspect-w-[300] aspect-h-[400] bg-gray-200 animate-pulse"
                    ></div>
                    <div class="text-center mt-4 font-bold text-lg">
                        <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10"
                >
                    <!-- Model Card -->
                    <router-link
                        v-for="talent in sortedTalents"
                        :key="talent.slug"
                        :to="{ name: 'talent-view', params: { slug: talent.slug } }"
                        class="group"
                    >
                        <div
                            class="relative overflow-hidden shadow-lg aspect-w-[300] aspect-h-[400]"
                        >
                            <img
                                :src="talent.talentContent?.thumbnail?.node?.sourceUrl"
                                :alt="talent.title"
                                class="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#FFD700]/80 to-[#B8860B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <div class="absolute bottom-0 w-full p-4 text-white font-bold">
                                    <p class="text-lg">
                                        {{ talent.talentContent?.frame1?.location }}
                                    </p>
                                    <p class="text-sm">{{ talent.talentContent?.frame1?.tags }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-3 uppercase text-sm">
                            <h3 class="tracking-wider">{{ talent.title }}</h3>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import type { Talent } from '@/types';

const GET_TALENTS = `
    query GetTalents {
  talents {
    nodes {
      title
      slug
  		... on WithAcfTalentContent {
        talentContent {
          thumbnail {
            node {
              sourceUrl
            }
          }
          frame1 {
            location
            tags
          }
        }
      }
  	}
  }
}
`;

const talents = ref<Talent[] | null>(null);
const loading = ref(true);

const error = ref<Error | null>(null);

// Computed property to sort talents alphabetically by title
const sortedTalents = computed(() => {
    if (talents.value) {
        return [...talents.value].sort((a, b) => a.title.localeCompare(b.title));
    }
    return null;
});

onMounted(async () => {
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_TALENTS,
        });
        talents.value = response.data.data.talents.nodes;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});
</script>
