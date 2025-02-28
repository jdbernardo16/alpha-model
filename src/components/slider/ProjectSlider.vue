<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Autoplay, Pagination];

const props = defineProps({
    items: {
        type: Object,
    },
});
</script>
<template>
    <section>
        <div class="max-w-[1440px] m-auto px-4 lg:px-10 py-10 lg:py-16">
            <div class="max-w-[531px] mb-10">
                <h2 class="text-2xl font-serif mb-6">{{ items?.header }}</h2>
                <p>
                    {{ items?.description }}
                </p>
            </div>
            <div>
                <swiper
                    :slides-per-view="1"
                    :space-between="24"
                    :loop="true"
                    :modules="modules"
                    :autoplay="{
                        delay: 5000,
                        disableOnInteraction: false,
                    }"
                    :breakpoints="{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }"
                >
                    <swiper-slide v-for="(item, index) in items?.projects" :key="index">
                        <div
                            class="aspect-w-[350] aspect-h-[440] rounded-lg overflow-hidden bg-black"
                        >
                            <img
                                class="w-full h-full object-cover"
                                :src="item.image?.node.sourceUrl"
                                :alt="item.title"
                            />
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </section>
</template>
