export interface HomePageData {
    frame1: {
        header: string;
        description: string;
        buttonText: string;
        buttonLink: string;
        image: {
            node: {
                id: string;
                sourceUrl: string;
                srcSet: string;
                altText: string;
            };
        };
    };
    frame2: {
        title: string;
    };
    frame3: {
        values: Array<{
            icon: {
                node: {
                    sourceUrl: string;
                };
            };
            title: string;
            shortDescription: string;
        }>;
    };
    frame4: {
        header: string;
        description: string;
        events: {
            title: string;
            link: string;
            image: {
                node: {
                    sourceUrl: string;
                };
            };
        }[];
    };
    frame6: {
        header: string;
        description: string;
        projects: {
            title: string;
            image: {
                node: {
                    sourceUrl: string;
                };
            };
        };
    };
    frame7: {
        partners: {
            name: string;
            image: {
                node: {
                    sourceUrl: string;
                };
            };
        }[];
    };
}

export interface FeaturedTalentData {
    id: string;
    title: string;
    isFeatured: boolean;
    slug: string;
    talentContent?: {
        thumbnail?: {
            node: {
                sourceUrl: string;
            };
        };
        frame1?: {
            location: string;
            tags: string;
        };
    };
}

export interface Talent {
    title: string;
    uri: string;
    talentContent?: {
        frame1?: {
            backgroundImage?: { node: { sourceUrl: string } };
            fullName?: string;
            location?: string;
            tags?: string;
        };
        frame2?: {
            bannerImage?: { node: { sourceUrl: string } };
            bannerText?: string;
            images?: { nodes: { sourceUrl: string }[] };
            partnersTitle?: string;
            partners?: {
                name: string;
                image?: { node: { sourceUrl: string } };
            }[];
        };
        frame3?: {
            frameTitle?: string;
            portfolioImages?: { nodes: { sourceUrl: string }[] };
        };
        frame4?: {
            title?: string;
            description?: string;
            storyImage?: { node: { sourceUrl: string } };
        };
        frame5?: {
            bannerImage?: { node: { sourceUrl: string } };
            contactText?: string;
        };
        socialMedia?: {
            icon?: { node: { sourceUrl: string } };
            link?: string;
        }[];
    };
}
