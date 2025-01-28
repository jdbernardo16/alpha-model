<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/css';

defineProps({
    items: {
        type: Object,
        default: null,
    },
});

const modules = [Autoplay, FreeMode];

// Partner logos (replace with your actual image paths)
const partners = [
    '/images/partner1.png',
    '/images/partner2.png',
    '/images/partner3.png',
    '/images/partner4.png',
    '/images/partner5.png',
];
</script>

<template>
    <section>
        <div class="partner-swiper max-w-[1440px] m-auto pb-16">
            <swiper
                :modules="modules"
                :loop="true"
                :speed="1000"
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
            >
                <swiper-slide v-for="(partner, index) in items" :key="index">
                    <div>
                        <img
                            :src="partner.image.node.sourceUrl"
                            :alt="partner.name"
                            class="partner-logo m-auto"
                        />
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
