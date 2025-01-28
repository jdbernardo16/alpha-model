<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { HomePageData } from '../types';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import FeaturedModelSlider from '@/components/slider/FeaturedModelSlider.vue';
import ProjectSlider from '@/components/slider/ProjectSlider.vue';
import PartnerSlider from '../components/slider/PartnerSlider.vue';

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
        const response = await axios.post('http://localhost:8000/graphql', {
            query: GET_HOME,
        });
        result.value = response.data.data as HomePageData;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});

const items = [
    {
        id: 1,
        title: 'Model 1',
        image: '/images/item1.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 2,
        title: 'Model 2',
        image: '/images/item2.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 3,
        title: 'Model 3',
        image: '/images/item3.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 4,
        title: 'Model 4',
        image: '/images/item4.png',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 5,
        title: 'Model 5',
        image: '/images/item5.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
];

const values = [
    {
        icon: '/images/talents.svg',
        title: 'Top Talent',
        description: 'Exclusive Access to Leading Models',
    },
    {
        icon: '/images/booking.svg',
        title: 'Flexible Booking',
        description: 'Tailored to Your Schedule',
    },
    {
        icon: '/images/talents.svg',
        title: 'Professional Standards',
        description: 'Guaranteed Quality & Expertise',
    },
];

const gallery = [
    {
        id: 1,
        image: '/images/item5.jpg',
        name: 'Joshua Treeshot',
    },
    {
        id: 2,
        image: '/images/item4.png',
        name: 'Joshua Treeshot',
    },
    {
        id: 3,
        image: '/images/item3.jpg',
        name: 'Joshua Treeshot',
    },
];
</script>

<template>
    <section class="h-[calc(100vh-84px)] bg-[#1C1B1B] relative">
        <img
            class="w-full h-full absolute top-0 left-0"
            src="/images/herobackground.png"
            alt="UAT Hero Background"
        />
        <div class="relative z-[1] text-white flex space-x-20 px-10 justify-between">
            <!-- Left Side -->
            <div class="w-1/2">
                <div class="w-[647px] pt-20">
                    <div class="mb-10">
                        <h1 class="text-h1 font-serif leading-tight mb-6">
                            {{ result?.page?.homepage?.frame1?.header }}
                        </h1>
                        <p class="text-lg max-w-[490px]">
                            {{ result?.page?.homepage?.frame1?.description }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-10">
                        <a :href="result?.page?.homepage?.frame1?.buttonLink">
                            <Button
                                class="uppercase font-bold bg-primary-pink p-5 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg"
                            >
                                <p>{{ result?.page?.homepage?.frame1?.buttonText }}</p>
                                <ArrowRightIcon class="w-6 h-6" />
                            </Button>
                        </a>
                        <Button class="flex items-center space-x-4">
                            <img src="/images/play.svg" alt="play" />
                            <p>Play Video</p>
                        </Button>
                    </div>
                </div>
            </div>
            <!-- Right Side -->
            <div class="w-1/2">
                <div class="w-[70%] m-auto">
                    <div
                        class="aspect-w-[482] aspect-h-[736] bg-primary-pink overflow-hidden rounded-b-full relative m-auto"
                    >
                        <div class="w-full h-full">
                            <img
                                class="w-full absolute bottom-0 left-0 object-contain"
                                src="/images/heroimage.png"
                                alt="image"
                            />

                            <!-- Arrow -->
                            <img
                                src="/images/hero-arrow.svg"
                                alt="hero-arrow"
                                class="absolute top-14 right-4 w-[15%]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Models -->
    <FeaturedModelSlider :items="items" />

    <section class="bg-white">
        <div class="max-w-[1024px] m-auto px-10 py-16">
            <div class="grid grid-cols-3 gap-5">
                <div
                    v-for="(value, index) in values"
                    :key="index"
                    class="flex items-center space-x-4"
                >
                    <img class="w-10 h-10 object-cover" :src="value.icon" alt="icon" />
                    <div>
                        <h3 class="text-sm font-bold">{{ value.title }}</h3>
                        <p class="text-xs text-neutral-500">{{ value.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white">
        <div class="max-w-[1440px] m-auto px-10 py-10">
            <div class="max-w-[536px] text-center m-auto mb-16">
                <h2 class="font-serif text-4xl mb-6">Stand Out with Promo Events</h2>
                <p>
                    Our models bring energy and style to any event. Create a memorable experience
                    that puts your brand in the spotlight!
                </p>
            </div>
            <div class="grid grid-cols-3 gap-10">
                <div v-for="(item, index) in gallery" :key="index">
                    <div
                        class="aspect-w-[431] aspect-h-[485] rounded-lg overflow-hidden group/gallery"
                    >
                        <img class="w-full h-full object-cover" :src="item.image" alt="image" />
                        <div
                            class="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 flex items-center justify-end flex-col text-white space-y-4 p-6 opacity-0 group-hover/gallery:opacity-100 transition"
                        >
                            <p>{{ item.name }}</p>
                            <Button
                                class="uppercase font-bold bg-primary-pink p-5 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg"
                            >
                                <p>View Gallery</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="max-w-[1440px] m-auto px-10 py-16">
            <div class="flex items-center justify-between space-x-10">
                <div class="w-1/2">
                    <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img class="w-full object-cover" src="/images/blog1.png" alt="blog" />
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="mb-6">
                        <p class="text-xl font-bold mb-3">Blogs</p>
                        <h3 class="text-3xl font-serif mb-3 line-clamp-2">
                            Empowerment for Models:5 Ways to Prioritize Self Care for prolonged your
                            career as a model
                        </h3>
                        <p class="text-xs text-neutral-500">Nov 6, 2024</p>
                    </div>
                    <div class="mb-6">
                        <p class="line-clamp-4">
                            Being a model is more than just looking good and striking a pose—it is a
                            demanding career that requires hard work, dedication, and perseverance.
                            In an industry that often focuses on external appearance, it is
                            essential for models to prioritize their mental and physical health.
                            This article will provide you with five ways to prioritize self-care for
                            prolonged your career as a model.
                        </p>
                    </div>
                    <div class="flex items-center space-x-3 text-primary-pink cursor-pointer">
                        <p>Learn more</p>
                        <ArrowRightIcon class="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <ProjectSlider :items="items" />

    <PartnerSlider />
</template>
