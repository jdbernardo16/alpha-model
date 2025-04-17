<template>
    <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mx-auto">
        <h2 class="text-4xl font-bold text-center mb-10 text-gray-900">
            {{ cms?.sponsorshipPackages.title }}
        </h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            <!-- Package card for each package -->
            <div
                v-for="(pkg, index) in packages"
                :key="index"
                class="divide-y divide-gray-200 rounded-2xl border shadow-xs relative"
                :class="
                    pkg.featured
                        ? 'ring-2 ring-primary-gold border-primary-gold'
                        : 'border-gray-200 '
                "
            >
                <!-- Featured badge if applicable -->
                <div
                    v-if="pkg.featured"
                    class="absolute -top-2 -right-2 bg-primary-gold text-white px-3 py-1 text-sm font-medium rounded-bl-md rounded-tr-md"
                >
                    Recommended
                </div>

                <!-- Package header -->
                <div class="p-6 sm:px-8">
                    <h2 class="text-xl font-bold text-gray-900">
                        {{ pkg.name }}
                        <span class="sr-only">Plan</span>
                    </h2>

                    <p class="mt-2 text-gray-700">{{ pkg.description }}</p>

                    <p class="mt-2 sm:mt-4">
                        <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {{ pkg.price }}
                        </strong>
                    </p>

                    <router-link
                        :to="{
                            name: 'Checkout',
                            params: {
                                packageName: pkg.name,
                                packagePrice: pkg.price,
                                packageFeatures: JSON.stringify(pkg.features),
                            },
                        }"
                        class="mt-4 block w-full rounded-sm border border-primary-gold bg-primary-gold px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-primary-gold focus:outline-none focus:ring-2 focus:ring-primary-gold sm:mt-6 transition"
                        :class="{ 'bg-gold-700': pkg.featured }"
                    >
                        Get Started
                    </router-link>
                </div>

                <!-- Package features -->
                <div class="p-4 sm:px-4">
                    <p class="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                    <ul class="mt-2 space-y-6 sm:mt-4">
                        <li
                            v-for="(feature, featureIndex) in pkg.features"
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
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    cms: {
        type: Object,
    },
});

// Props
// const props = defineProps({
//     packages: {
//         type: Array,
//         required: true,
//     },
// }); // No longer needed

const selectPackage = (pkg) => {
    router.push({
        name: 'Checkout',
        params: { packageName: pkg.name, packagePrice: pkg.price },
    });
};

const packages = [
    {
        name: 'Silver',
        price: '$500',
        description: 'Basic sponsorship package with essential visibility',
        features: [
            {
                title: 'Logo Placement & Collateral',
                description: 'Logo displayed on select event materials and group images',
                included: true,
            },
            {
                title: 'Product Integration',
                description: 'Opportunity for product placement in group images',
                included: true,
            },
            {
                title: 'Social Media Exposure',
                description: '5 curated posts',
                included: true,
            },
            {
                title: 'Paid Advertising',
                description:
                    'Your logo & product photos in ads reaching up to 25,000+ people ($50 ad spend)',
                included: true,
            },
            {
                title: 'Professional Photography & UGC',
                description: 'Edited & enhanced photos',
                included: true,
            },
            {
                title: 'On-Site Activation',
                description: 'Opportunity to host a product demonstration during the break',
                included: false,
            },
        ],
    },
    {
        name: 'Gold',
        price: '$1,000',
        description: 'Enhanced visibility with greater audience reach',
        features: [
            {
                title: 'Logo Placement & Collateral',
                description: 'Logo on secondary event collateral and promotional materials',
                included: true,
            },
            {
                title: 'Product Integration',
                description: 'Integrated product shots during main sessions',
                included: true,
            },
            {
                title: 'Social Media Exposure',
                description: '10 curated posts',
                included: true,
            },
            {
                title: 'Paid Advertising',
                description:
                    'Your logo & product photos in ads reaching up to 50,000+ people ($100 ad spend)',
                included: true,
            },
            {
                title: 'Professional Photography & UGC',
                description: 'Edited & enhanced photos + 3 UGC videos from talent',
                included: true,
            },
            {
                title: 'On-Site Activation',
                description: 'Opportunity to host a product demonstration during the break',
                included: false,
            },
        ],
    },
    {
        name: 'Feature Alpha',
        price: '$2,500',
        description: 'Premium sponsorship with maximum visibility and exclusive opportunities',
        featured: true,
        features: [
            {
                title: 'Logo Placement & Collateral',
                description: 'Prominent logo on event collateral and promotional materials',
                included: true,
            },
            {
                title: 'Product Integration',
                description: 'Dedicated segment for an exclusive product showcase',
                included: true,
            },
            {
                title: 'Social Media Exposure',
                description: '10 curated posts, press release, and submission for media publishing',
                included: true,
            },
            {
                title: 'Paid Advertising',
                description:
                    'Your logo & product photos in ads reaching up to 100,000+ people ($250 ad spend)',
                included: true,
            },
            {
                title: 'Professional Photography & UGC',
                description: 'Edited & enhanced photos + 5 UGC videos from talent',
                included: true,
            },
            {
                title: 'On-Site Activation',
                description: 'Opportunity to host a product demonstration during the break',
                included: true,
            },
        ],
    },
];
</script>
