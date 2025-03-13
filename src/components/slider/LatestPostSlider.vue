<script setup lang="ts">
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { ref } from 'vue';
import 'swiper/css/navigation';
import 'swiper/css';

defineProps({
    items: {
        type: Object,
        default: null,
    },
});

const modules = [Autoplay, Navigation];

// Add a ref to store the Swiper instance
const swiperInstance = ref<any>(null);

// Function to set the Swiper instance
const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper;
};

// Methods to control Swiper navigation
const slideNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slideNext();
    }
};

const slidePrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slidePrev();
    }
};

// Partner logos (replace with your actual image paths)
const images = [
    '/images/adriana1.jpg',
    '/images/adriana2.jpg',
    '/images/adriana3.jpg',
    '/images/adriana4.jpg',
    '/images/adriana5.jpg',
    '/images/adriana6.jpeg',
    '/images/adriana7.jpeg',
];
</script>

<template>
    <div class="latest-post-swiper w-full m-auto">
        <swiper
            :modules="modules"
            :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :breakpoints="{
                '640': {
                    slidesPerView: 1,
                    spaceBetween: 16,
                },
                '768': {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                '1024': {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            }"
            @swiper="onSwiper"
        >
            <swiper-slide v-for="(image, index) in items" :key="index">
                <div class="aspect-w-[255] aspect-h-[370] overflow-hidden">
                    <img class="w-full h-full object-cover" :src="image.sourceUrl" alt="image" />
                </div>
            </swiper-slide>
        </swiper>
    </div>
    <div
        class="flex items-center space-x-10 m-auto w-full justify-between absolute top-1/2 -translate-y-1/2"
    >
        <ArrowLeftIcon
            class="size-10 cursor-pointer hover:text-primary-gold transition"
            @click="slidePrev"
        />
        <ArrowRightIcon
            class="size-10 cursor-pointer hover:text-primary-gold transition"
            @click="slideNext"
        />
    </div>
</template>

<style lang="scss">
.latest-post-swiper {
    padding: 0 50px;
    .swiper .swiper-button-prev {
        left: -10px !important;
    }
}
</style>
