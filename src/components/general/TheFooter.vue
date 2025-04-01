<script setup lang="ts">
import type { Footer } from '@/types'; // Assuming you have a types file defining the Footer structure

defineProps<{
    cms: Footer | null | undefined;
}>();
</script>

<template>
    <footer v-if="cms" class="bg-black">
        <div class="max-w-[1440px] m-auto px-4 lg:px-10 text-white py-10 space-y-10">
            <div
                class="flex items-center uppercase space-x-4 m-auto w-fit lg:flex-row flex-col lg:space-y-0 space-y-4 lg:text-left text-center"
            >
                <a
                    v-if="cms.address"
                    class="transition hover:text-primary-gold"
                    :href="`https://maps.google.com/?q=${encodeURIComponent(cms.address)}`"
                    target="_blank"
                    rel="noreferrer"
                    >{{ cms.address }}</a
                >
                <span v-if="cms.address && cms.contactNumber">•</span>
                <a
                    v-if="cms.contactNumber"
                    class="transition hover:text-primary-gold"
                    :href="`tel:${cms.contactNumber.replace(/\s+/g, '')}`"
                    target="_blank"
                    rel="noreferrer"
                    >{{ cms.contactNumber }}</a
                >
                <span v-if="cms.contactNumber && cms.email">•</span>
                <a
                    v-if="cms.email"
                    class="transition hover:text-primary-gold"
                    :href="`mailto:${cms.email}`"
                    target="_blank"
                    rel="noreferrer"
                    >{{ cms.email }}</a
                >
            </div>
            <div
                v-if="cms.socialMedia && cms.socialMedia.length > 0"
                class="flex space-x-5 w-fit m-auto"
            >
                <a
                    v-for="social in cms.socialMedia"
                    :key="social.icon?.node?.id || social.link"
                    :href="social.link"
                    target="_blank"
                    rel="noreferrer"
                    class="transition hover:opacity-75"
                >
                    <img
                        v-if="social.icon?.node?.sourceUrl"
                        :src="social.icon.node.sourceUrl"
                        :alt="social.icon.node.altText || 'Social Media Icon'"
                        class="h-6 w-6 object-contain"
                    />
                </a>
            </div>
            <p v-if="cms.footerCopyright" class="text-center text-sm">
                {{ cms.footerCopyright }}
            </p>
        </div>
    </footer>
    <!-- Fallback or loading state if needed -->
    <footer v-else class="bg-black">
        <div class="max-w-[1440px] m-auto px-4 lg:px-10 text-white py-10 space-y-10 animate-pulse">
            <div class="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div class="flex space-x-5 w-fit m-auto">
                <div class="h-6 w-6 bg-gray-700 rounded"></div>
                <div class="h-6 w-6 bg-gray-700 rounded"></div>
                <div class="h-6 w-6 bg-gray-700 rounded"></div>
            </div>
            <div class="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
    </footer>
</template>
