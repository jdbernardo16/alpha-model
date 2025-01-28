<template>
    <section>
        <div
            v-if="loading"
            class="max-w-[1440px] m-auto py-10 px-4 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10"
        >
            <!-- Skeleton Loader -->
            <div v-for="n in 8" :key="n" class="group">
                <div
                    class="relative overflow-hidden shadow-lg aspect-w-[300] aspect-h-[400] bg-gray-200 animate-pulse"
                ></div>
                <div class="text-center mt-4 font-bold text-lg">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="max-w-[1440px] m-auto py-10 px-4 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10"
        >
            <!-- Model Card -->
            <router-link
                v-for="talent in talents"
                :key="talent.slug"
                :to="{ name: 'talent-view', params: { slug: talent.slug } }"
                class="group"
            >
                <div class="relative overflow-hidden shadow-lg aspect-w-[300] aspect-h-[400]">
                    <img
                        :src="talent.talentContent.thumbnail.node.sourceUrl"
                        :alt="talent.title"
                        class="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-[#E3007A]/80 to-[#7D0043]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <div class="absolute bottom-0 w-full p-4 text-white font-bold">
                            <p class="text-lg">{{ talent.talentContent.frame1.location }}</p>
                            <p class="text-sm">{{ talent.talentContent.frame1.tags }}</p>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-4 font-bold text-lg">
                    <h3>{{ talent.title }}</h3>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Talent } from '@/types';

const GET_TALENTS = `
    query GetTalents {
  talents {
    nodes {
      title
      slug
  		... on WithAcfTalentContent {
        talentContent {
          thumbnail {
            node {
              sourceUrl
            }
          }
          frame1 {
            location
            tags
          }
        }
      }
  	}
  }
}
`;

const talents = ref<Talent[] | null>(null);
const loading = ref(true);

const error = ref<Error | null>(null);
onMounted(async () => {
    try {
        const response = await axios.post('http://localhost:8000/graphql', {
            query: GET_TALENTS,
        });
        talents.value = response.data.data.talents.nodes;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});
</script>
