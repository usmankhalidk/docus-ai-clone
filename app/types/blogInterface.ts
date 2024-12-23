export interface RootObject {
    blogHeroSection: BlogHeroSection;
    BlogCards: BlogCards[];
    BlogPoster: PosterInterface;
    SymptomsPoster: PosterInterface;
    KnowledgePoster: PosterInterface;
    GlossaryPoster: PosterInterface;
    GlossaryCards: GlossaryCards[];
    symptoms: QusetionsBlock[];
    knowledge: QusetionsBlock[];
}
export type Card = BlogCards & GlossaryCards;
export interface GlossaryCards {
    GlossaryCardstitle?: string;
    GlossaryCardsDescription?: string;
    GlossaryCardsImage?: string;
}
export interface QusetionsBlock {
    title: string;
    description: string;
    tags: string[];
    date: string;
}
export interface PosterInterface {
    title: string;
    description: string;
    button: Button;
    image: string;
}
export interface Button {
    text: string;
    action: string;
    url: string;
}
export interface BlogCards {
    category?: string;
    title?: string;
    date?: string;
    readTime?: string;
    image?: string;
}
export interface BlogHeroSection {
    title: string;
    subtitle: string;
    featuredArticle: FeaturedArticle;
}
export interface FeaturedArticle {
    title: string;
    author: string;
    date: string;
    readTime: string;
    description: string;
    image: string;
}