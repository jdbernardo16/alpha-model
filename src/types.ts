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
