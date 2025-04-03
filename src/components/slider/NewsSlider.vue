<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const modules = [Navigation, Autoplay];

import type { Post } from '../../types'; // Import the Post type

const props = defineProps<{
    cms?: {
        header?: string; // Make header optional if not always present
        title: string;
        description?: string; // Make description optional
        newsItem?: Array<{
            // Change to Array of objects
            label: string;
            poster?: {
                node?: {
                    sourceUrl: string;
                    altText: string;
                };
            };
        }>;
    };
}>();
</script>
<template>
    <section>
        <div class="max-w-[1440px] px-4 lg:px-20 py-10 m-auto">
            <div class="max-w-[531px] mb-10 text-center m-auto">
                <h2 class="text-2xl font-serif mb-6">{{ cms?.title }}</h2>
            </div>
            <swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="50"
                :navigation="true"
                :loop="true"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                }"
                :breakpoints="{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }"
                class="mySwiper"
            >
                <!-- Iterate over the posts prop -->
                <swiper-slide v-for="post in props.cms?.newsItem" :key="post?.label">
                    <div class="w-full">
                        <div class="aspect-w-[340] aspect-h-[440] mb-4 shadow">
                            <!-- Bind to the correct data structure from the Post type -->
                            <img
                                v-if="post?.poster?.node?.sourceUrl"
                                :src="post?.poster.node.sourceUrl"
                                :alt="post?.poster.node.altText"
                                class="w-full h-full object-cover"
                            />
                            <!-- Optional: Add a placeholder if image is missing -->
                            <div
                                v-else
                                class="w-full h-full bg-gray-200 flex items-center justify-center"
                            >
                                <span>No Image</span>
                            </div>
                        </div>
                        <!-- Use the nested title if available, otherwise fallback to the main post title -->
                        <p class="text-center line-clamp-2">
                            {{ post?.label }}
                        </p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<style css>
.swiper-button-next,
.swiper-button-prev {
    color: gold;
    cursor: pointer;
}
</style>
