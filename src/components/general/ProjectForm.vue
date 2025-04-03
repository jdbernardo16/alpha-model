<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
    cms?: {
        title: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };
}
defineProps<IProps>();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const news = ref(false);
const projectDetails = ref('');
const talentDescription = ref('');
const location = ref('');
const shootDate = ref('');

const isLoading = ref(false);
const showSuccessModal = ref(false);
const submissionError = ref<string | null>(null);

const handleSubmit = async () => {
    isLoading.value = true;
    submissionError.value = null;
    showSuccessModal.value = false;

    const wpFormData = new FormData();
    // --- Add Contact Form 7 specific hidden fields ---
    // Adjust _wpcf7 value to your specific form ID if different
    wpFormData.append('_wpcf7', '189');
    wpFormData.append('_wpcf7_version', '5.8.5'); // Use the version installed on your WP site
    wpFormData.append('_wpcf7_locale', 'en_US'); // Adjust if your site uses a different locale
    // Adjust unit tag based on form ID
    wpFormData.append('_wpcf7_unit_tag', 'wpcf7-f189-o1');
    wpFormData.append('_wpcf7_container_post', '0'); // Usually 0 unless embedded in a specific post

    // --- Append form data ---
    // !! IMPORTANT: Ensure these keys match the 'name' attributes in your Contact Form 7 form tag !!
    wpFormData.append('first-name', firstName.value); // Example key, adjust if needed
    wpFormData.append('last-name', lastName.value); // Example key, adjust if needed
    wpFormData.append('your-email', email.value); // Common CF7 key for email
    // Only append phone if it has a value, as it's not strictly required
    if (phone.value) {
        wpFormData.append('your-phone', phone.value);
    }
    wpFormData.append('your-project', projectDetails.value); // Corrected key based on CF7 shortcode
    wpFormData.append('talent-needed', talentDescription.value); // Corrected key based on CF7 shortcode
    wpFormData.append('shoot-location', location.value); // Example key, adjust if needed
    wpFormData.append('shoot-date', shootDate.value); // Example key, adjust if needed

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/189/feedback`,
            {
                method: 'POST',
                body: wpFormData,
            },
        );

        const data = await response.json();

        if (data.status === 'mail_sent') {
            console.log('Form submitted successfully:', data);
            showSuccessModal.value = true;
            // Optionally reset form fields
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            phone.value = '';
            projectDetails.value = '';
            talentDescription.value = '';
            location.value = '';
            shootDate.value = '';
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
                    Your project details have been submitted successfully. We will get back to you
                    soon.
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
        <div class="mx-auto max-w-[1440px] px-4 py-16 sm:px-20 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h1 class="text-2xl font-bold sm:text-3xl">
                    {{ cms?.title }}
                </h1>

                <div class="mt-4 text-gray-500 wysiwyg" v-html="cms?.description" />
                <!-- <p class="mt-4 text-gray-500" v-html="cms?.description"></p>
                    Fill out the form below with your project details or email
                    <a
                        href="mailto:admin@alphatalentmanagement.com"
                        target="_blank"
                        rel="noreferrer"
                        class="text-primary-gold hover:text-yellow-500"
                        >admin@alphatalentmanagement.com</a
                    >
                    and we’ll connect you with the right talent! <br /><br />First Name, Last Name,
                    Phone, Details about the project, description of talent needed, location of
                    shoot and shoot date
                </p> -->
            </div>

            <form @submit.prevent="handleSubmit" class="mx-auto mt-8 mb-0 max-w-2xl">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                    <div>
                        <label for="first_name" class="block text-xs font-medium text-gray-700"
                            >First Name</label
                        >
                        <input
                            type="text"
                            id="first_name"
                            v-model="firstName"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div>
                        <label for="last_name" class="block text-xs font-medium text-gray-700"
                            >Last Name</label
                        >
                        <input
                            type="text"
                            id="last_name"
                            v-model="lastName"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div class="col-span-full">
                        <label for="email" class="block text-xs font-medium text-gray-700"
                            >Email</label
                        >
                        <input
                            type="email"
                            id="email"
                            v-model="email"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                            required
                        />
                    </div>

                    <div class="col-span-full">
                        <label for="phone" class="block text-xs font-medium text-gray-700"
                            >Phone</label
                        >
                        <input
                            type="number"
                            id="phone"
                            v-model="phone"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                    </div>

                    <!-- <div class="col-span-full">
                        <label for="news" class="relative flex items-start">
                            <input
                                type="checkbox"
                                id="news"
                                v-model="news"
                                class="mt-1 h-4 w-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold"
                            />

                            <div class="ml-3 text-sm">
                                <span class="block font-medium text-gray-700">
                                    Sign up for news and updates
                                </span>
                            </div>
                        </label>
                    </div> -->

                    <div class="col-span-full">
                        <label for="project_details" class="block text-xs font-medium text-gray-700"
                            >Briefly Describe Your Project:</label
                        >
                        <textarea
                            id="project_details"
                            v-model="projectDetails"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        ></textarea>
                    </div>

                    <div class="col-span-full">
                        <label
                            for="talent_description"
                            class="block text-xs font-medium text-gray-700"
                            >Description of Talent Needed:</label
                        >
                        <textarea
                            id="talent_description"
                            v-model="talentDescription"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        ></textarea>
                    </div>

                    <div>
                        <label for="location" class="block text-xs font-medium text-gray-700"
                            >Location of Shoot:</label
                        >
                        <input
                            type="text"
                            id="location"
                            v-model="location"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
                    </div>

                    <div>
                        <label for="shoot_date" class="block text-xs font-medium text-gray-700"
                            >Shoot Date:</label
                        >
                        <input
                            type="date"
                            id="shoot_date"
                            v-model="shootDate"
                            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2"
                        />
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
