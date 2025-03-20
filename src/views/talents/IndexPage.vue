<template>
    <div
        class="min-h-screen bg-gradient-to-br from-stone-900 to-black flex items-center justify-center font-serif p-4"
    >
        <div
            class="max-w-4xl w-full bg-black bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
            <!-- Image section -->
            <div class="md:w-1/2 h-96 md:h-auto relative overflow-hidden">
                <router-link to="/talents/babydoll-villegas">
                    <div class="absolute inset-0 bg-black bg-opacity-10"></div>
                    <img
                        src="/images/model8.png"
                        alt="Babydoll Villegas"
                        class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div
                        class="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-1/3"
                    ></div>
                </router-link>
            </div>

            <!-- Content section -->
            <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div class="mb-6">
                    <span class="text-amber-400 uppercase tracking-widest text-xs font-light"
                        >Talent Spotlight</span
                    >
                    <h1 class="text-4xl md:text-5xl font-light text-white mt-2 mb-4">
                        Babydoll Villegas
                    </h1>
                    <div class="w-16 h-0.5 bg-amber-400 mb-6"></div>
                </div>

                <p class="text-gray-300 text-sm italic mb-6">
                    "Art is not what you see, but what you make others see."
                </p>

                <div class="space-y-4 text-gray-200 text-sm mb-8">
                    <p>
                        A rising star in contemporary cinema, Babydoll brings depth and nuance to
                        every role. Her performance in "Whispers of Tomorrow" earned critical
                        acclaim and established her as one of the most promising talents of her
                        generation.
                    </p>
                    <p>
                        Trained at the Royal Academy of Dramatic Arts, Babydoll seamlessly
                        transitions between stage and screen, bringing authenticity and emotional
                        resonance to each character.
                    </p>
                </div>

                <div class="flex flex-wrap gap-4 mb-8">
                    <span
                        class="px-3 py-1 bg-amber-900 bg-opacity-30 text-amber-300 text-xs rounded-full"
                        >Model</span
                    >
                    <span
                        class="px-3 py-1 bg-amber-900 bg-opacity-30 text-amber-300 text-xs rounded-full"
                        >Actress</span
                    >
                    <span
                        class="px-3 py-1 bg-amber-900 bg-opacity-30 text-amber-300 text-xs rounded-full"
                        >Beauty Queen</span
                    >
                </div>

                <div class="flex items-center gap-6">
                    <a href="#" class="text-amber-400 hover:text-amber-300 transition-colors">
                        <span class="sr-only">Portfolio</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                            ></path>
                            <path
                                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                            ></path>
                        </svg>
                    </a>
                    <a href="#" class="text-amber-400 hover:text-amber-300 transition-colors">
                        <span class="sr-only">Email</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            ></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </a>
                    <a href="#" class="text-amber-400 hover:text-amber-300 transition-colors">
                        <span class="sr-only">Instagram</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <section>
        <div class="max-w-[1440px] m-auto py-10 px-4 lg:px-10">
            <h1 class="text-4xl md:text-5xl font-light mt-2 mb-6">More Talents</h1>
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
