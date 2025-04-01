<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import type { Talent, FeaturedTalent } from '@/types'; // Import FeaturedTalent

const GET_TALENTS = `
query GetTalents {
    talents {
        nodes {
            title
            slug
            ... on WithAcfTalentContent {
                talentContent {
                    frame1 {
                        fullName
                        thumbnail {
                            node {
                                sourceUrl
                                altText
                                id
                            }
                        }
                        talents {
                            label
                        }
                        images {
                            nodes {
                                title
                                sourceUrl
                                srcSet
                                altText
                            }
                        }
                        attributes {
                            bust
                            cup
                            dress
                            eyes
                            hair
                            height
                            hip
                            shoes
                            waist
                        }
                        address
                    }
                }
            }
        }
    }
}
`;

const GET_FEATURED_TALENTS = `
query GetFeaturedTalents {
    featuredTalents {
        nodes {
            id title isFeatured slug talentContent {
                frame1 {
                    fullName thumbnail {
                        node {
                            sourceUrl altText id
                        }
                    }
                    talents {
                        label
                    }
                    address
                }
                frame2 {
                    description
                }
                contactDetails {
                    socialMedia {
                        icon {
                            node {
                                sourceUrl
                            }
                        }
                        link
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

// State for Featured Talent
const featuredTalent = ref<FeaturedTalent | null>(null);
const featuredLoading = ref(true);
const featuredError = ref<Error | null>(null);

// Computed property to sort talents alphabetically by title
const sortedTalents = computed(() => {
    if (talents.value) {
        return [...talents.value].sort((a, b) => a.title.localeCompare(b.title));
    }
    return null;
});

onMounted(async () => {
    // Fetch both regular talents and featured talent concurrently
    const fetchTalents = axios.post('https://admin.alphatalentmanagement.com/graphql', {
        query: GET_TALENTS,
    });
    const fetchFeatured = axios.post('https://admin.alphatalentmanagement.com/graphql', {
        query: GET_FEATURED_TALENTS,
    });

    try {
        const [talentsResponse, featuredResponse] = await Promise.all([
            fetchTalents,
            fetchFeatured,
        ]);

        // Process regular talents
        if (talentsResponse.data.data?.talents?.nodes) {
            talents.value = talentsResponse.data.data.talents.nodes;
        } else {
            console.warn(
                'No regular talents found or unexpected data structure:',
                talentsResponse.data,
            );
            talents.value = []; // Set to empty array if no data
        }

        // Process featured talent
        if (
            featuredResponse.data.data?.featuredTalents?.nodes &&
            featuredResponse.data.data.featuredTalents.nodes.length > 0
        ) {
            // Assuming we only want the first featured talent
            featuredTalent.value = featuredResponse.data.data.featuredTalents.nodes[0];
        } else {
            console.warn(
                'No featured talents found or unexpected data structure:',
                featuredResponse.data,
            );
            // Handle case where no featured talent is found - maybe show a default or hide the section
        }
    } catch (err) {
        console.error('Error fetching talents:', err);
        error.value = err as Error; // General error for the main list
        featuredError.value = err as Error; // Specific error for the featured section
    } finally {
        loading.value = false;
        featuredLoading.value = false;
    }
});

// Helper function to extract hostname from URL
const getHostname = (urlString: string | undefined): string => {
    if (!urlString) return 'Social Media';
    try {
        // Use optional chaining and nullish coalescing for safety
        return new URL(urlString)?.hostname?.replace('www.', '') ?? 'Link';
    } catch (e) {
        console.error('Invalid URL for hostname extraction:', urlString, e);
        return 'Link'; // Fallback for invalid URLs
    }
};
</script>
<template>
    <section>
        <div class="max-w-[1440px] m-auto p-4 md:p-10">
            <!-- Featured Talent Section -->
            <div class="p-4 md:p-10 shadow-2xl">
                <!-- Loading State -->
                <div
                    v-if="featuredLoading"
                    class="flex flex-col md:flex-row items-center gap-6 md:gap-0 animate-pulse"
                >
                    <div class="md:w-3/12 w-full md:mr-8">
                        <div class="w-full aspect-w-[3] aspect-h-[4] bg-gray-300"></div>
                    </div>
                    <div class="md:w-9/12 md:p-8 p-4 flex flex-col justify-center w-full">
                        <div class="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                        <div class="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
                        <div class="flex flex-wrap gap-4 mb-8">
                            <div class="h-6 w-16 bg-gray-300 rounded-full"></div>
                            <div class="h-6 w-20 bg-gray-300 rounded-full"></div>
                        </div>
                        <div class="w-16 h-0.5 bg-gray-300 mb-8"></div>
                        <div class="space-y-4 mb-8">
                            <div class="h-4 bg-gray-300 rounded w-full"></div>
                            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                        <div class="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
                        <div class="flex items-center gap-6">
                            <div class="h-5 w-5 bg-gray-300 rounded"></div>
                            <div class="h-5 w-5 bg-gray-300 rounded"></div>
                            <div class="h-5 w-5 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>

                <!-- Error State -->
                <div v-else-if="featuredError" class="text-center text-red-500 py-10">
                    Failed to load featured talent. Please try again later.
                </div>

                <!-- Content Display -->
                <div
                    v-else-if="featuredTalent"
                    class="w-full overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-0"
                >
                    <!-- Image section -->
                    <div class="md:w-3/12 relative overflow-hidden h-fit w-full md:mr-8">
                        <router-link
                            :to="{ name: 'talent-view', params: { slug: featuredTalent.slug } }"
                        >
                            <div class="absolute inset-0 bg-black bg-opacity-10"></div>
                            <div class="w-full aspect-w-[3] aspect-h-[4]">
                                <img
                                    v-if="
                                        featuredTalent.talentContent?.frame1?.thumbnail?.node
                                            ?.sourceUrl
                                    "
                                    :src="
                                        featuredTalent.talentContent.frame1.thumbnail.node.sourceUrl
                                    "
                                    :alt="
                                        featuredTalent.talentContent?.frame1?.fullName ||
                                        featuredTalent.title
                                    "
                                    class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <!-- Placeholder if no image -->
                                <div
                                    v-else
                                    class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
                                >
                                    No Image
                                </div>
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
                                {{
                                    featuredTalent.talentContent?.frame1?.fullName ||
                                    featuredTalent.title
                                }}
                            </h1>
                            <div
                                v-if="featuredTalent.talentContent?.frame1?.talents?.length"
                                class="flex flex-wrap gap-4 mb-8"
                            >
                                <span
                                    v-for="(tag, index) in featuredTalent.talentContent.frame1
                                        .talents"
                                    :key="index"
                                    class="px-3 py-1 bg-black text-white text-xs rounded-full"
                                >
                                    {{ tag.label }}
                                </span>
                            </div>
                            <div class="w-16 h-0.5 bg-black"></div>
                        </div>

                        <div
                            v-if="featuredTalent.talentContent?.frame2?.description"
                            class="wysiwyg line-clamp-3"
                            v-html="featuredTalent.talentContent.frame2.description"
                        />

                        <div
                            v-if="featuredTalent.talentContent?.contactDetails?.socialMedia?.length"
                        >
                            <p class="mb-4 uppercase font-semibold">
                                Follow
                                {{
                                    featuredTalent.talentContent?.frame1?.fullName
                                        ? featuredTalent.talentContent.frame1.fullName.split(' ')[0]
                                        : 'them'
                                }}
                                on social media:
                            </p>
                            <div class="flex items-center gap-6">
                                <a
                                    v-for="(social, index) in featuredTalent.talentContent
                                        .contactDetails.socialMedia"
                                    :key="index"
                                    :href="social.link || '#'"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    <span class="sr-only">{{ getHostname(social.link) }}</span>
                                    <img
                                        v-if="social.icon?.node?.sourceUrl"
                                        :src="social.icon.node.sourceUrl"
                                        :alt="getHostname(social.link)"
                                        class="h-5 w-5"
                                    />
                                    <!-- Fallback icon or text if no image -->
                                    <span v-else class="h-5 w-5 inline-block border rounded"
                                        >?</span
                                    >
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- No Featured Talent Found State -->
                <div v-else class="text-center text-gray-500 py-10">
                    No featured talent available at the moment.
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
                                :src="talent.talentContent?.frame1?.thumbnail?.node?.sourceUrl"
                                :alt="talent.title"
                                class="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#FFD700]/80 to-[#B8860B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <div class="absolute bottom-0 w-full p-4 text-white font-bold">
                                    <p class="text-lg">
                                        {{ talent.talentContent?.frame1?.address }}
                                    </p>
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
