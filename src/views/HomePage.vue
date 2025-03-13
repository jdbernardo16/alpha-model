<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { HomePageData, FeaturedTalentData } from '../types';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import FeaturedModelSlider from '@/components/slider/FeaturedModelSlider.vue';
import ProjectSlider from '@/components/slider/ProjectSlider.vue';
import PartnerSlider from '../components/slider/PartnerSlider.vue';
import HeroBanner from '../components/slider/HeroBanner.vue';
import NewsSlider from '../components/slider/NewsSlider.vue';
import ProjectForm from '../components/general/ProjectForm.vue';

const GET_HOME = `
    query getHome {
        page(id: "home", idType: URI) {
            id
            title
            slug
            ... on WithAcfHomepage {
                homepage {
                    frame1 {
                        header
                        description
                        buttonText
                        buttonLink
                        image {
                            node {
                                id
                                sourceUrl
                                srcSet
                                altText
                            }
                        }
                    }
                    frame2 {
                        title
                    }
                    frame3 {
                        values {
                            icon {
                                node {
                                    sourceUrl
                                }
                            }
                            title
                            shortDescription
                        }
                    }
                    frame4 {
                        header
                        description
                        events {
                            title
                            link
                            image {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                    }
                    frame6 {
                        header
                        description
                        projects {
                            image {
                                node {
                                    sourceUrl
                                }
                            }
                            title
                        }
                    }
                    frame7 {
                        partners {
                            name
                            image {
                                node {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const GET_FEATURED_TALENTS = `
  query GetFeaturedTalents {
    featuredTalents {
      nodes {
        id
        title
        isFeatured
        slug
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
`;

const cms = ref<HomePageData | null>(null);
const featuredTalent = ref<FeaturedTalentData | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

onMounted(async () => {
    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_HOME,
        });
        cms.value = response.data.data.page.homepage as HomePageData;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }

    try {
        const response = await axios.post('https://admin.alphatalentmanagement.com/graphql', {
            query: GET_FEATURED_TALENTS,
        });
        featuredTalent.value = response.data.data.featuredTalents.nodes as FeaturedTalentData;
    } catch (err) {
        error.value = err as Error;
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <!-- Hero Section -->
    <hero-banner />
    <!-- <section class="lg:h-[calc(100vh-84px)] bg-[#1C1B1B] relative">
        <img
            class="w-full h-full absolute top-0 left-0"
            src="/images/herobackground.png"
            alt="UAT Hero Background"
        />
        <div
            class="relative z-[1] text-white flex lg:flex-row flex-col lg:space-x-20 lg:px-10 justify-between lg:space-y-0 space-y-10"
        >
            <div class="w-full lg:w-1/2 lg:px-0 px-4">
                <div class="w-full lg:w-[647px] pt-20 text-center lg:text-left">
                    <div class="mb-10">
                        <h1 class="text-[3rem] lg:text-h1 font-serif leading-tight mb-6">
                            {{ cms?.frame1?.header }}
                        </h1>
                        <p class="lg:text-lg max-w-[490px] lg:m-0 m-auto">
                            {{ cms?.frame1?.description }}
                        </p>
                    </div>
                    <div
                        class="flex lg:flex-row flex-col items-center lg:space-x-10 lg:space-y-0 space-y-10"
                    >
                        <a :href="cms?.frame1?.buttonLink">
                            <Button
                                class="uppercase font-bold bg-primary-gold p-5 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg"
                            >
                                <p>{{ cms?.frame1?.buttonText }}</p>
                                <ArrowRightIcon class="w-6 h-6" />
                            </Button>
                        </a>
                        <Button class="flex items-center space-x-4">
                            <img src="/images/play.svg" alt="play" />
                            <p>Play Video</p>
                        </Button>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-1/2 lg:bg-transparent bg-white">
                <div class="lg:w-[70%] m-auto">
                    <div
                        class="aspect-w-[482] aspect-h-[736] bg-primary-gold overflow-hidden rounded-b-full relative m-auto"
                    >
                        <div class="w-full h-full">
                            <img
                                class="w-full absolute bottom-0 left-0 object-contain"
                                :src="cms?.frame1?.image?.node.sourceUrl"
                                alt="image"
                            />

                            <img
                                src="/images/hero-arrow.svg"
                                alt="hero-arrow"
                                class="absolute top-14 right-4 w-[15%]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

    <!-- Featured Models -->
    <!-- <FeaturedModelSlider :items="featuredTalent" :header="cms?.frame2?.title" /> -->

    <!-- <section class="bg-white">
        <div class="max-w-[1024px] m-auto px-4 lg:px-10 py-10 lg:py-16">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-5 lg:w-auto w-fit m-auto">
                <div
                    v-for="(value, index) in cms?.frame3?.values"
                    :key="index"
                    class="flex items-center space-x-4"
                >
                    <img
                        class="w-10 h-10 object-cover"
                        :src="value.icon.node.sourceUrl"
                        alt="icon"
                    />
                    <div>
                        <h3 class="text-sm font-bold">{{ value.title }}</h3>
                        <p class="text-xs text-neutral-500">{{ value.shortDescription }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

    <section>
        <div class="max-w-[1440px] m-auto px-4 lg:px-20 py-10 lg:py-16">
            <p class="text-xl font-bold mb-6 lg:hidden block font-serif text-primary-gold">
                OUR MISSION
            </p>
            <div
                class="flex lg:flex-row flex-col items-center justify-between lg:space-x-20 lg:space-y-0 space-y-10"
            >
                <div class="w-full lg:w-1/2">
                    <div class="aspect-w-1 aspect-h-1 overflow-hidden">
                        <img class="w-full object-cover" src="/images/item5.jpg" alt="mission" />
                    </div>
                </div>
                <div class="w-full lg:w-1/2">
                    <div class="mb-6">
                        <p
                            class="text-xl font-bold mb-3 lg:block hidden font-serif text-primary-gold"
                        >
                            OUR MISSION
                        </p>
                    </div>
                    <div>
                        <p>
                            Our mission is to discover, develop, and connect exceptional talent with
                            top opportunities in entertainment, fashion, and media.
                            <br /><br />
                            We are committed to nurturing creativity, professionalism, and
                            individuality while building strong industry relationships. Through
                            strategic guidance and dedicated support, we empower our talent to
                            achieve their fullest potential and make a lasting impact.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- <section class="bg-white">
        <div class="max-w-[1440px] m-auto px-4 lg:px-10 py-10">
            <div class="max-w-[536px] text-center m-auto mb-16">
                <h2 class="font-serif text-4xl mb-6">{{ cms?.frame4?.header }}</h2>
                <p>
                    {{ cms?.frame4?.description }}
                </p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div v-for="(item, index) in cms?.frame4?.events" :key="index">
                    <div
                        class="aspect-w-[431] aspect-h-[485] rounded-lg overflow-hidden group/gallery"
                    >
                        <img
                            class="w-full h-full object-cover"
                            :src="item.image.node.sourceUrl"
                            alt="image"
                        />
                        <div
                            class="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 flex items-center justify-end flex-col text-white space-y-4 p-6 opacity-0 group-hover/gallery:opacity-100 transition"
                        >
                            <p>{{ item.title }}</p>
                            <a :href="item.link">
                                <Button
                                    class="uppercase font-bold bg-primary-gold p-5 flex items-center space-x-5 hover:bg-opacity-80 transition rounded-lg"
                                >
                                    <p>View Gallery</p>
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

    <!-- <section>
        <div class="max-w-[1440px] m-auto px-4 lg:px-10 py-10 lg:py-16">
            <p class="text-xl font-bold mb-6 lg:hidden block">Blogs</p>
            <div
                class="flex lg:flex-row flex-col items-center justify-between lg:space-x-10 lg:space-y-0 space-y-10"
            >
                <div class="w-full lg:w-1/2">
                    <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                        <img class="w-full object-cover" src="/images/blog1.png" alt="blog" />
                    </div>
                </div>
                <div class="w-full lg:w-1/2">
                    <div class="mb-6">
                        <p class="text-xl font-bold mb-3 lg:block hidden">Blogs</p>
                        <h3 class="text-3xl font-serif mb-3 line-clamp-2">
                            Empowerment for Models:5 Ways to Prioritize Self Care for prolonged your
                            career as a model
                        </h3>
                        <p class="text-xs text-neutral-500">Nov 6, 2024</p>
                    </div>
                    <div class="mb-6">
                        <p class="line-clamp-4">
                            Being a model is more than just looking good and striking a pose—it is a
                            demanding career that requires hard work, dedication, and perseverance.
                            In an industry that often focuses on external appearance, it is
                            essential for models to prioritize their mental and physical health.
                            This article will provide you with five ways to prioritize self-care for
                            prolonged your career as a model.
                        </p>
                    </div>
                    <div class="flex items-center space-x-3 text-primary-gold cursor-pointer">
                        <p>Learn more</p>
                        <ArrowRightIcon class="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    </section> -->

    <news-slider />

    <!-- <ProjectSlider :items="cms?.frame6" />

    <PartnerSlider :items="cms?.frame7?.partners" /> -->

    <ProjectForm />
</template>
