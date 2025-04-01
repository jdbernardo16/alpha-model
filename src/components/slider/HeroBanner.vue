<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface IProps {
    banner: Array<{
        id: string;
        sourceUrl: string;
        srcSet: string;
        altText: string;
    }>;
}
defineProps<IProps>();
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
            <swiper-slide v-for="i in banner" :key="i.id">
                <div class="aspect-w-[1425] aspect-h-[891] w-full">
                    <img class="w-full h-full object-cover" :src="i.sourceUrl" :alt="i.altText" />
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
