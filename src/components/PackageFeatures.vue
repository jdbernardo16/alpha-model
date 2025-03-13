<template>
    <div
        class="divide-y divide-gray-200 rounded-2xl border shadow-xs relative ring-2 ring-gold-600 border-gold-600 m-auto"
    >
        <!-- Package header -->
        <div class="p-6 sm:px-8">
            <h2 class="text-xl font-bold text-gray-900">
                {{ packageName }}
                <span class="sr-only">Plan</span>
            </h2>

            <p class="mt-2 sm:mt-4">
                <strong class="text-2xl font-bold text-gray-900 sm:text-4xl">
                    {{ packagePrice }}
                </strong>
            </p>
        </div>

        <!-- Package features -->
        <div class="p-4 sm:px-4">
            <p class="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

            <ul class="mt-2 space-y-6 sm:mt-4">
                <li
                    v-for="(feature, featureIndex) in features"
                    :key="featureIndex"
                    class="flex gap-2"
                >
                    <!-- Check or X icon based on feature inclusion -->
                    <svg
                        v-if="feature.included"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-gold-700"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>

                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 text-red-700"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>

                    <div class="flex-1">
                        <span class="text-gray-700 font-medium">
                            {{ feature.title }}
                        </span>
                        <p class="text-gray-500 text-sm">
                            {{ feature.description }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    packageFeatures: {
        type: String,
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
    packagePrice: {
        type: String,
        required: true,
    },
});

const features = computed(() => {
    try {
        return JSON.parse(props.packageFeatures);
    } catch (error) {
        console.error('Error parsing packageFeatures:', error);
        return []; // Return an empty array in case of error
    }
});
</script>
