<script setup lang="ts">
import LatestPostSlider from '@/components/slider/LatestPostSlider.vue';
import PartnerSlider from '@/components/slider/PartnerSlider.vue';

const images = [
    '/images/adriana1.jpg',
    '/images/adriana2.jpg',
    '/images/adriana3.jpg',
    '/images/test.png',
    '/images/adriana4.jpg',
    '/images/adriana5.jpg',
    '/images/adriana6.jpeg',
    '/images/adriana7.jpeg',
];
</script>
<template>
    <section class="p-20 h-[120vh] relative">
        <div
            class="w-full h-full bg-[url(/images/adriana.png)] bg-fixed flex items-center justify-center"
        >
            <div class="text-center">
                <h1 class="font-figtree text-white text-h1 uppercase"><b>Adriana</b> Iglesias</h1>
                <p class="text-white text-xl mb-10">Tijuana, Mexico</p>
                <p class="font-charmonman text-neutral-300 text-5xl">
                    Model | Actress | Content Creator
                </p>
            </div>
        </div>
        <div class="absolute top-1/2 -translate-y-1/2 space-y-5 right-0 pr-5">
            <img src="/images/tiktok.svg" alt="tiktok" />
            <img src="/images/instagram1.svg" alt="tiktok" />
        </div>
        <!-- <div class="absolute bottom-1/2 translate-y-[300px] left-1/2 z-[1]">
            <img src="/images/arrow-down.svg" alt="Arrow Down" />
        </div> -->
    </section>

    <section class="relative">
        <div class="w-full h-[420px] bg-[url(/images/test.png)] bg-fixed"></div>
        <div class="max-w-[1200px] m-auto relative w-full py-12">
            <div
                class="bg-black w-full h-[300px] pt-20 text-white text-center absolute -top-[200px]"
            >
                <h2 class="text-h1"><b>LATEST</b> POST</h2>
            </div>
            <div class="relative">
                <LatestPostSlider />
            </div>
        </div>
    </section>
    <section>
        <div class="text-center max-w-[1440px] m-auto">
            <h3 class="text-6xl mb-20"><b>COLLABORATIONS</b> WITH</h3>
            <div>
                <PartnerSlider />
            </div>
        </div>
    </section>

    <section class="bg-neutral-100">
        <div class="max-w-[1440px] m-auto px-16 py-16">
            <div class="text-center mb-20">
                <h3 class="text-6xl"><b>PORT</b>FOLIO</h3>
            </div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="image in images" :key="image">
                    <div class="aspect-w-[313] aspect-h-[363] overflow-hidden group">
                        <img
                            class="object-cover w-full h-full group-hover:scale-105 transition"
                            :src="image"
                            alt="Adriana Iglesias"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="px-16 max-w-[1440px] m-auto pb-[120px]">
            <div class="flex">
                <div class="w-1/2 space-y-10 pt-20">
                    <div>
                        <p class="text-[4rem]">
                            <b>THIS IS</b><br />
                            MY STORY
                        </p>
                    </div>
                    <div class="pr-20">
                        <p>
                            "<b>Adriana</b> is a trailblazer in the world of beauty, dance, and
                            acting. Her exceptional versatility and passion have earned her
                            recognition on an international stage. Here’s a glimpse into the story
                            of her multifaceted journey."
                            <br />
                            <br />

                            <b>Model</b> <br />
                            "In the realm of beauty enthusiasts, Adriana shines as a true force of
                            nature. Renowned for her versatile skillset, she has captivated
                            audiences and clients worldwide, establishing herself as an icon in the
                            modeling industry."
                            <br />
                            <br />
                            <b>Dancer</b>
                            <br />
                            "Prepare to be inspired by Adriana’s artistry as a professional dancer
                            and cheerleader. Her movements tell a story of elegance, leaving a
                            lasting impression on all who witness her captivating performances."
                            <br />
                            <br />
                            <b>Actress</b>
                            <br />
                            "With cutting-edge talent and undeniable charisma, Adriana transforms
                            into the persona of her roles with grace and style. Whether on stage or
                            on screen, she brings life to every character, proving herself a natural
                            in any environment."
                        </p>
                    </div>
                </div>
                <div class="w-1/2 px-10">
                    <div class="aspect-w-[616] aspect-h-[885] relative">
                        <div>
                            <div
                                class="bg-black w-full h-full absolute top-10 right-10 z-[1]"
                            ></div>
                        </div>
                        <img class="object-cover z-[2]" src="/images/test.png" alt="image" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="w-full h-[420px] bg-[url(/images/adriana8.jpg)] bg-cover bg-fixed"></div>
        <div class="max-w-[1034px] m-auto -translate-y-20">
            <div class="w-full p-[50px] bg-neutral-100">
                <p class="text-6xl text-center mb-20"><b>TOUCH</b> BASE</p>

                <div class="flex space-x-10">
                    <div class="w-4/12">
                        <div class="flex items-center space-x-6 mb-6">
                            <img src="/images/instagram1.svg" alt="tiktok" />
                            <img src="/images/tiktok.svg" alt="tiktok" />
                        </div>
                        <p>
                            Whether you're looking to hire <b>Tyler</b>, have a question, or want to
                            explore collaboration opportunities, <br /><br />
                            we’re here to help! Fill out the form below, and we’ll get back to you
                            as soon as possible.
                        </p>
                    </div>
                    <div class="w-8/12 space-y-5">
                        <input
                            type="text"
                            placeholder="Name"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        />

                        <input
                            type="text"
                            placeholder="Email"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        />

                        <textarea
                            type="text"
                            placeholder="Message"
                            rows="5"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        ></textarea>

                        <div class="flex justify-end w-full">
                            <button class="text-white bg-black py-4 px-10">SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
