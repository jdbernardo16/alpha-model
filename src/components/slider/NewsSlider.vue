<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import type { space } from 'postcss/lib/list';

const modules = [Navigation, Autoplay];

// Placeholder data - replace with actual news data
const items = [
    { sourceUrl: '/images/news1.jpg', altText: 'News 1', title: 'Jacqueline x Basic.Space' },
    { sourceUrl: '/images/news2.jpg', altText: 'News 2', title: 'LUCAS x Man of Metropolis' },
    { sourceUrl: '/images/news3.jpg', altText: 'News 3', title: 'Nyayop x Merit' },
    { sourceUrl: '/images/news4.jpg', altText: 'News 4', title: 'ESSENCE x RHODE' },
    { sourceUrl: '/images/news1.jpg', altText: 'News 1', title: 'SIENNA x ELLE ITALIA' },
    { sourceUrl: '/images/news2.jpg', altText: 'News 2', title: 'Bethany x d la Repubblica' },
];

defineProps<{
    items?: { sourceUrl: string; altText: string }[];
}>();
</script>
<template>
    <section>
        <div class="max-w-[1440px] px-4 lg:px-20 py-10 m-auto">
            <div class="max-w-[531px] mb-10 text-center m-auto">
                <h2 class="text-2xl font-serif mb-6">News</h2>
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
                <swiper-slide v-for="(item, index) in items" :key="index">
                    <div class="w-full">
                        <div class="aspect-w-[340] aspect-h-[440] mb-4">
                            <img
                                :src="item.sourceUrl"
                                :alt="item.altText"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <p class="text-center line-clamp-2">{{ item.title }}</p>
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
