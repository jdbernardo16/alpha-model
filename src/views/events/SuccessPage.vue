<template>
    <section>
        <div
            class="lg:h-[calc(80vh-85px)] py-10 lg:py-0 flex items-center justify-center lg:px-0 px-4"
        >
            <div class="max-w-[768px] p-6 rounded-lg shadow-md text-center m-auto w-full border">
                <CheckCircleIcon class="size-20 text-green-500 m-auto" />
                <h2 class="text-2xl font-bold mb-4">Payment Successful!</h2>
                <p class="mb-4">Thank you for your purchase. Your order details are below:</p>
                <div class="mb-4">
                    <strong>Order ID:</strong>
                    {{ orderDetails.orderId }}
                </div>
                <div class="mb-4">
                    <strong>Package Name:</strong>
                    {{ orderDetails.packageName }}
                </div>
                <div class="mb-4">
                    <strong>Package Price:</strong>
                    {{ orderDetails.packagePrice }}
                </div>
                <p class="mb-4">We will be in touch with you shortly.</p>
                <a href="/" class="block w-fit m-auto mt-4">
                    <Button
                        class="uppercase font-bold bg-primary-gold p-5 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg text-white"
                    >
                        <p>Back to Home</p>
                    </Button>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useHead } from '@vueuse/head'; // Import useHead
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const orderDetails = computed(() => JSON.parse(route.query.orderDetails));

// Set meta tags for the Success page, preventing indexing
useHead({
    title: 'Payment Successful - Alpha Talent Management',
    meta: [
        {
            name: 'description',
            content: 'Your payment was successful. Thank you for your purchase.',
        },
        { name: 'robots', content: 'noindex, nofollow' }, // Prevent indexing
    ],
    // No need for OG/Twitter tags or canonical link for a noindex page
});
</script>
