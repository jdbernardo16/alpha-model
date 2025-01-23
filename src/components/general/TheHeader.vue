<script lang="ts" setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
    <header class="fixed top-0 left-0 w-full bg-black z-50">
        <div class="m-auto px-10 flex items-center py-5 justify-between">
            <div class="flex items-center space-x-14">
                <div class="w-[70px]">
                    <img src="/images/logo.png" alt="UAT Logo" class="w-full" />
                </div>
                <div class="text-white flex items-center space-x-5">
                    <router-link
                        to="/"
                        :class="{ 'text-primary-pink': route.path === '/' }"
                        class="hover:text-primary-pink transition-colors"
                    >
                        Home
                    </router-link>
                    <router-link
                        to="/models"
                        :class="{ 'text-primary-pink': route.path.startsWith('/models') }"
                        class="hover:text-primary-pink transition-colors"
                    >
                        Models
                    </router-link>
                    <router-link
                        to="/about"
                        :class="{ 'text-primary-pink': route.path === '/about' }"
                        class="hover:text-primary-pink transition-colors"
                    >
                        About Us
                    </router-link>
                    <router-link
                        to="/events"
                        :class="{ 'text-primary-pink': route.path === '/events' }"
                        class="hover:text-primary-pink transition-colors"
                    >
                        Promo Events
                    </router-link>
                    <router-link
                        to="/blogs"
                        :class="{ 'text-primary-pink': route.path === '/blogs' }"
                        class="hover:text-primary-pink transition-colors"
                    >
                        Blogs
                    </router-link>
                    <router-link
                        to="/contact"
                        :class="{ 'text-primary-pink': route.path === '/contact' }"
                        class="hover:text-primary-pink transition-colors"
                    >
                        Contact Us
                    </router-link>
                </div>
            </div>
            <div class="text-white">
                <MagnifyingGlassIcon class="size-5" />
            </div>
        </div>
    </header>
    <div class="spacer h-[84px]"></div>
</template>
