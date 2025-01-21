<script lang="ts" setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
</script>
<template>
    <header class="fixed top-0 left-0 w-full bg-black z-50">
        <div class="max-w-[1440px] m-auto px-10 flex items-center py-5 justify-between">
            <div class="flex items-center space-x-14">
                <div class="w-[70px]">
                    <img src="/images/logo.png" alt="UAT Logo" class="w-full" />
                </div>
                <div class="text-white flex items-center space-x-5">
                    <a href=""> Home </a>
                    <a href=""> Models </a>
                    <a href=""> About Us </a>
                    <a href=""> Promo Events </a>
                    <a href=""> Blogs </a>
                    <a href=""> Contact Us </a>
                </div>
            </div>
            <div class="text-white">
                <MagnifyingGlassIcon class="size-5" />
            </div>
        </div>
    </header>
    <div class="spacer h-[84px]"></div>
</template>
