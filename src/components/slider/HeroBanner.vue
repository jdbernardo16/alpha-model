<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const banner = [
    {
        src: 'images/banner5.jpg',
        alt: 'Banner 5',
    },
    {
        src: 'images/banner1.jpg',
        alt: 'Banner 1',
    },
    {
        src: 'images/banner2.jpg',
        alt: 'Banner 2',
    },
    {
        src: 'images/banner3.jpg',
        alt: 'Banner 3',
    },
    {
        src: 'images/banner4.jpg',
        alt: 'Banner 4',
    },
];
</script>
<template>
    <div class="relative">
        <swiper
            :modules="[Navigation, EffectFade]"
            :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }"
            :autoplay="{
                delay: 5000,
                disableOnInteraction: false,
            }"
            :space-between="50"
            :loop="true"
            :slides-per-view="1"
            :effect="'fade'"
            class="mySwiper"
        >
            <swiper-slide v-for="i in banner" :key="i.src">
                <div class="aspect-w-[1425] aspect-h-[891] w-full">
                    <img class="w-full h-full object-cover" :src="i.src" :alt="i.alt" />
                </div>
            </swiper-slide>
        </swiper>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<style scoped>
.mySwiper {
    width: 100%;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-button-next,
.swiper-button-prev {
    color: gold;
    cursor: pointer;
}
</style>
