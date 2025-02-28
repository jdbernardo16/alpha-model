<script lang="ts" setup>
import { MagnifyingGlassIcon, XMarkIcon, Bars3BottomRightIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const openMenu = ref(false);
const toggleMenu = () => {
    openMenu.value = !openMenu.value;
};

const route = useRoute();
</script>
<template>
    <header class="fixed top-0 left-0 w-full bg-black z-50">
        <div class="m-auto px-4 lg:px-10 flex items-center py-5 justify-between">
            <div class="lg:flex items-center lg:space-x-14">
                <a class="block" href="/">
                    <div class="w-[50px] lg:w-[70px] relative z-[1]">
                        <img src="/images/logo.png" alt="UAT Logo" class="w-full" />
                    </div>
                </a>
                <div
                    class="text-white flex items-center lg:space-x-5 lg:relative fixed w-full h-full lg:flex-row flex-col lg:bg-transparent bg-black lg:left-auto lg:top-auto left-0 top-0 lg:space-y-0 space-y-5 lg:pt-0 pt-[91px] transition duration-500"
                    :class="openMenu ? 'translate-x-0' : 'translate-x-[100%] lg:translate-x-0'"
                >
                    <router-link
                        to="/"
                        :class="{ 'text-primary-pink': route.path === '/' }"
                        class="hover:text-primary-pink transition-colors"
                        @click="openMenu = false"
                    >
                        Home
                    </router-link>
                    <router-link
                        to="/talents"
                        :class="{ 'text-primary-pink': route.path.startsWith('/talents') }"
                        class="hover:text-primary-pink transition-colors"
                        @click="openMenu = false"
                    >
                        Talents
                    </router-link>
                    <router-link
                        to="/about"
                        :class="{ 'text-primary-pink': route.path === '/about' }"
                        class="hover:text-primary-pink transition-colors"
                        @click="openMenu = false"
                    >
                        About Us
                    </router-link>
                    <router-link
                        to="/events"
                        :class="{ 'text-primary-pink': route.path === '/events' }"
                        class="hover:text-primary-pink transition-colors"
                        @click="openMenu = false"
                    >
                        Promo Events
                    </router-link>
                    <router-link
                        to="/blogs"
                        :class="{ 'text-primary-pink': route.path === '/blogs' }"
                        class="hover:text-primary-pink transition-colors"
                        @click="openMenu = false"
                    >
                        Blogs
                    </router-link>
                    <router-link
                        to="/contact"
                        :class="{ 'text-primary-pink': route.path === '/contact' }"
                        class="hover:text-primary-pink transition-colors"
                        @click="openMenu = false"
                    >
                        Contact Us
                    </router-link>
                </div>
            </div>
            <div
                class="absolute top-5 right-4 z-[2] text-white lg:hidden block"
                @click="toggleMenu"
            >
                <Bars3BottomRightIcon v-if="!openMenu" class="w-6 h-6" />
                <XMarkIcon v-if="openMenu" class="w-6 h-6" />
            </div>
        </div>
    </header>
    <div class="spacer h-[71px] lg:h-[84px]"></div>
</template>
