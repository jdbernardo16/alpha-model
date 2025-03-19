<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-light">
        <!-- Portfolio Section with artistic presentation -->
        <div class="mb-12 sm:mb-20">
            <!-- Swiper Component with enhanced styling -->
            <div class="relative">
                <swiper-container
                    :slides-per-view="1"
                    :breakpoints="{
                        640: { slidesPerView: 2, spaceBetween: 25 },
                    }"
                    :navigation="true"
                    :pagination="{ clickable: true }"
                    class="portfolio-slider"
                >
                    <swiper-slide>
                        <div class="w-full flex flex-col justify-start relative">
                            <h1
                                class="text-3xl sm:text-5xl font-extralight uppercase mb-6 sm:mb-10 tracking-wider relative"
                            >
                                ADRIANA IGLESIAS
                                <div
                                    class="w-12 sm:w-16 h-0.5 bg-black absolute -bottom-2 sm:-bottom-4 left-0"
                                ></div>
                            </h1>

                            <div
                                class="grid grid-cols-5 gap-x-4 sm:gap-x-12 gap-y-4 text-sm tracking-wide"
                            >
                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    HEIGHT
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">5' 10"</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    BUST
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">32"</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    WAIST
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">24"</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    HIP
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">34"</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    SHOE
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">10</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    DRESS
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">
                                    2-4 US / 6-8 UK / 34-36 EU
                                </div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    CUP
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">A</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    HAIR
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">BROWN</div>

                                <div class="uppercase col-span-1 text-gray-500 font-medium">
                                    EYES
                                </div>
                                <div class="col-span-4 border-b border-gray-100 pb-2">BLUE</div>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide v-for="(image, index) in portfolioImages" :key="index">
                        <div
                            class="aspect-w-[3] aspect-h-[4] w-full group relative overflow-hidden"
                        >
                            <img
                                :src="image"
                                alt="Portfolio Image"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"
                            ></div>
                            <div
                                class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-xs sm:text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                PORTFOLIO.{{ index + 1 }}
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>

        <!-- About Talent Section with artistic typography -->
        <div class="mb-12 sm:mb-16">
            <div class="flex items-center mb-6 sm:mb-8">
                <div class="w-10 sm:w-12 h-px bg-black mr-4"></div>
                <h2 class="text-xl sm:text-2xl font-extralight uppercase tracking-widest">
                    About Talent
                </h2>
            </div>
            <p
                class="text-gray-700 leading-relaxed text-base sm:text-lg max-w-3xl font-light italic"
            >
                ADRIANA is a talented actor, model, and dancer based in Los Angeles. He has starred
                in films, appeared in music videos, and has extensive experience in both musical and
                theatrical productions. Over the years, he has worked with numerous well-known
                brands, showcasing his versatility and dedication to the industry.
            </p>
        </div>

        <!-- Hire Section with artistic contact presentation -->
        <div class="mb-10 sm:mb-12">
            <div class="flex items-center mb-6 sm:mb-8">
                <div class="w-10 sm:w-12 h-px bg-black mr-4"></div>
                <h2 class="text-xl sm:text-2xl font-extralight uppercase tracking-widest">
                    Hire Adriana
                </h2>
            </div>
            <div
                class="inline-block border-b border-gray-300 pb-1 transition-all duration-300 hover:border-black"
            >
                <a
                    href="mailto:admin@alphatalentmanagement.com"
                    class="text-gray-800 tracking-wide hover:text-black transition-colors duration-300"
                >
                    admin@alphatalentmanagement.com
                </a>
            </div>
        </div>

        <!-- Artistic footer element -->
        <div class="w-full flex justify-end mt-12 sm:mt-20">
            <div class="text-xs tracking-widest text-gray-400 uppercase">Portfolio · 2025</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element/bundle';

register();

// Portfolio images array using local images
const portfolioImages = ref([
    '/images/adriana1.jpg',
    '/images/adriana2.jpg',
    '/images/adriana3.jpg',
    '/images/adriana4.jpg',
    '/images/adriana5.jpg',
]);
</script>

<style lang="scss">
.portfolio-slider {
    /* Additional styling for Swiper navigation buttons */

    --swiper-navigation-color: #000;
    --swiper-pagination-color: #000;
    --swiper-pagination-bullet-inactive-color: #ccc;
    --swiper-navigation-sides-offset: 00px;

    .swiper-button-next,
    .swiper-button-prev {
        background-color: white;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50%;
        opacity: 0.7;
        transition: opacity 0.3s;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
        opacity: 1;
    }

    .swiper-button-next:after,
    .swiper-button-prev:after {
        font-size: 18px !important;
        font-weight: bold;
    }

    .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        opacity: 0.7;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
    }
}
</style>
