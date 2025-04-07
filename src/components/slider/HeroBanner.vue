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
                <div class="h-[60vh] w-full">
                    <img
                        class="w-full h-full object-cover position-top"
                        :src="i.sourceUrl"
                        :srcset="i.srcSet"
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 1080px"
                        :alt="i.altText"
                        loading="lazy"
                    />
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
