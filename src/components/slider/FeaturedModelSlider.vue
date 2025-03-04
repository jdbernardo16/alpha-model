<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Import ref
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

interface FeaturedModelItem {
    slug: string;
    talentContent?: {
        thumbnail?: {
            node: {
                sourceUrl: string;
            };
        };
        frame1?: {
            location: string;
        };
    };
    title: string;
}

const modules = [Autoplay, Pagination, Navigation];

const props = defineProps({
    items: {
        type: Array as () => FeaturedModelItem[] | undefined,
    },
    header: {
        type: String,
    },
});

// Add a ref to store the Swiper instance
const swiperInstance = ref<any>(null);

// Function to set the Swiper instance
const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper;

    // Ensure autoplay starts
    if (swiper?.autoplay) {
        swiper.autoplay.start();
    }
};

const slideNext = () => {
    swiperInstance.value?.slideNext();
};

const slidePrev = () => {
    swiperInstance.value?.slidePrev();
};
</script>

<template>
    <section class="bg-white lg:h-[350px] relative">
        <div
            class="max-w-[1440px] lg:left-1/2 lg:-translate-x-1/2 px-4 lg:px-10 lg:absolute lg:bottom-10 w-full lg:pt-0 pt-10"
        >
            <p class="font-bold text-xl mb-6 lg:text-white">{{ header }}</p>

            <div class="flex items-center">
                <div class="w-full lg:w-8/12">
                    <swiper
                        :slides-per-view="1"
                        :space-between="20"
                        :autoplay="{
                            delay: 5000,
                            disableOnInteraction: false,
                        }"
                        :loop="true"
                        :modules="modules"
                        @swiper="onSwiper"
                        :breakpoints="{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }"
                    >
                        <swiper-slide v-for="(item, index) in items || []" :key="index">
                            <a :href="`/talents/${item.slug}`">
                                <div
                                    class="aspect-w-[250] aspect-h-[350] bg-black rounded-lg overflow-hidden relative model-card"
                                >
                                    <div class="w-full h-full">
                                        <img
                                            class="w-full h-full object-cover grayscale"
                                            :src="item.talentContent?.thumbnail?.node.sourceUrl"
                                            alt="model1"
                                        />
                                        <div
                                            class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-primary-orange/[0.7] to-primary-pink/[0.7] flex flex-col justify-end text-white overlay-gradient transition"
                                        >
                                            <div class="model-card-content">
                                                <p class="text-lg font-medium mb-1">
                                                    {{ item.title }}
                                                </p>
                                                <p>{{ item.talentContent?.frame1?.location }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="hidden lg:block lg:w-4/12 text-center">
                    <div class="flex items-center space-x-10 m-auto w-fit">
                        <!-- Bind click events to the Swiper methods -->
                        <ArrowLeftIcon
                            class="size-10 cursor-pointer hover:text-primary-pink transition"
                            @click="slidePrev"
                        />
                        <ArrowRightIcon
                            class="size-10 cursor-pointer hover:text-primary-pink transition"
                            @click="slideNext"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.model-card {
    .overlay-gradient {
        height: 100%;
        max-height: 0;
        padding: 0;
        transition: all 0.34s ease;
    }
    .model-card-content {
        opacity: 0;
        padding: 0 20px;
        transition: all 0.34s ease;
    }

    &:hover {
        .overlay-gradient {
            max-height: 100%;
        }
        .model-card-content {
            opacity: 1;
            padding: 20px;
        }
    }
}

@media screen and (max-width: 1024px) {
    .model-card {
        .overlay-gradient {
            max-height: 100%;
        }
        .model-card-content {
            opacity: 1;
            padding: 20px;
        }
    }
}
</style>
