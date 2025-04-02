<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'; // Import watch
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Talent } from '@/types';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element/bundle';

register();

const route = useRoute();
const slug = route.params.slug as string | undefined;

const talent = ref<Talent | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const GET_TALENT_BY_SLUG = `
query GetTalentBySlug($slug:ID !) {
    talent(id: $slug, idType:SLUG) {
        title uri...on WithAcfTalentContent {
            talentContent {
                frame1 {
                    fullName thumbnail {
                        node {
                            sourceUrl altText id
                        }
                    }
                    talents {
                        label
                    }
                    images {
                        nodes {
                            title sourceUrl srcSet altText
                        }
                    }
                    attributes {
                        bust cup dress eyes hair height hip shoes waist
                    }
                    address
                }
                frame2 {
                    title description
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
                frame3 {
                    title description
                }
            }
        }
    }
}
`;

// Function to load/fetch data based on slug
const loadTalentData = (currentSlug: string | undefined) => {
    if (!currentSlug) {
        error.value = new Error('Talent slug is missing or invalid.');
        loading.value = false;
        talent.value = null;
        return;
    }

    // Reset state for the current slug
    loading.value = true;
    error.value = null;
    talent.value = null; // Clear previous talent data

    const storageKey = `talentData_${currentSlug}`;

    // --- Check Cache ---
    try {
        const cachedData = localStorage.getItem(storageKey);
        if (cachedData) {
            talent.value = JSON.parse(cachedData);
            loading.value = false; // Data from cache, not loading initially
            console.log(`Loaded talent ${currentSlug} from cache.`);
        } else {
            loading.value = true; // No cache, initial load state
        }
    } catch (e) {
        console.error(`Failed to parse cached data for ${currentSlug}:`, e);
        localStorage.removeItem(storageKey); // Clear potentially corrupted cache
        loading.value = true; // Force loading state if cache fails
    }

    // --- Fetch Data (Stale-While-Revalidate) ---
    const fetchTalentBySlug = async () => {
        const initialLoad = loading.value; // Check if this is the very first load (no cache)
        try {
            const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
                query: GET_TALENT_BY_SLUG,
                variables: { slug: currentSlug }, // Use the passed slug
            });

            if (response.data.errors) {
                // Combine GraphQL errors into a single Error object
                throw new Error(response.data.errors.map((e: any) => e.message).join(', '));
            }

            const freshData = response.data.data.talent;

            if (freshData) {
                talent.value = freshData; // Update the view
                // Update cache
                try {
                    localStorage.setItem(storageKey, JSON.stringify(freshData));
                    console.log(`Updated cache for talent ${currentSlug}.`);
                } catch (e) {
                    console.error(`Failed to cache data for ${currentSlug}:`, e);
                }
                error.value = null; // Clear previous errors on success
            } else {
                // Handle case where talent is not found by slug
                throw new Error(`Talent with slug "${currentSlug}" not found.`);
            }
        } catch (err: any) {
            console.error(`Error fetching talent ${currentSlug}:`, err);
            error.value = err;
            // Keep potentially stale talent.value if loaded from cache
        } finally {
            // Only set loading to false if it was the initial load (no cache)
            if (initialLoad) {
                loading.value = false;
            }
        }
    };

    // Trigger the fetch in the background
    fetchTalentBySlug();
};

// Initial load on mount
onMounted(() => {
    loadTalentData(route.params.slug as string | undefined);
});

// Watch for route slug changes
watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            console.log(`Talent slug changed from ${oldSlug} to ${newSlug}. Reloading data.`);
            loadTalentData(newSlug as string | undefined);
        }
    },
);
</script>

<template>
    <div v-if="loading" class="text-center py-12">Loading...</div>
    <div v-else-if="error" class="text-center py-12 text-red-500">
        Error loading talent: {{ error.message }}
    </div>
    <div v-else-if="talent" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-light">
        <!-- Portfolio Section with artistic presentation -->
        <div class="mb-12 sm:mb-20">
            <!-- Swiper Component with enhanced styling -->
            <div v-if="talent.talentContent?.frame1?.images?.nodes?.length" class="relative">
                <swiper-container
                    :slides-per-view="1"
                    :breakpoints="{
                        640: { slidesPerView: 2, spaceBetween: 25 },
                    }"
                    :navigation="talent.talentContent.frame1.images.nodes.length > 1"
                    :pagination="{ clickable: true }"
                    class="portfolio-slider"
                >
                    <swiper-slide>
                        <div
                            v-if="talent.talentContent?.frame1"
                            class="w-full flex flex-col justify-start relative"
                        >
                            <h1
                                class="text-3xl sm:text-5xl font-extralight uppercase mb-6 sm:mb-10 tracking-wider relative"
                            >
                                {{ talent.talentContent.frame1.fullName }}
                                <div
                                    v-if="talent.talentContent.frame1.talents?.length"
                                    class="space-x-2 flex mt-2"
                                >
                                    <p
                                        v-for="(t, index) in talent.talentContent.frame1.talents"
                                        :key="index"
                                        class="px-2.5 bg-primary-gold w-fit text-white rounded-full text-sm"
                                    >
                                        {{ t.label }}
                                    </p>
                                </div>
                                <div
                                    class="w-12 sm:w-16 h-0.5 bg-black absolute -bottom-2 sm:-bottom-4 left-0"
                                ></div>
                            </h1>

                            <div
                                class="grid grid-cols-5 gap-x-4 sm:gap-x-12 gap-y-4 text-sm tracking-wide my-6"
                            >
                                <template v-if="talent.talentContent.frame1.attributes?.height">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        HEIGHT
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.height }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.bust">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        BUST
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.bust }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.waist">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        WAIST
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.waist }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.hip">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        HIP
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.hip }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.shoes">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        SHOE
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.shoes }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.dress">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        DRESS
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.dress }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.cup">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        CUP
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.cup }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.hair">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        HAIR
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.hair }}
                                    </div>
                                </template>

                                <template v-if="talent.talentContent.frame1.attributes?.eyes">
                                    <div class="uppercase col-span-1 text-gray-500 font-medium">
                                        EYES
                                    </div>
                                    <div class="col-span-4 border-b border-gray-100 pb-2">
                                        {{ talent.talentContent.frame1.attributes.eyes }}
                                    </div>
                                </template>
                            </div>
                            <p class="mb-4 uppercase">
                                Follow
                                {{
                                    talent.talentContent?.frame1?.fullName
                                        ? talent.talentContent.frame1.fullName.split(' ')[0]
                                        : 'them'
                                }}
                                on social media:
                            </p>
                            <div class="flex items-center gap-6">
                                <a
                                    v-for="(social, index) in talent.talentContent?.contactDetails
                                        ?.socialMedia"
                                    :key="index"
                                    :href="social.link || '#'"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    <img
                                        v-if="social.icon?.node?.sourceUrl"
                                        :src="social.icon?.node?.sourceUrl"
                                        :alt="social.icon?.node?.altText || 'Social Media Icon'"
                                        class="h-5 w-5 hover:scale-110 transition"
                                    />
                                    <!-- Fallback icon or text if no image -->
                                    <span v-else class="h-5 w-5 inline-block border rounded"
                                        >?</span
                                    >
                                </a>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide
                        v-for="(image, index) in talent.talentContent.frame1.images.nodes"
                        :key="index"
                    >
                        <div
                            class="aspect-w-[3] aspect-h-[4] w-full group relative overflow-hidden"
                        >
                            <img
                                :src="image.sourceUrl"
                                :alt="
                                    image.altText ||
                                    talent.talentContent.frame1.fullName +
                                        ' portfolio image ' +
                                        (index + 1)
                                "
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"
                            ></div>
                            <div
                                class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-xs sm:text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                {{ image.title || `PORTFOLIO.${index + 1}` }}
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>

        <!-- About Talent Section with artistic typography -->
        <div v-if="talent.talentContent?.frame2?.description" class="mb-12 sm:mb-16">
            <div class="flex items-center mb-6 sm:mb-8">
                <div class="w-10 sm:w-12 h-px bg-black mr-4"></div>
                <h2 class="text-xl sm:text-2xl font-extralight uppercase tracking-widest">
                    About {{ talent.talentContent?.frame1?.fullName?.split(' ')[0] || 'Talent' }}
                </h2>
            </div>
            <div
                class="text-gray-700 leading-relaxed text-base sm:text-lg max-w-3xl font-light italic wysiwyg"
                v-html="talent.talentContent.frame2.description"
            />
        </div>

        <!-- Hire Section with artistic contact presentation -->
        <div v-if="talent.talentContent?.frame1?.fullName" class="mb-10 sm:mb-12">
            <div class="flex items-center mb-6 sm:mb-8">
                <div class="w-10 sm:w-12 h-px bg-black mr-4"></div>
                <h2 class="text-xl sm:text-2xl font-extralight uppercase tracking-widest">
                    Hire {{ talent.talentContent.frame1.fullName.split(' ')[0] }}
                </h2>
            </div>
            <div class="wysiwyg" v-html="talent.talentContent?.frame3?.description"></div>
        </div>

        <!-- Artistic footer element -->
        <div class="w-full flex justify-end mt-12 sm:mt-20">
            <div class="text-xs tracking-widest text-gray-400 uppercase">Portfolio · 2025</div>
        </div>
    </div>
</template>

<style lang="scss">
.portfolio-slider {
    /* Additional styling for Swiper navigation buttons */

    --swiper-navigation-color: #000;
    --swiper-pagination-color: #000;
    --swiper-pagination-bullet-inactive-color: #ccc;
    --swiper-navigation-sides-offset: 50px;

    .swiper-button-next,
    .swiper-button-prev {
        background-color: white;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50%;
        opacity: 0.7;
        transition: opacity 0.3s;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
        opacity: 1;
    }

    .swiper-button-next:after,
    .swiper-button-prev:after {
        font-size: 18px !important;
        font-weight: bold;
    }

    .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        opacity: 0.7;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
    }
}
</style>
