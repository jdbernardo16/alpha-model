<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Talent } from '@/types';

// Import necessary components
import LatestPostSlider from '@/components/slider/LatestPostSlider.vue';
import PartnerSlider from '@/components/slider/PartnerSlider.vue';

// TypeScript Interface for Talent

const route = useRoute();
const slug = route.params.slug as string | undefined;

const talent = ref<Talent | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const GET_TALENT_BY_SLUG = `
    query GetTalentBySlug($slug: ID!) {
        talent(id: $slug, idType: SLUG) {
            title
            uri
            ... on WithAcfTalentContent {
                talentContent {
                    frame1 {
                        backgroundImage {
                            node {
                                sourceUrl
                            }
                        }
                        fullName
                        location
                        tags
                    }
                    frame2 {
                        bannerImage {
                            node {
                                sourceUrl
                            }
                        }
                        bannerText
                        images {
                            nodes {
                                sourceUrl
                            }
                        }
                        partnersTitle
                        partners {
                            name
                            image {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                    }
                    frame3 {
                        frameTitle
                        portfolioImages {
                            nodes {
                                sourceUrl
                            }
                        }
                    }
                    frame4 {
                        title
                        description
                        storyImage {
                            node {
                                sourceUrl
                            }
                        }
                    }
                    frame5 {
                        bannerImage {
                            node {
                                sourceUrl
                            }
                        }
                        contactText
                    }
                    socialMedia {
                        icon {
                            node {
                                sourceUrl
                            }
                        }
                        link
                    }
                }
            }
        }
    }
`;

onMounted(async () => {
    if (!slug) {
        error.value = new Error('Slug is undefined');
        loading.value = false;
        return;
    }

    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_TALENT_BY_SLUG,
            variables: { slug },
        });

        if (response.data.errors) {
            throw new Error(response.data.errors.map((e: any) => e.message).join(', '));
        }

        talent.value = response.data.data.talent;
    } catch (err: any) {
        error.value = err;
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <section class="p-20 h-[120vh] relative">
        <div
            class="w-full h-full bg-[url(/images/adriana.png)] bg-fixed flex items-center justify-center bg-cover bg-center"
            :style="`background-image: url(${talent?.talentContent?.frame1?.backgroundImage?.node.sourceUrl})`"
        >
            <div class="text-center">
                <div
                    class="font-figtree text-white text-h1 uppercase"
                    v-html="talent?.talentContent?.frame1?.fullName"
                />
                <p class="text-white text-xl mb-10">
                    {{ talent?.talentContent?.frame1?.location }}
                </p>
                <p class="font-charmonman text-neutral-300 text-5xl">
                    {{ talent?.talentContent?.frame1?.tags }}
                </p>
            </div>
        </div>
        <div class="absolute top-1/2 -translate-y-1/2 space-y-5 right-0 pr-5">
            <a
                v-for="(social, index) in talent?.talentContent?.socialMedia"
                :key="index"
                :href="social.link"
                target="_blank"
                class="block"
            >
                <img :src="social?.icon?.node.sourceUrl" alt="tiktok" />
            </a>
        </div>
        <!-- <div class="absolute bottom-1/2 translate-y-[300px] left-1/2 z-[1]">
            <img src="/images/arrow-down.svg" alt="Arrow Down" />
        </div> -->
    </section>

    <section class="relative">
        <div
            class="w-full h-[420px] bg-fixed bg-cover bg-top"
            :style="`background-image: url(${talent?.talentContent?.frame2?.bannerImage?.node.sourceUrl})`"
        ></div>
        <div class="max-w-[1200px] m-auto relative w-full py-12">
            <div
                class="bg-black w-full h-[300px] pt-20 text-white text-center absolute -top-[200px]"
            >
                <div class="text-h1" v-html="talent?.talentContent?.frame2?.bannerText"></div>
            </div>
            <div class="relative">
                <LatestPostSlider :items="talent?.talentContent?.frame2?.images?.nodes" />
            </div>
        </div>
    </section>
    <section>
        <div class="text-center max-w-[1440px] m-auto">
            <h3 class="text-6xl mb-20" v-html="talent?.talentContent?.frame2?.partnersTitle"></h3>
            <div>
                <PartnerSlider :items="talent?.talentContent?.frame2?.partners" />
            </div>
        </div>
    </section>

    <section class="bg-neutral-100">
        <div class="max-w-[1440px] m-auto px-16 py-16">
            <div class="text-center mb-20">
                <h3 class="text-6xl" v-html="talent?.talentContent?.frame3?.frameTitle"></h3>
            </div>
            <div class="grid grid-cols-4 gap-5">
                <div
                    v-for="(image, index) in talent?.talentContent?.frame3?.portfolioImages?.nodes"
                    :key="index"
                >
                    <div class="aspect-w-[313] aspect-h-[363] overflow-hidden group">
                        <img
                            class="object-cover w-full h-full group-hover:scale-105 transition"
                            :src="image.sourceUrl"
                            alt="Adriana Iglesias"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="px-16 max-w-[1440px] m-auto pb-[120px]">
            <div class="flex">
                <div class="w-1/2 space-y-10 pt-20">
                    <div>
                        <p class="text-[4rem]" v-html="talent?.talentContent?.frame4?.title"></p>
                    </div>
                    <div class="pr-20" v-html="talent?.talentContent?.frame4?.description"></div>
                </div>
                <div class="w-1/2 px-10">
                    <div class="aspect-w-[616] aspect-h-[885] relative">
                        <div>
                            <div
                                class="bg-black w-full h-full absolute top-10 right-10 z-[1]"
                            ></div>
                        </div>
                        <img
                            class="object-cover z-[2]"
                            :src="talent?.talentContent?.frame4?.storyImage?.node.sourceUrl"
                            alt="image"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div
            class="w-full h-[420px] bg-cover bg-fixed bg-top"
            :style="`background-image: url(${talent?.talentContent?.frame5?.bannerImage?.node.sourceUrl})`"
        ></div>
        <div class="max-w-[1034px] m-auto -translate-y-20">
            <div class="w-full p-[50px] bg-neutral-100">
                <p class="text-6xl text-center mb-20"><b>TOUCH</b> BASE</p>

                <div class="flex space-x-10">
                    <div class="w-4/12">
                        <div class="flex items-center space-x-6 mb-6">
                            <a
                                v-for="(social, index) in talent?.talentContent?.socialMedia"
                                :key="index"
                                :href="social.link"
                                target="_blank"
                            >
                                <img :src="social?.icon?.node.sourceUrl" alt="tiktok" />
                            </a>
                        </div>
                        <div v-html="talent?.talentContent?.frame5?.contactText"></div>
                    </div>
                    <div class="w-8/12 space-y-5">
                        <input
                            type="text"
                            placeholder="Name"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        />

                        <input
                            type="text"
                            placeholder="Email"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        />

                        <textarea
                            type="text"
                            placeholder="Message"
                            rows="5"
                            class="w-full p-4 bg-black placeholder:text-white text-white"
                        ></textarea>

                        <div class="flex justify-end w-full">
                            <button class="text-white bg-black py-4 px-10">SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
