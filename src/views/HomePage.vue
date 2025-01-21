<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import FeaturedModelSlider from '@/components/slider/FeaturedModelSlider.vue';

const items = [
    {
        id: 1,
        title: 'Model 1',
        image: '/images/item1.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 2,
        title: 'Model 2',
        image: '/images/item2.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 3,
        title: 'Model 3',
        image: '/images/item3.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 3,
        title: 'Model 4',
        image: '/images/item4.png',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
    {
        id: 3,
        title: 'Model 5',
        image: '/images/item5.jpg',
        name: 'Tyler Charly',
        location: 'Los Angeles, CA',
    },
];

const values = [
    {
        icon: '/images/talents.svg',
        title: 'Top Talent',
        description: 'Exclusive Access to Leading Models',
    },
    {
        icon: '/images/booking.svg',
        title: 'Flexible Booking',
        description: 'Tailored to Your Schedule',
    },
    {
        icon: '/images/talents.svg',
        title: 'Professional Standards',
        description: 'Guaranteed Quality & Expertise',
    },
];
</script>

<template>
    <section class="h-[calc(100vh-84px)] bg-[#1C1B1B] relative">
        <img
            class="w-full h-full absolute top-0 left-0"
            src="/images/herobackground.png"
            alt="UAT Hero Background"
        />
        <div class="relative z-[1] text-white flex space-x-20 px-10 justify-between">
            <!-- Left Side -->
            <div class="w-1/2">
                <div class="w-[647px] pt-20">
                    <div class="mb-10">
                        <h1 class="text-h1 font-serif leading-tight mb-6">
                            Where Talent Meets Style
                        </h1>
                        <p class="text-lg max-w-[490px]">
                            Explore our curated selection of models and hire the perfect fit for
                            your project.
                        </p>
                    </div>
                    <div class="flex items-center space-x-10">
                        <Button
                            class="uppercase font-bold bg-primary-pink p-5 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg"
                        >
                            <p>Hire Models Now</p>
                            <ArrowRightIcon class="w-6 h-6" />
                        </Button>
                        <Button class="flex items-center space-x-4">
                            <img src="/images/play.svg" alt="play" />
                            <p>Play Video</p>
                        </Button>
                    </div>
                </div>
            </div>
            <!-- Right Side -->
            <div class="w-1/2">
                <div
                    class="w-[482px] h-[736px] bg-primary-pink overflow-hidden rounded-b-full relative m-auto"
                >
                    <img
                        class="w-full absolute bottom-0 left-0"
                        src="/images/heroimage.png"
                        alt="image"
                    />

                    <!-- Arrow -->
                    <img
                        src="/images/hero-arrow.svg"
                        alt="hero-arrow"
                        class="absolute top-14 right-4"
                    />
                </div>
            </div>
        </div>
    </section>
    <!-- Featured Models -->
    <FeaturedModelSlider :items="items" />

    <section class="bg-white">
        <div class="max-w-[1024px] m-auto px-10 py-16">
            <div class="grid grid-cols-3 gap-5">
                <div
                    v-for="(value, index) in values"
                    :key="index"
                    class="flex items-center space-x-4"
                >
                    <img class="w-10 h-10 object-cover" :src="value.icon" alt="icon" />
                    <div>
                        <h3 class="text-sm font-bold">{{ value.title }}</h3>
                        <p class="text-xs text-neutral-500">{{ value.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white">
        <div class="max-w-[1440px] m-auto px-10 py-10">
            <div class="max-w-[536px] text-center m-auto mb-16">
                <h2 class="font-serif text-4xl mb-6">Stand Out with Promo Events</h2>
                <p>
                    Our models bring energy and style to any event. Create a memorable experience
                    that puts your brand in the spotlight!
                </p>
            </div>
            <div class="grid grid-cols-3 gap-10">
                <div>
                    <div class="aspect-w-[431] aspect-h-[485] rounded-lg overflow-hidden">
                        <img
                            class="w-full h-full object-cover"
                            src="/images/item5.jpg"
                            alt="image"
                        />
                    </div>
                </div>
                <div>
                    <div class="aspect-w-[431] aspect-h-[485] rounded-lg overflow-hidden">
                        <img
                            class="w-full h-full object-cover"
                            src="/images/item4.png"
                            alt="image"
                        />
                    </div>
                </div>
                <div>
                    <div class="aspect-w-[431] aspect-h-[485] rounded-lg overflow-hidden">
                        <img
                            class="w-full h-full object-cover"
                            src="/images/item3.jpg"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
