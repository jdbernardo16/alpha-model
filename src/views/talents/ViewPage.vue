<template>
    <div class="max-w-7xl mx-auto px-4 py-12 font-light">
        <!-- Artistic Header with subtle animation -->
        <div class="relative mb-16">
            <div class="absolute -top-6 -left-2 text-8xl opacity-5 font-serif tracking-widest">
                TALENT
            </div>
            <div class="w-16 h-0.5 bg-black mb-4"></div>
        </div>

        <!-- Profile Section with artistic layout -->
        <div class="flex flex-col md:flex-row gap-12 mb-20">
            <!-- Profile Image with artistic treatment -->
            <div class="md:w-1/2 relative group">
                <div
                    class="absolute inset-0 border border-gray-200 transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                ></div>
                <img
                    src="/images/adriana7.jpeg"
                    alt="Talent Profile Photo"
                    class="w-full h-auto object-cover relative z-10 transition-all duration-500 filter group-hover:brightness-105"
                />
                <div
                    class="absolute top-4 right-4 z-20 text-xs tracking-widest uppercase text-white bg-black bg-opacity-60 px-3 py-1"
                >
                    Featured
                </div>
            </div>

            <!-- Details with artistic typography -->
            <div class="md:w-1/2 flex flex-col justify-start relative">
                <h1 class="text-5xl font-extralight uppercase mb-10 tracking-wider relative">
                    ADRIANA IGLESIAS
                    <div class="w-16 h-0.5 bg-black absolute -bottom-4 left-0"></div>
                </h1>

                <div class="grid grid-cols-5 gap-x-12 gap-y-4 text-sm tracking-wide">
                    <div class="uppercase col-span-1 text-gray-500 font-medium">HEIGHT</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">5' 10"</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">BUST</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">32"</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">WAIST</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">24"</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">HIP</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">34"</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">SHOE</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">10</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">DRESS</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">
                        2-4 US / 6-8 UK / 34-36 EU
                    </div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">CUP</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">A</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">HAIR</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">BROWN</div>

                    <div class="uppercase col-span-1 text-gray-500 font-medium">EYES</div>
                    <div class="col-span-4 border-b border-gray-100 pb-2">BLUE</div>
                </div>
            </div>
        </div>

        <!-- Portfolio Section with artistic presentation -->
        <div class="mb-20">
            <div class="flex items-center mb-8">
                <div class="w-12 h-px bg-black mr-4"></div>
                <h2 class="text-2xl font-extralight uppercase tracking-widest">Portfolio</h2>
            </div>

            <!-- Swiper Component with enhanced styling -->
            <div class="relative">
                <swiper-container
                    :slides-per-view="1"
                    :space-between="50"
                    :navigation="true"
                    :pagination="{ clickable: true }"
                    class="mySwiper"
                >
                    <swiper-slide v-for="(image, index) in portfolioImages" :key="index">
                        <div
                            class="aspect-w-[16] aspect-h-[9] w-full group relative overflow-hidden"
                        >
                            <img
                                :src="image"
                                alt="Portfolio Image"
                                class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"
                            ></div>
                            <div
                                class="absolute bottom-6 left-6 text-white text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                PORTFOLIO.{{ index + 1 }}
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>
        </div>

        <!-- About Talent Section with artistic typography -->
        <div class="mb-16">
            <div class="flex items-center mb-8">
                <div class="w-12 h-px bg-black mr-4"></div>
                <h2 class="text-2xl font-extralight uppercase tracking-widest">About Talent</h2>
            </div>
            <p class="text-gray-700 leading-relaxed text-lg max-w-3xl font-light italic">
                ADRIANA is a talented actor, model, and dancer based in Los Angeles. He has starred
                in films, appeared in music videos, and has extensive experience in both musical and
                theatrical productions. Over the years, he has worked with numerous well-known
                brands, showcasing his versatility and dedication to the industry.
            </p>
        </div>

        <!-- Hire Section with artistic contact presentation -->
        <div class="mb-12">
            <div class="flex items-center mb-8">
                <div class="w-12 h-px bg-black mr-4"></div>
                <h2 class="text-2xl font-extralight uppercase tracking-widest">Hire Adriana</h2>
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
        <div class="w-full flex justify-end mt-20">
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

<style>
/* Additional styling for Swiper navigation buttons */
:root {
    --swiper-navigation-color: #000;
    --swiper-pagination-color: #000;
    --swiper-pagination-bullet-inactive-color: #ccc;
}

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
</style>
