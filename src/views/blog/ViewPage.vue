<template>
    <div class="max-w-4xl mx-auto px-4 py-12">
        <!-- Back to blog link -->
        <div class="mb-8">
            <router-link
                to="/blogs"
                class="inline-flex items-center text-gray-600 hover:text-black transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back to Blog
            </router-link>
        </div>

        <!-- Blog Post Header -->
        <div class="mb-8">
            <div class="text-sm text-gray-500 uppercase tracking-wider mb-3">
                {{ formatDate(post.date) }} • {{ post.category }}
            </div>
            <h1 class="text-4xl font-light mb-6">{{ post.title }}</h1>
            <div class="flex items-center">
                <img
                    :src="`https://picsum.photos/id/${100 + parseInt(post.id)}/100/100`"
                    :alt="post.author"
                    class="w-10 h-10 rounded-full object-cover mr-3"
                />
                <span class="text-sm">By {{ post.author }}</span>
            </div>
        </div>

        <!-- Featured Image -->
        <div class="mb-10">
            <img :src="post.image" :alt="post.title" class="w-full h-auto object-cover" />
        </div>

        <!-- Blog Content -->
        <div class="prose prose-lg max-w-none mb-12">
            <p>
                Creating a professional modeling portfolio is essential for success in the industry.
                Whether you're just starting out or looking to update your existing portfolio,
                having the right elements can make all the difference in catching the attention of
                agencies and clients.
            </p>

            <h2>Choose the Right Photographer</h2>
            <p>
                The quality of your photos is paramount. Working with a photographer who specializes
                in model portfolios ensures you'll get images that meet industry standards. Research
                photographers, review their work, and select someone whose style aligns with your
                goals.
            </p>

            <h2>Variety is Key</h2>
            <p>Your portfolio should showcase your versatility. Include a mix of:</p>
            <ul>
                <li>Headshots: Clear, simple shots that highlight your facial features</li>
                <li>Full-body shots: To display your physique and proportions</li>
                <li>Editorial images: Stylized photos that tell a story</li>
                <li>Commercial looks: Approachable, marketable images for advertising</li>
                <li>Different expressions: Showing your range of emotions and expressions</li>
            </ul>

            <h2>Keep it Current</h2>
            <p>
                Update your portfolio regularly with fresh images. The fashion industry evolves
                quickly, and your portfolio should reflect current trends and your most recent look.
                Replace older photos with new ones that better represent your current appearance and
                abilities.
            </p>

            <h2>Quality Over Quantity</h2>
            <p>
                It's better to have 10-15 exceptional photos than 30 mediocre ones. Each image
                should serve a purpose and demonstrate something unique about you. Be selective and
                include only your strongest work.
            </p>

            <h2>Minimal Editing</h2>
            <p>
                While basic retouching is standard, excessive editing can misrepresent your actual
                appearance. Agencies and clients want to see the real you, so keep editing natural
                and authentic.
            </p>

            <blockquote>
                "Your portfolio is your visual resume. Make every image count and ensure it
                represents not just how you look, but who you are as a model."
            </blockquote>

            <h2>Conclusion</h2>
            <p>
                Building an effective modeling portfolio takes time and investment, but the results
                are worth it. By following these guidelines, you'll create a portfolio that not only
                showcases your best features but also positions you as a professional in the
                industry.
            </p>
        </div>

        <!-- Share Section -->
        <div class="border-t border-b border-gray-200 py-6 mb-12">
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-700">Share this article</div>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                            />
                        </svg>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-blue-800 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            />
                        </svg>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-red-600 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Related Posts -->
        <div class="mb-8">
            <h3 class="text-xl font-medium mb-6">You might also like</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="group">
                    <div class="overflow-hidden mb-3">
                        <img
                            :src="relatedPost.image"
                            :alt="relatedPost.title"
                            class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <h4
                        class="text-base font-medium mb-2 group-hover:text-gray-700 transition-colors"
                    >
                        {{ relatedPost.title }}
                    </h4>
                    <router-link
                        :to="`/blog/${relatedPost.slug}`"
                        class="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                        Read Article
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = computed(() => route.params.slug);

// Sample blog post data - in a real app, this would come from an API
const post = {
    id: '1',
    title: 'How to Build Your Modeling Portfolio',
    slug: 'how-to-build-modeling-portfolio',
    excerpt:
        'Creating a professional modeling portfolio is essential for success in the industry. Learn the key elements that will make your portfolio stand out to agencies and clients.',
    image: 'https://picsum.photos/id/1011/1200/600',
    date: '2025-02-15',
    author: 'Sarah Johnson',
    category: 'Modeling Tips',
};

// Sample related posts
const relatedPosts = ref([
    {
        id: '2',
        title: 'Top Fashion Trends for Spring 2025',
        slug: 'fashion-trends-spring-2025',
        excerpt:
            'Stay ahead of the fashion curve with our comprehensive guide to the hottest trends for the upcoming spring season.',
        image: 'https://picsum.photos/id/1013/600/400',
        date: '2025-02-10',
        author: 'Michael Torres',
        category: 'Fashion',
    },
    {
        id: '3',
        title: 'Interview with Rising Star Aaron Enos',
        slug: 'interview-aaron-enos',
        excerpt:
            'We sat down with model and actor Aaron Enos to discuss his journey in the industry, recent projects, and future aspirations.',
        image: 'https://picsum.photos/id/1012/600/400',
        date: '2025-02-05',
        author: 'Emma Richards',
        category: 'Interviews',
    },
    {
        id: '4',
        title: 'Navigating International Modeling Contracts',
        slug: 'international-modeling-contracts',
        excerpt:
            "International opportunities can be exciting but come with their own set of challenges. Here's what you need to know about working abroad.",
        image: 'https://picsum.photos/id/1014/600/400',
        date: '2025-01-28',
        author: 'David Martinez',
        category: 'Business',
    },
]);

// Comment form
const commentForm = ref({
    name: '',
    email: '',
    comment: '',
});

// Format date
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Submit comment
const submitComment = () => {
    // In a real application, this would send the comment to your backend
    console.log('Comment submitted:', commentForm.value);
    // Reset form after submission
    commentForm.value = {
        name: '',
        email: '',
        comment: '',
    };
    alert('Comment submitted successfully!');
};
</script>
