<template>
    <section>
        <div
            class="mx-auto max-w-7xl p-6 lg:px-8 bg-white rounded-lg grid grid-cols-1 md:grid-cols-10 gap-10 lg:gap-20 py-10 lg:py-20"
        >
            <div class="md:col-span-6">
                <div class="mb-6">
                    <h1 class="text-2xl lg:text-4xl mb-4 font-bold leading-tight">
                        Sponsorship Package Details
                    </h1>
                    <p>
                        After your purchase, one of our team will reach out to you as soon as
                        possible.
                    </p>
                </div>
                <h2 class="text-xl lg:text-2xl font-bold mb-4 lg:hidden block">Checkout</h2>
                <PackageFeatures
                    :package-name="formData.packageName"
                    :package-price="formData.packagePrice"
                    :package-features="packageFeatures"
                />
            </div>
            <div class="md:col-span-4">
                <h2 class="text-2xl font-bold mb-4 lg:block hidden">Checkout</h2>

                <form @submit.prevent="handleSubmit" class="space-y-4 mb-4">
                    <div class="hidden">
                        <label for="packageName" class="block text-sm font-medium text-gray-700">
                            Package Name
                        </label>
                        <input
                            type="text"
                            id="packageName"
                            v-model="formData.packageName"
                            readonly
                            class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div class="hidden">
                        <label for="packagePrice" class="block text-sm font-medium text-gray-700">
                            Package Price
                        </label>
                        <input
                            type="text"
                            id="packagePrice"
                            v-model="formData.packagePrice"
                            readonly
                            class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="companyName" class="block text-sm font-medium text-gray-700">
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            v-model="formData.companyName"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="contactPerson" class="block text-sm font-medium text-gray-700">
                            Contact Person
                        </label>
                        <input
                            type="text"
                            id="contactPerson"
                            v-model="formData.contactPerson"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            v-model="formData.address"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="contactNumber" class="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            id="contactNumber"
                            v-model="formData.contactNumber"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            v-model="formData.email"
                            required
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            v-model="formData.message"
                            rows="4"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                </form>

                <PayPalButton
                    :amount="formData.packagePrice"
                    :package-name="formData.packageName"
                    @payment-success="handlePaymentSuccess"
                    @payment-error="handlePaymentError"
                    ref="paypalButton"
                    :class="{ 'cursor-not-allowed pointer-events-none opacity-50': !isFormValid }"
                />
            </div>
        </div>
    </section>
    <div
        class="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
        v-if="isLoading"
    >
        <div class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useHead } from '@vueuse/head'; // Import useHead
import PayPalButton from './PayPalButtonContainer.vue';
import { useRoute, useRouter } from 'vue-router';
import PackageSummary from './PackageSummary.vue';
import PackageFeatures from './PackageFeatures.vue';

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const isFormValid = computed(() => {
    return (
        formData.value.companyName !== '',
        formData.value.contactPerson !== '',
        formData.value.address !== '',
        formData.value.contactNumber !== '',
        formData.value.email !== ''
    );
});

const props = defineProps({
    packageName: String,
    packagePrice: String,
    packageFeatures: String,
});

const paymentSuccessful = ref(false);
const formData = ref({
    packageName: props.packageName,
    packagePrice: props.packagePrice,
    orderId: '',
    companyName: '',
    contactPerson: '',
    address: '',
    contactNumber: '',
    email: '',
    message: '',
});

watch(
    () => route.params,
    (newParams) => {
        formData.value.packageName = newParams.packageName;
        formData.value.packagePrice = newParams.packagePrice;
    },
);

const handlePaymentSuccess = (paymentDetails) => {
    isLoading.value = true;
    console.log('Payment successful:', paymentDetails);
    paymentSuccessful.value = true;
    formData.value.orderId = paymentDetails.orderID;

    // --- WordPress API Integration ---
    const wpFormData = new FormData();
    wpFormData.append('_wpcf7', '192');
    wpFormData.append('_wpcf7_version', '5.8.5');
    wpFormData.append('_wpcf7_locale', 'en_US');
    wpFormData.append('_wpcf7_unit_tag', 'wpcf7-f192-o1');
    wpFormData.append('_wpcf7_container_post', '0');
    wpFormData.append('package-name', formData.value.packageName);
    wpFormData.append('package-price', formData.value.packagePrice);
    wpFormData.append('paypal-order-id', formData.value.orderId);
    wpFormData.append('company-name', formData.value.companyName);
    wpFormData.append('contact-person', formData.value.contactPerson);
    wpFormData.append('address', formData.value.address);
    wpFormData.append('contact-number', formData.value.contactNumber);
    wpFormData.append('email', formData.value.email);
    wpFormData.append('message', formData.value.message);

    fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/192/feedback`,
        {
            // Replace 192 with your form ID
            method: 'POST',
            body: wpFormData,
        },
    )
        .then((response) => response.json())
        .then((data) => {
            console.log('CF7 API Response:', data);

            if (data.status === 'mail_sent') {
                console.log('Data successfully submitted to CF7');
                router.push({
                    name: 'success',
                    query: { orderDetails: JSON.stringify(formData.value) },
                });
            } else {
                console.error('CF7 submission failed:', data.message);
                // Handle errors, e.g., show an error message to the user.
            }
        })
        .catch((error) => {
            console.error('Error submitting to CF7:', error);
            // Handle network errors.
        })
        .finally(() => {
            isLoading.value = false;
        });
    // --- End WordPress API Integration ---
};

const handlePaymentError = (error) => {
    console.error('Payment Error:', error);
};

const handleSubmit = () => {};

// Set meta tags for the Checkout page, preventing indexing
useHead({
    title: 'Checkout - Alpha Talent Management',
    meta: [
        { name: 'description', content: 'Complete your sponsorship package purchase.' },
        { name: 'robots', content: 'noindex, nofollow' }, // Prevent indexing
    ],
    // No need for OG/Twitter tags or canonical link for a noindex page
});
</script>
