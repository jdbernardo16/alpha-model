export interface HomePageData {
    frame1: {
        gallery: {
            nodes: {
                id: string;
                sourceUrl: string;
                srcSet: string;
                altText: string;
            }[];
        };
    };
    frame2: {
        image: {
            node: {
                id: string;
                sourceUrl: string;
                altText: string;
            };
        };
        title: string;
        description: string;
    };
    frame3: {
        title: string;
    };
    frame4: {
        title: string;
        description: string;
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
    slug: string;
    talentContent?: {
        frame1?: {
            fullName?: string;
            thumbnail?: {
                node: {
                    sourceUrl: string;
                    altText: string;
                    id: string;
                };
            };
            talents?: {
                label: string;
            }[];
            images?: {
                nodes: {
                    title: string;
                    sourceUrl: string;
                    srcSet: string;
                    altText: string;
                }[];
            };
            attributes?: {
                bust?: string;
                cup?: string;
                dress?: string;
                eyes?: string;
                hair?: string;
                height?: string;
                hip?: string;
                shoes?: string;
                waist?: string;
            };
            address?: string;
        };
        frame2?: {
            title?: string;
            description?: string;
        };
        frame3?: {
            title?: string;
            description?: string;
        };
    };
}

export interface FeaturedTalent {
    id: string;
    title: string;
    isFeatured: boolean;
    slug: string;
    talentContent?: {
        frame1?: {
            fullName?: string;
            thumbnail?: {
                node: {
                    sourceUrl: string;
                    altText?: string; // Make altText optional as it might not always be there
                    id: string;
                };
            };
            talents?: {
                label: string;
            }[];
            address?: string;
        };
        frame2?: {
            description?: string;
        };
        contactDetails?: {
            socialMedia?: {
                icon?: {
                    node: {
                        sourceUrl: string;
                    };
                };
                link?: string;
            }[];
        };
    };
}

export interface PromoEventsData {
    defaultBanner: {
        eyebrow: string;
        title: string;
        description: string;
        showThisFrame: boolean;
    };
    upcomingEvents: {
        title: string;
        description: string;
        eventDateAndTime: string;
        showThisFrame: boolean;
        background: {
            node: {
                id: string;
                sourceUrl: string;
                srcSet: string;
                altText: string;
            };
        };
    };
    pastEvents: {
        header: string;
        title: string;
        description: string;
        events: {
            thumbnail: {
                node: {
                    id: string;
                    sourceUrl: string;
                    srcSet: string;
                    altText: string;
                };
            };
            date: string;
            title: string;
            subHeader: string;
            details: string;
            gallery: {
                nodes: {
                    id: string;
                    sourceUrl: string;
                    srcSet: string;
                    altText: string;
                }[];
            };
        }[];
    };
    highlights: {
        title: string;
        description: string;
        highlightGallery: {
            nodes: {
                id: string;
                sourceUrl: string;
                srcSet: string;
                altText: string;
                title: string;
            }[];
        };
    };
    faqs: {
        title: string;
        description: string;
        buttonText: string;
        faqItems: {
            question: string;
            answer: string;
        }[];
    };
}

interface ImageNode {
    id: string;
    sourceUrl: string;
    altText?: string;
}

export interface Header {
    logo?: {
        node: ImageNode;
    };
    // Add other header fields if needed based on the query
}

// Type definitions for Blog Posts based on getBlogs query
interface BlogThumbnailNode {
    sourceUrl: string;
    altText?: string;
    id: string;
}

interface BlogContent {
    thumbnail?: {
        node?: BlogThumbnailNode;
    };
    title?: string;
    teaser?: string;
    publishedDate: string; // Assuming this is generally required if content exists
    author?: string;
    category?: string;
    content?: string; // Full content, might not always be needed on list views
}

interface BlogData {
    blogContent?: BlogContent;
    isFeatured?: boolean;
}

export interface Post {
    title: string; // Top-level title from the post itself
    slug: string;
    blog?: BlogData; // Contains the ACF fields under the 'blog' field group
}

export interface SocialMediaLink {
    icon?: {
        node: ImageNode;
    };
    link?: string;
}

export interface Footer {
    address?: string;
    contactNumber?: string;
    email?: string;
    socialMedia?: SocialMediaLink[];
    footerCopyright?: string;
}

export interface HeaderFooter {
    header?: Header;
    footer?: Footer;
}
