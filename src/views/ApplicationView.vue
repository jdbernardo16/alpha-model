<template>
    <div class="min-h-screen bg-black text-white font-sans">
        <div class="max-w-4xl mx-auto p-6 relative overflow-hidden">
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
                                    class="w-full bg-transparent border-none focus:outline-none"
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
                        @click="$refs.fileInput.click()"
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

                <!-- Submit Button -->
                <div class="text-center">
                    <button
                        type="submit"
                        class="inline-block bg-white text-black font-bold py-4 px-8 rounded-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-black"
                    >
                        SUBMIT APPLICATION
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue';
import { useCountries } from '../composables/useCountries';

const { countries } = useCountries();

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

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const submitForm = () => {
    console.log('Form submitted:', form);
    console.log('Files:', selectedFiles.value);

    // Here you would add your API submission logic
    // Example:
    // const formData = new FormData();
    // Object.entries(form).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // selectedFiles.value.forEach(file => {
    //   formData.append('files', file);
    // });
    //
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   body: formData
    // });
};
</script>
