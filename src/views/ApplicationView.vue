<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useCountries } from '../composables/useCountries';

const { countries } = useCountries();

const isLoading = ref(false);
const showSuccessModal = ref(false);
const submissionError = ref<string | null>(null);

interface FormData {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    ethnicity: string;
    instagram: string;
}

const form = reactive<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'United States',
    ethnicity: '',
    instagram: '',
});

const selectedFiles = ref<File[]>([]);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        selectedFiles.value = Array.from(target.files);
    }
};

const handleFileDrop = (event: DragEvent) => {
    if (event.dataTransfer?.files) {
        selectedFiles.value = Array.from(event.dataTransfer.files);
    }
};

const triggerFileInputClick = () => {
    // Use optional chaining for safety, in case the ref isn't attached yet
    fileInput.value?.click();
};

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const submitForm = async () => {
    isLoading.value = true;
    submissionError.value = null;
    showSuccessModal.value = false;

    const wpFormData = new FormData();

    // --- Add Contact Form 7 specific hidden fields ---
    wpFormData.append('_wpcf7', '665'); // Form ID from user request
    wpFormData.append('_wpcf7_version', '5.8.5'); // Assuming same version as ProjectForm, adjust if needed
    wpFormData.append('_wpcf7_locale', 'en_US'); // Adjust if needed
    wpFormData.append('_wpcf7_unit_tag', 'wpcf7-f665-o1'); // Unit tag based on form ID 665
    wpFormData.append('_wpcf7_container_post', '0'); // Usually 0

    // --- Append form data (map keys from `form` to CF7 names) ---
    wpFormData.append('first-name', form.firstName);
    wpFormData.append('last-name', form.lastName);
    wpFormData.append('gender', form.gender);
    wpFormData.append('birth-date', form.dob); // Assuming 'dob' maps to 'birth-date'
    wpFormData.append('your-email', form.email);
    wpFormData.append('phone', form.phone);
    wpFormData.append('city', form.city);
    wpFormData.append('state-province', form.state); // Assuming 'state' maps to 'state-province'
    wpFormData.append('country', form.country);
    wpFormData.append('ethnicity', form.ethnicity);
    if (form.instagram) {
        wpFormData.append('instagram-username', form.instagram);
    }

    // --- Append file attachments ---
    selectedFiles.value.forEach((file) => {
        // Use the name specified in the CF7 shortcode: 'file-attachement'
        wpFormData.append('file-attachment', file, file.name);
    });

    try {
        const response = await fetch(
            // Use VITE_API_BASE_URL from environment variables
            `${import.meta.env.VITE_API_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/665/feedback`,
            {
                method: 'POST',
                body: wpFormData,
                // Headers might not be needed if not sending JSON, but keep in mind for future API calls
                // headers: {
                //   // 'Content-Type': 'multipart/form-data' // Fetch API sets this automatically for FormData
                // },
            },
        );

        const data = await response.json();

        if (data.status === 'mail_sent') {
            console.log('Application submitted successfully:', data);
            showSuccessModal.value = true;
            // Optionally reset form fields
            Object.keys(form).forEach((key) => {
                if (key === 'country') {
                    form[key] = 'United States'; // Reset country to default
                } else {
                    (form as any)[key] = '';
                }
            });
            selectedFiles.value = [];
        } else {
            console.error('Application submission failed:', data.message, data);
            submissionError.value = data.message || 'Submission failed. Please try again.';
            // Check for validation errors
            if (data.invalid_fields && data.invalid_fields.length > 0) {
                submissionError.value = data.invalid_fields
                    .map((field: any) => `${field.field}: ${field.message}`) // Show field name with error
                    .join('\n');
                console.error('Validation errors:', data.invalid_fields);
            }
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        submissionError.value = 'An unexpected error occurred. Please try again later.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen bg-black text-white font-sans">
        <div class="max-w-4xl mx-auto p-6 relative overflow-hidden">
            <!-- Loading Indicator -->
            <div
                v-if="isLoading"
                class="fixed top-0 left-0 w-full h-screen inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 rounded-xl"
            >
                <div
                    class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-gold"
                ></div>
            </div>

            <!-- Success Modal -->
            <div
                v-if="showSuccessModal"
                class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]"
                @click.self="showSuccessModal = false"
            >
                <div
                    class="bg-gray-900 border border-primary-gold/30 p-8 rounded-lg shadow-xl text-center max-w-sm mx-4"
                >
                    <h3 class="text-xl font-bold mb-4 text-primary-gold">Success!</h3>
                    <p class="mb-6 text-gray-300">
                        Your application has been submitted successfully. We will get back to you
                        soon.
                    </p>
                    <button
                        @click="showSuccessModal = false"
                        class="inline-flex justify-center rounded bg-primary-gold px-5 py-2 text-sm font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-gold"
                    >
                        Close
                    </button>
                </div>
            </div>
            <!-- Decorative elements -->
            <div
                class="absolute -top-20 -right-20 w-64 h-64 bg-primary-gold opacity-20 rounded-full blur-3xl"
            ></div>
            <div
                class="absolute -bottom-32 -left-20 w-80 h-80 bg-pink-500 opacity-10 rounded-full blur-3xl"
            ></div>

            <!-- Header -->
            <div class="relative z-10 mb-12 text-center">
                <h1 class="text-4xl font-bold tracking-wider mb-6 text-primary-gold">
                    BECOME AN ALPHA TALENT!
                </h1>

                <p class="text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
                    Are you ready to take your career to the next level? At Alpha Aesthetics Talent
                    Management, we are always looking for fresh, unique talent in various fields,
                    including modeling, acting, and influencing.
                </p>

                <p class="text-gray-300 max-w-2xl mx-auto italic">
                    Fill out our online form with your details, including portfolio or photos (for
                    models and influencers) or demo reel (for actors).
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitForm" class="relative z-10">
                <!-- Personal Information -->
                <div
                    class="mb-10 backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl"
                >
                    <h2 class="text-xl font-semibold mb-6 flex items-center text-primary-gold">
                        <span class="mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </span>
                        PERSONAL INFORMATION
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Name -->
                        <div>
                            <input
                                type="text"
                                v-model="form.firstName"
                                placeholder="First Name"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                v-model="form.lastName"
                                placeholder="Last Name"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <!-- Gender & DOB -->
                        <div>
                            <select
                                v-model="form.gender"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent appearance-none transition"
                            >
                                <option value="" disabled selected>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <input
                                type="date"
                                v-model="form.dob"
                                placeholder="Date of Birth"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <!-- Contact -->
                        <div>
                            <input
                                type="email"
                                v-model="form.email"
                                placeholder="Email Address"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                v-model="form.phone"
                                placeholder="Phone Number"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <!-- Location -->
                        <div>
                            <input
                                type="text"
                                v-model="form.city"
                                placeholder="City"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                v-model="form.state"
                                placeholder="State/Province"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition"
                            />
                        </div>

                        <!-- Country & Ethnicity -->
                        <div>
                            <select
                                v-model="form.country"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent appearance-none transition"
                            >
                                <option value="" disabled selected>Country</option>
                                <option
                                    v-for="country in countries"
                                    :key="country"
                                    :value="country"
                                >
                                    {{ country }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <select
                                v-model="form.ethnicity"
                                class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent appearance-none transition"
                            >
                                <option value="" disabled selected>Ethnicity</option>
                                <option value="asian">Asian</option>
                                <option value="black">Black</option>
                                <option value="hispanic">Hispanic</option>
                                <option value="middle-eastern">Middle Eastern</option>
                                <option value="native-american">Native American</option>
                                <option value="pacific-islander">Pacific Islander</option>
                                <option value="white">White</option>
                                <option value="mixed">Mixed</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <!-- Social -->
                        <div class="md:col-span-2">
                            <div
                                class="flex items-center bg-black/50 border border-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-primary-gold focus-within:border-transparent transition"
                            >
                                <span class="text-gray-400 mr-2">@</span>
                                <input
                                    type="text"
                                    v-model="form.instagram"
                                    placeholder="Instagram Username"
                                    class="w-full bg-transparent border-none focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upload Files Section -->
                <div
                    class="mb-10 backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl"
                >
                    <h2 class="text-xl font-semibold mb-6 flex items-center text-primary-gold">
                        <span class="mr-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </span>
                        UPLOAD FILES (Images/Videos)
                    </h2>

                    <div
                        class="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-yellow-400 transition-colors cursor-pointer"
                        @click="triggerFileInputClick"
                        @dragover.prevent
                        @drop.prevent="handleFileDrop"
                    >
                        <input
                            ref="fileInput"
                            type="file"
                            multiple
                            class="hidden"
                            @change="handleFileUpload"
                            accept="image/*,video/*"
                        />

                        <div v-if="selectedFiles.length === 0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-12 w-12 mx-auto text-gray-400 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p class="text-lg mb-1 font-medium">
                                Drag files here or click to browse
                            </p>
                            <p class="text-gray-400 text-sm">
                                Upload your portfolio, headshots, or demo reels
                            </p>
                        </div>

                        <div v-else class="text-left">
                            <div class="flex items-center justify-between mb-4">
                                <p class="text-lg font-medium">
                                    Selected Files ({{ selectedFiles.length }})
                                </p>
                                <button
                                    type="button"
                                    @click.stop="selectedFiles = []"
                                    class="text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>

                            <ul class="space-y-2 max-h-40 overflow-y-auto">
                                <li
                                    v-for="(file, index) in selectedFiles"
                                    :key="index"
                                    class="flex items-center text-sm"
                                >
                                    <span class="mr-2">
                                        <svg
                                            v-if="file.type.includes('image')"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-4 w-4 text-blue-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <svg
                                            v-else-if="file.type.includes('video')"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-4 w-4 text-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </span>
                                    <span class="truncate">{{ file.name }}</span>
                                    <span class="ml-2 text-gray-500 text-xs"
                                        >({{ formatFileSize(file.size) }})</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Submission Error Message -->
                <div
                    v-if="submissionError"
                    class="mt-6 text-center text-red-400 text-sm whitespace-pre-line"
                >
                    <p>Error: {{ submissionError }}</p>
                </div>

                <!-- Submit Button -->
                <div class="text-center mt-8">
                    <button
                        type="submit"
                        :disabled="isLoading"
                        class="inline-block bg-white text-black font-bold py-4 px-8 rounded-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isLoading">SUBMITTING...</span>
                        <span v-else>SUBMIT APPLICATION</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
