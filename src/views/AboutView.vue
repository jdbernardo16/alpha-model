<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <!-- Hero Section -->
        <div class="relative h-96 overflow-hidden">
            <!-- Background Image -->
            <div
                class="absolute inset-0 bg-cover bg-top"
                style="
                    background-image: url('https://i.pinimg.com/736x/83/62/22/836222b43fa1db97d002d9e62d8c1413.jpg');
                    filter: brightness(0.85) grayscale(100%);
                "
            ></div>

            <!-- Content Overlay -->
            <div class="absolute inset-0 flex flex-col items-center justify-center p-6">
                <h1 class="text-5xl font-bold mb-4 text-center text-primary-gold">
                    Alpha Aesthetics
                </h1>
                <p class="text-xl font-light max-w-2xl text-center text-white">
                    Premier Talent Management in Newport Beach
                </p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-6xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <!-- Image Side -->
                <div class="rounded-lg overflow-hidden shadow-xl">
                    <img
                        src="/images/model1.png"
                        alt="Newport Beach"
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- Content Side -->
                <div>
                    <h2 class="text-3xl font-bold mb-6 text-gray-900">About Us</h2>

                    <div class="space-y-4 text-gray-800">
                        <p class="leading-relaxed">
                            Located just outside of Los Angeles, Alpha Aesthetics Talent Management
                            is a premier talent management based in the vibrant and scenic Newport
                            Beach. Our location offers the best of both worlds – close enough to the
                            action of LA, yet far enough to enjoy the peaceful and relaxed
                            atmosphere of the stunning Newport Beach coastline.
                        </p>

                        <p class="leading-relaxed">
                            We specialize in representing top talent, including models, actors, and
                            influencers, and are committed to providing them with the resources,
                            guidance, and opportunities they need to succeed in the competitive
                            entertainment and fashion industries.
                        </p>

                        <p class="leading-relaxed">
                            Our team is passionate about empowering our clients to reach their full
                            potential while maintaining a balanced lifestyle in one of the most
                            beautiful and dynamic areas of Southern California.
                        </p>

                        <p class="leading-relaxed">
                            We believe in building lasting relationships, fostering creativity, and
                            connecting our talent with the best opportunities available. Whether
                            you're just starting out or are an established professional, we're here
                            to help you navigate your career and achieve your goals.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Contact CTA -->
            <div class="mt-24 bg-gray-100 rounded-2xl p-12 text-center">
                <h2 class="text-3xl font-bold mb-4 text-gray-800">Ready to Work With Us?</h2>
                <p class="text-gray-600 max-w-2xl mx-auto mb-8">
                    Whether you're looking for representation or seeking talent for your next
                    project, we're here to help bring your vision to life.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/become-a-talent">
                        <button
                            class="bg-primary-gold hover:bg-gray-900 text-white py-3 px-8 rounded-full font-medium transition duration-300"
                        >
                            Become a Talent
                        </button>
                    </a>
                    <a href="/#contact">
                        <button
                            class="bg-white hover:bg-gray-100 text-primary-gold border border-primary-gold py-3 px-8 rounded-full font-medium transition duration-300"
                        >
                            Contact Us
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Vue 3 script setup - add any component logic here
</script>
