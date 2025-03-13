<template>
    <div class="max-w-7xl mx-auto px-4 py-12">
        <!-- Blog Header -->
        <div class="mb-16">
            <h1 class="text-4xl font-light uppercase mb-6 tracking-wide">BLOG</h1>
            <div class="w-24 h-0.5 bg-black"></div>
        </div>

        <!-- Featured Post -->
        <div v-if="featuredPost" class="mb-20">
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="lg:w-2/3 relative overflow-hidden group">
                    <img
                        :src="featuredPost.image"
                        :alt="featuredPost.title"
                        class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                        class="absolute top-4 left-4 bg-black text-white text-xs uppercase tracking-widest py-1 px-3"
                    >
                        Featured
                    </div>
                </div>
                <div class="lg:w-1/3 flex flex-col justify-center">
                    <div class="text-sm text-gray-500 uppercase tracking-wider mb-3">
                        {{ formatDate(featuredPost.date) }}
                    </div>
                    <h2 class="text-3xl font-light mb-4">{{ featuredPost.title }}</h2>
                    <p class="text-gray-700 mb-6 line-clamp-4">{{ featuredPost.excerpt }}</p>
                    <router-link
                        :to="`/blogs/${featuredPost.slug}`"
                        class="inline-flex items-center text-black border-b border-black pb-1 hover:text-gray-700 hover:border-gray-700 transition-colors"
                    >
                        Read More
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Blog Post Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            <div v-for="post in posts" :key="post.id" class="group">
                <div class="overflow-hidden mb-4">
                    <img
                        :src="post.image"
                        :alt="post.title"
                        class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div class="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    {{ formatDate(post.date) }}
                </div>
                <h3 class="text-xl font-medium mb-3 group-hover:text-gray-700 transition-colors">
                    {{ post.title }}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>
                <router-link
                    :to="`/blogs/${post.slug}`"
                    class="inline-flex items-center text-black text-sm border-b border-black pb-0.5 hover:text-gray-700 hover:border-gray-700 transition-colors"
                >
                    Continue Reading
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </router-link>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center space-x-2 mt-12">
            <button
                class="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                :class="{ 'bg-black text-white': currentPage === 1 }"
                @click="changePage(1)"
            >
                1
            </button>
            <button
                v-for="page in totalPages"
                :key="page"
                v-show="page > 1"
                class="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                :class="{ 'bg-black text-white': currentPage === page }"
                @click="changePage(page)"
            >
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Simulated blog data
const allPosts = ref([
    {
        id: 1,
        title: 'How to Build Your Modeling Portfolio',
        slug: 'how-to-build-modeling-portfolio',
        excerpt:
            'Creating a professional modeling portfolio is essential for success in the industry. Learn the key elements that will make your portfolio stand out to agencies and clients.',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1011/800/500',
        date: '2025-02-15',
        author: 'Sarah Johnson',
        category: 'Modeling Tips',
    },
    {
        id: 2,
        title: 'Top Fashion Trends for Spring 2025',
        slug: 'fashion-trends-spring-2025',
        excerpt:
            'Stay ahead of the fashion curve with our comprehensive guide to the hottest trends for the upcoming spring season.',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1013/800/500',
        date: '2025-02-10',
        author: 'Michael Torres',
        category: 'Fashion',
    },
    {
        id: 3,
        title: 'Interview with Rising Star Aaron Enos',
        slug: 'interview-aaron-enos',
        excerpt:
            'We sat down with model and actor Aaron Enos to discuss his journey in the industry, recent projects, and future aspirations.',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1012/800/500',
        date: '2025-02-05',
        author: 'Emma Richards',
        category: 'Interviews',
    },
    {
        id: 4,
        title: 'Navigating International Modeling Contracts',
        slug: 'international-modeling-contracts',
        excerpt:
            "International opportunities can be exciting but come with their own set of challenges. Here's what you need to know about working abroad.",
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1014/800/500',
        date: '2025-01-28',
        author: 'David Martinez',
        category: 'Business',
    },
    {
        id: 5,
        title: 'The Art of Posing: Tips from Industry Photographers',
        slug: 'art-of-posing-tips',
        excerpt:
            'Master the fundamentals of posing with expert advice from photographers who have worked with top models and clients worldwide.',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1015/800/500',
        date: '2025-01-20',
        author: 'Jennifer Lopez',
        category: 'Photography',
    },
    {
        id: 6,
        title: 'Building Your Personal Brand on Social Media',
        slug: 'personal-brand-social-media',
        excerpt:
            "In today's digital age, your social media presence is crucial. Learn how to effectively showcase your work and personality online.",
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1018/800/500',
        date: '2025-01-15',
        author: 'Ryan Cooper',
        category: 'Digital Marketing',
    },
    {
        id: 7,
        title: "Healthy Eating on the Go: A Model's Guide",
        slug: 'healthy-eating-models-guide',
        excerpt:
            'Maintaining a balanced diet with a busy schedule can be challenging. Discover practical nutrition tips for models always on the move.',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: 'https://picsum.photos/id/1016/800/500',
        date: '2025-01-08',
        author: 'Olivia Chen',
        category: 'Lifestyle',
    },
]);

// Pagination
const postsPerPage = 6;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(allPosts.value.length / postsPerPage));

// Featured post is the most recent one
const featuredPost = computed(() => {
    return allPosts.value.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];
});

// Posts for the current page, excluding the featured post
const posts = computed(() => {
    const sorted = [...allPosts.value]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter((post) => post.id !== featuredPost.value.id);

    const startIndex = (currentPage.value - 1) * postsPerPage;
    return sorted.slice(startIndex, startIndex + postsPerPage);
});

// Change page
const changePage = (page: number) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Format date
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>
