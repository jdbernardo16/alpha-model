<script lang="ts" setup>
import { MagnifyingGlassIcon, XMarkIcon, Bars3BottomRightIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const openMenu = ref(false);
const toggleMenu = () => {
    openMenu.value = !openMenu.value;
};

const route = useRoute();

const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
};
</script>
<template>
    <header
        class="fixed top-0 left-0 w-full bg-black z-50 shadow-2xl border-b-2 border-primary-gold"
    >
        <div class="m-auto px-4 lg:px-10 flex items-center py-5 justify-between">
            <div class="lg:flex items-center lg:space-x-14">
                <a class="block" href="/">
                    <div class="w-[50px] lg:w-[85px] relative z-[1]">
                        <img src="/images/AATM_logo.png" alt="UAT Logo" class="w-full" />
                    </div>
                </a>
                <div
                    class="flex items-center lg:space-x-5 lg:relative fixed w-full h-full lg:flex-row flex-col lg:bg-transparent bg-black lg:left-auto lg:top-auto left-0 top-0 lg:space-y-0 space-y-5 lg:pt-0 pt-[91px] transition duration-500 text-white"
                    :class="openMenu ? 'translate-x-0' : 'translate-x-[100%] lg:translate-x-0'"
                >
                    <router-link
                        to="/"
                        :class="{ 'text-primary-gold font-medium': route.path === '/' }"
                        class="hover:text-primary-gold transition-colors"
                        @click="openMenu = false"
                    >
                        Home
                    </router-link>
                    <router-link
                        to="/talents"
                        :class="{
                            'text-primary-gold font-medium': route.path.startsWith('/talents'),
                        }"
                        class="hover:text-primary-gold transition-colors"
                        @click="openMenu = false"
                    >
                        Talents
                    </router-link>
                    <div class="group relative inline-block">
                        <router-link
                            to="/about"
                            :class="{ 'text-primary-gold': route.path === '/about' }"
                            class="hover:text-primary-gold transition-colors"
                            @click="openMenu = false"
                        >
                            About Us
                        </router-link>
                        <div
                            class="absolute left-0 hidden group-hover:block bg-black min-w-[160px] z-10 border-t-2 border-primary-gold"
                        >
                            <router-link
                                to="/blogs"
                                :class="{ 'text-primary-gold': route.path === '/blogs' }"
                                class="block px-4 py-2 hover:text-primary-gold transition-colors"
                                @click="openMenu = false"
                            >
                                Blogs
                            </router-link>
                        </div>
                    </div>
                    <router-link
                        to="/blogs"
                        :class="{ 'text-primary-gold': route.path === '/blogs' }"
                        class="block lg:hidden px-4 py-2 hover:text-primary-gold transition-colors"
                        @click="openMenu = false"
                    >
                        Blogs
                    </router-link>
                    <router-link
                        to="/events"
                        :class="{ 'text-primary-gold': route.path === '/events' }"
                        class="hover:text-primary-gold transition-colors"
                        @click="openMenu = false"
                    >
                        Promo Events
                    </router-link>
                    <router-link
                        to="/become-a-talent"
                        :class="{ 'text-primary-gold': route.path === '/become-a-talent' }"
                        class="hover:text-primary-gold transition-colors"
                        @click="
                            openMenu = false;
                            scrollToContact();
                        "
                    >
                        Become a Talent
                    </router-link>

                    <a href="/#contact" class="hover:text-primary-gold transition-colors"
                        >Contact Us</a
                    >
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
    <div class="spacer h-[71px] lg:h-[100px]"></div>
</template>
