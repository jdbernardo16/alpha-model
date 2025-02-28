<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Accordion from '@/components/general/Accordion.vue';
import Countdown from '@/components/general/Countdown.vue';
import { MapPinIcon } from '@heroicons/vue/24/outline';
import { formatDate } from '@/utils/dateFormatter';
import VueEasyLightbox from 'vue-easy-lightbox';

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

// Add these to your ref declarations
const currentEventIndex = ref(-1);
const currentEventGallery = computed(() => {
    if (
        currentEventIndex.value >= 0 &&
        cms.value?.pastEvents.events[currentEventIndex.value]?.gallery?.nodes
    ) {
        return cms.value.pastEvents.events[currentEventIndex.value].gallery.nodes.map((node) => ({
            src: node.sourceUrl,
            srcset: node.srcSet,
            title: node.altText || 'Event Image',
        }));
    }
    return [];
});

// Replace your showImage function with this
const showImage = (eventIndex: number, imageIndex: number = 0) => {
    currentEventIndex.value = eventIndex;
    index.value = imageIndex;
    visible.value = true;
};

const onHide = () => {
    visible.value = false;
};
</script>
<template>
    <section
        v-if="cms?.defaultBanner.showThisFrame"
        class="w-full bg-gradient-to-b from-primary-orange/[0.8] to-primary-pink/[0.8]"
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
    <section class="w-full relative text-white" v-if="cms?.upcomingEvents.showThisFrame">
        <div class="bg-black absolute w-full h-full top-0 left-0">
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
    <section>
        <div class="max-w-[1440px] mx-auto px-4 lg:px-20 py-10 lg:py-20">
            <div class="mb-20 space-y-4 w-full lg:w-1/2">
                <p class="font-semibold">{{ cms?.pastEvents.header }}</p>
                <h2 class="text-4xl font-bold mb-2">{{ cms?.pastEvents.title }}</h2>
                <p class="mb-8">
                    {{ cms?.pastEvents.description }}
                </p>
            </div>

            <div class="space-y-20 divide-y">
                <div
                    v-for="event in cms?.pastEvents.events"
                    :key="event.date + event.title"
                    class="flex lg:flex-row flex-col items-center lg:space-x-20 pt-20 first:pt-0"
                >
                    <div class="w-full lg:w-1/2 space-y-6 lg:order-1 order-2 lg:mt-0 mt-10">
                        <p class="text-gray-600">{{ formatDate(event.date) }}</p>
                        <h3 class="text-xl font-bold mb-2">{{ event.title }}</h3>
                        <div>
                            <p class="text-gray-600 mb-2 font-semibold text-sm">
                                {{ event.subHeader }}
                            </p>
                        </div>
                        <div>
                            <p class="font-bold mb-2">Details</p>
                            <p class="text-gray-600" v-html="event.details"></p>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 relative lg:order-2 order-1">
                        <div class="aspect-w-[500] aspect-h-[600] w-full group/item cursor-pointer">
                            <img
                                v-if="event.thumbnail?.node"
                                :src="event.thumbnail.node.sourceUrl"
                                :srcset="event.thumbnail.node.srcSet"
                                :alt="event.thumbnail.node.altText"
                                class="w-full object-cover h-full cursor-pointer"
                            />
                            <div
                                class="absolute w-full h-full bg-black/[0.5] transition group-hover/item:opacity-100 opacity-0 flex items-center justify-center"
                                @click="
                                    showImage(
                                        cms?.pastEvents.events.findIndex((e) => e === event),
                                        0, // Start with first image in the gallery
                                    )
                                "
                            >
                                <p class="font-bold text-white">View Gallery</p>
                            </div>
                        </div>
                        <!-- <div
                            class="absolute top-6 right-6 bg-white flex items-center space-x-2 px-3 py-1 rounded"
                        >
                            <MapPinIcon class="w-4 h-4" />
                            <p class="font-semibold text-sm">New York</p>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-black w-full">
        <div class="max-w-[1440px] m-auto px-4 lg:px-20 py-10 lg:py-20">
            <div class="text-white text-center max-w-[768px] m-auto space-y-6 mb-20">
                <h2 class="font-bold text-4xl">{{ cms?.highlights.title }}</h2>
                <p>{{ cms?.highlights.description }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <template
                    v-for="highlight in cms?.highlights.highlightGallery.nodes"
                    :key="highlight.id"
                >
                    <div class="aspect-w-[640] aspect-h-[640]">
                        <img
                            :src="highlight.sourceUrl"
                            :srcset="highlight.srcSet"
                            :alt="highlight.altText"
                            class="w-full h-full object-cover"
                        />
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
                    <a href="#" class="block">
                        <Button
                            class="uppercase font-bold bg-primary-pink px-5 py-3 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg text-white"
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
        :imgs="currentEventGallery"
        :index="index"
        @hide="onHide"
    ></VueEasyLightbox>
</template>
