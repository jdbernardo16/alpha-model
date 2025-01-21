<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from '@/components/general/TheHeader.vue';
import TheFooter from '@/components/general/TheFooter.vue';
</script>

<template>
    <the-header />
    <RouterView />
    <the-footer />
</template>
