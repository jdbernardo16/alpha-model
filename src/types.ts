export interface HomePageData {
    page: {
        id: string;
        title: string;
        slug: string;
        homepage: {
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
