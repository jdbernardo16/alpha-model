<template>
    <section>
        <div class="max-w-[1440px] py-10 px-4 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
            <!-- Model Card -->
            <router-link 
                v-for="model in models" 
                :key="model.id" 
                :to="{ name: 'model-view', params: { id: model.id }}"
                class="group"
            >
                <div class="relative overflow-hidden shadow-lg aspect-w-[300] aspect-h-[400]">
                    <img
                        :src="model.image"
                        :alt="model.name"
                        class="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-[#E3007A]/80 to-[#7D0043]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <div class="absolute bottom-0 w-full p-4 text-white font-bold">
                            <p class="text-lg">{{ model.location }}</p>
                            <p class="text-sm">{{ model.tags }}</p>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4 font-bold text-lg">
                    <h3>{{ model.name }}</h3>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
const models = [
    {
        id: 1,
        name: 'Tyler Charly',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model1.png',
    },
    {
        id: 2,
        name: 'Kristine Kay Larsen',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model2.png',
    },
    {
        id: 3,
        name: 'Adriana Iglesias',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model3.png',
    },
    {
        id: 4,
        name: 'Janica Cabalar',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model4.png',
    },
    {
        id: 5,
        name: "Maya Daniella O'Campo",
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model5.png',
    },
    {
        id: 6,
        name: 'Chelsea Thomson',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model6.png',
    },
    {
        id: 7,
        name: 'Teresa Nguyen',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model7.png',
    },
    {
        id: 8,
        name: 'Babydoll Villegas',
        location: 'Oswego, NY',
        tags: 'Model | Actress | Content Creator',
        image: '/images/model8.png',
    },
];
</script>
