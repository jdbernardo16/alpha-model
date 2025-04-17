<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'; // Import watch
import { useHead } from '@vueuse/head'; // Import useHead
import axios from 'axios';
import Accordion from '@/components/general/Accordion.vue';
import Countdown from '@/components/general/Countdown.vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import type { PromoEventsData } from '@/types';
import PricingTable from '@/components/PricingTable.vue';

const GET_PROMO_EVENTS = `
    query getPromoEvents {
        page(id: "promo-events", idType: URI) {
            id
            title
            slug
            ... on WithAcfPromoEvents {
                promoEvents {
                    defaultBanner {
                        eyebrow
                        title
                        description
                        showThisFrame
                    }
                    upcomingEvents {
                        title
                        description
                        eventDateAndTime
                        showThisFrame
                        background {
                            node {
                                id
                                sourceUrl
                                srcSet
                                altText
                            }
                        }
                    }
                    sponsorshipPackages {
                      title
                      showThisFrame
                    }
                    pastEvents {
                        header
                        title
                        description
                        events {
                            thumbnail {
                                node {
                                    id
                                    sourceUrl
                                    srcSet
                                    altText
                                }
                            }
                            date
                            title
                            subHeader
                            details
                            gallery {
                                nodes {
                                    id
                                    sourceUrl
                                    srcSet
                                    altText
                                }
                            }
                        }
                    }
                    highlights {
                        title
                        description
                        highlightGallery {
                            nodes {
                                id
                                sourceUrl
                                srcSet
                                altText
                                title
                            }
                        }
                    }
                    faqs {
                        title
                        description
                        buttonText
                        faqItems {
                            question
                            answer
                        }
                    }
                }
            }
        }
    }
`;

const cms = ref<PromoEventsData | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);
const visible = ref(false);
const index = ref(0);

onMounted(async () => {
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_PROMO_EVENTS,
        });
        cms.value = response.data.data.page.promoEvents as PromoEventsData;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});

const currentHighlightIndex = ref(-1);

const currentHighlightGallery = computed(() => {
    if (cms.value?.highlights.highlightGallery.nodes) {
        return cms.value.highlights.highlightGallery.nodes.map((node) => ({
            src: node.sourceUrl,
            srcset: node.srcSet,
            title: node.altText || 'Highlight Image',
        }));
    }
    return [];
});

const showHighlightImage = (imageIndex: number) => {
    currentHighlightIndex.value = imageIndex;
    index.value = imageIndex;
    visible.value = true;
};

const onHide = () => {
    visible.value = false;
};

// Set meta tags for the Events page
watch(
    cms,
    (newCms) => {
        if (newCms?.defaultBanner) {
            const title = `${newCms.defaultBanner.title || 'Events'} - Alpha Talent Management`;
            const description = newCms.defaultBanner.description
                ? newCms.defaultBanner.description.substring(0, 160) +
                  (newCms.defaultBanner.description.length > 160 ? '...' : '')
                : 'Join Alpha Talent Management events. Stay updated on upcoming promotions and highlights.';
            // Use upcoming event background or a fallback
            const imageUrl =
                newCms.upcomingEvents?.background?.node?.sourceUrl || '/images/AATM_logo.png';

            useHead({
                title: title,
                meta: [
                    { name: 'description', content: description },
                    // Open Graph
                    { property: 'og:title', content: title },
                    { property: 'og:description', content: description },
                    { property: 'og:type', content: 'website' }, // Could be 'event.list' if more specific schema exists
                    { property: 'og:image', content: imageUrl },
                    { property: 'og:url', content: window.location.href },
                    // Twitter Card
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:title', content: title },
                    { name: 'twitter:description', content: description },
                    { name: 'twitter:image', content: imageUrl },
                ],
                link: [
                    // Add canonical link for the events index page
                    { rel: 'canonical', href: window.location.href },
                ],
            });
        } else {
            // Set default/loading state meta tags
            useHead({
                title: 'Events - Alpha Talent Management',
                meta: [
                    {
                        name: 'description',
                        content:
                            'Join Alpha Talent Management events. Stay updated on upcoming promotions and highlights.',
                    },
                ],
            });
        }
    },
    { immediate: true, deep: true },
); // Use immediate and deep watch
</script>
<template>
    <section
        v-if="cms?.defaultBanner.showThisFrame"
        class="w-full bg-gradient-to-b from-primary-orange/[0.8] to-primary-gold/[0.8]"
    >
        <div class="max-w-[768px] m-auto text-white text-center py-[112px]">
            <p class="font-medium">{{ cms?.defaultBanner.eyebrow }}</p>
            <h1 class="text-[4rem] mb-6 font-sans font-bold whitespace-pre-wrap">
                {{ cms?.defaultBanner.title }}
            </h1>
            <p>
                {{ cms?.defaultBanner.description }}
            </p>
        </div>
    </section>
    <section
        class="w-full relative text-white lg:min-h-[600px]"
        v-if="cms?.upcomingEvents.showThisFrame ?? true"
    >
        <div class="bg-black absolute w-full top-0 left-0 h-full">
            <img
                v-if="cms?.upcomingEvents.background.node"
                :src="cms.upcomingEvents.background.node.sourceUrl"
                :srcset="cms.upcomingEvents.background.node.srcSet"
                :alt="cms.upcomingEvents.background.node.altText"
                class="w-full h-full object-cover top-0 left-0 opacity-20"
            />
        </div>
        <div class="max-w-[1440px] mx-auto px-4 lg:px-20 py-20 relative">
            <div class="text-center space-y-10">
                <div>
                    <h1
                        class="text-3xl lg:text-[4rem] font-bold mb-4 leading-tight whitespace-pre-wrap"
                        v-html="cms?.upcomingEvents.title"
                    />
                    <p class="mb-4">{{ cms?.upcomingEvents.description }}</p>
                    <Countdown
                        v-if="cms?.upcomingEvents.eventDateAndTime"
                        :targetDate="cms.upcomingEvents.eventDateAndTime"
                        class="w-fit m-auto"
                    />
                </div>
            </div>
        </div>
    </section>
    <section v-if="cms?.sponsorshipPackages?.showThisFrame" class="border-b">
        <PricingTable :cms="cms" />
    </section>
    <section class="bg-black w-full">
        <div class="max-w-[1440px] m-auto px-4 lg:px-20 py-10 lg:py-20">
            <div class="text-white text-center max-w-[768px] m-auto space-y-6 mb-20">
                <h2 class="font-bold text-4xl">{{ cms?.highlights.title }}</h2>
                <p>{{ cms?.highlights.description }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <template
                    v-for="(highlight, index) in cms?.highlights.highlightGallery.nodes"
                    :key="highlight.id"
                >
                    <div>
                        <div class="aspect-w-[640] aspect-h-[640] group/item relative">
                            <img
                                :src="highlight.sourceUrl"
                                :srcset="highlight.srcSet"
                                :alt="highlight.altText"
                                class="w-full h-full object-cover cursor-pointer"
                                @click="showHighlightImage(index)"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-primary-gold to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end justify-center cursor-pointer"
                                @click="showHighlightImage(index)"
                            >
                                <p class="text-white font-bold pb-10">View Gallery</p>
                            </div>
                        </div>
                        <p class="text-white text-center mt-2">{{ highlight.title }}</p>
                    </div>
                </template>
            </div>
        </div>
    </section>
    <section class="py-12 bg-gray-100">
        <div class="max-w-[1440px] mx-auto px-4 lg:px-20">
            <div class="flex flex-col lg:flex-row lg:space-x-20 lg:space-y-0 space-y-10">
                <div class="w-full lg:w-1/2 space-y-4">
                    <h2 class="font-semibold text-3xl">{{ cms?.faqs.title }}</h2>
                    <p class="mb-8">
                        {{ cms?.faqs.description }}
                    </p>
                    <a href="/#contact" class="block">
                        <Button
                            class="uppercase font-bold bg-primary-gold px-5 py-3 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg text-white"
                        >
                            <p>{{ cms?.faqs.buttonText }}</p>
                        </Button>
                    </a>
                </div>
                <div class="w-full lg:w-1/2 space-y-4">
                    <Accordion
                        v-for="(faq, index) in cms?.faqs.faqItems"
                        :key="index"
                        :question="faq.question"
                        :answer="faq.answer"
                    />
                </div>
            </div>
        </div>
    </section>

    <VueEasyLightbox
        :visible="visible"
        :imgs="currentHighlightGallery"
        :index="index"
        @hide="onHide"
    ></VueEasyLightbox>
</template>
