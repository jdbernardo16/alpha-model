<script setup lang="ts">
import { ref } from 'vue';

// No props needed for this basic talent form based on instructions
const props = defineProps<{
    name: string;
}>();
const talentName = ref(props.name);
const fullName = ref('');
const email = ref('');
const phone = ref('');
const subject = ref('');
const message = ref('');

const isLoading = ref(false);
const showSuccessModal = ref(false);
const submissionError = ref<string | null>(null);

const handleSubmit = async () => {
    isLoading.value = true;
    submissionError.value = null;
    showSuccessModal.value = false;

    const wpFormData = new FormData();
    // --- Add Contact Form 7 specific hidden fields ---
    wpFormData.append('_wpcf7', '779'); // Updated Form ID
    wpFormData.append('_wpcf7_version', '5.8.5'); // Use the version installed on your WP site
    wpFormData.append('_wpcf7_locale', 'en_US'); // Adjust if your site uses a different locale
    wpFormData.append('_wpcf7_unit_tag', 'wpcf7-f779-o1'); // Updated unit tag based on form ID
    wpFormData.append('_wpcf7_container_post', '0'); // Usually 0 unless embedded in a specific post

    // --- Append form data ---
    // !! IMPORTANT: Ensure these keys match the 'name' attributes in your Contact Form 7 form tag !!
    wpFormData.append('talent-name', talentName.value);
    wpFormData.append('full-name', fullName.value);
    wpFormData.append('your-email', email.value);
    wpFormData.append('your-phone', phone.value); // Assuming required based on [text* your-phone]
    wpFormData.append('your-subject', subject.value);
    wpFormData.append('message', message.value);

    try {
        const response = await fetch(
            // Updated fetch URL with new form ID
            `${import.meta.env.VITE_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/779/feedback`,
            {
                method: 'POST',
                body: wpFormData,
            },
        );

        const data = await response.json();

        if (data.status === 'mail_sent') {
            console.log('Form submitted successfully:', data);
            showSuccessModal.value = true;
            // Reset form fields
            talentName.value = '';
            fullName.value = '';
            email.value = '';
            phone.value = '';
            subject.value = '';
            message.value = '';
        } else {
            console.error('Form submission failed:', data.message);
            submissionError.value = data.message || 'Submission failed. Please try again.';
            // Check for validation errors
            if (data.invalid_fields && data.invalid_fields.length > 0) {
                submissionError.value = data.invalid_fields
                    .map((field: any) => field.message)
                    .join('\n');
                console.error('Validation errors:', data.invalid_fields);
            }
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        submissionError.value = 'An unexpected error occurred. Please try again later.';
    } finally {
        isLoading.value = false;
    }
};
</script>
<template>
    <section class="relative">
        <!-- Loading Indicator -->
        <div
            v-if="isLoading"
            class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50"
        >
            <div
                class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-gold"
            ></div>
        </div>

        <!-- Success Modal -->
        <div
            v-if="showSuccessModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
            @click.self="showSuccessModal = false"
        >
            <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-4">
                <h3 class="text-xl font-bold mb-4 text-primary-gold">Success!</h3>
                <p class="mb-6 text-gray-700">
                    <!-- Updated Success Message -->
                    Your application has been submitted successfully. We will get back to you soon.
                </p>
                <button
                    @click="showSuccessModal = false"
                    class="inline-flex justify-center rounded bg-primary-gold px-5 py-2 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-gold"
                >
                    Close
                </button>
            </div>
        </div>

        <div id="contact" class="-translate-y-[80px]"></div>
        <div class="mx-auto max-w-[1440px] lg:py-16 sm:px-20 lg:px-8">
            <!-- Removed Title/Description section as per instructions -->

            <form
                @submit.prevent="handleSubmit"
                class="mx-auto mb-0 max-w-2xl bg-black p-6 rounded-lg"
            >
                <div class="grid grid-cols-1 gap-4 w-full">
                    <!-- New Form Fields -->
                    <div class="hidden">
                        <label for="talent-name" class="block text-xs font-medium text-primary-gold"
                            >Talent Name</label
                        >
                        <input
                            type="text"
                            id="talent-name"
                            v-model="talentName"
                            placeholder="Talent Name"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                            hidden
                        />
                    </div>

                    <div>
                        <label for="full-name" class="block text-xs font-medium text-primary-gold"
                            >Full Name</label
                        >
                        <input
                            type="text"
                            id="full-name"
                            v-model="fullName"
                            placeholder="Full Name"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label for="your-email" class="block text-xs font-medium text-primary-gold"
                            >Email</label
                        >
                        <input
                            type="email"
                            id="your-email"
                            v-model="email"
                            placeholder="Email"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label for="your-phone" class="block text-xs font-medium text-primary-gold"
                            >Phone</label
                        >
                        <input
                            type="text"
                            id="your-phone"
                            v-model="phone"
                            placeholder="Phone"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label
                            for="your-subject"
                            class="block text-xs font-medium text-primary-gold"
                            >Subject</label
                        >
                        <input
                            type="text"
                            id="your-subject"
                            v-model="subject"
                            placeholder="Subject"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div class="col-span-full">
                        <label for="message" class="block text-xs font-medium text-primary-gold"
                            >Message</label
                        >
                        <textarea
                            id="message"
                            v-model="message"
                            placeholder="Message"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                </div>

                <!-- Submission Error Message -->
                <div
                    v-if="submissionError"
                    class="col-span-full mt-4 text-center text-red-600 text-sm"
                >
                    <p>Error: {{ submissionError }}</p>
                </div>

                <div class="m-auto mt-4 w-fit">
                    <button
                        type="submit"
                        :disabled="isLoading"
                        class="inline-flex w-full justify-center rounded bg-primary-gold px-5 py-3 text-sm font-medium text-white sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isLoading">Submitting...</span>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
