export interface RootObject {
    blogHeroSection: BlogHeroSection;
    BlogCards: BlogCards[];
    GlossaryCards: GlossaryCards[];
    BlogPoster: PosterInterface;
    GlossaryPoster: PosterInterface;
    SymptomsPoster: PosterInterface;
    KnowledgePoster: PosterInterface;
    OpinionPoster: PosterInterface;
    symptoms: QusetionsBlock[];
    knowledge: QusetionsBlock[];
    LabAnalysis: LabAnalysis[];
    DoctorAnalysis: DoctorAnalysis[];
    MainTitle: MainTitle;
    testTypes: Feature[];
    Counts: Count[];
    Doctors: Doctor[];
    SafeData: SafeDataPoster;
    HomeBenefitCards: BenefitCardsData;
    LabBenefitCards: BenefitCardsData;
    DoctorBenefitCards: BenefitCardsData;
}
export type Card = BlogCards & GlossaryCards;
export interface BlogCards {
    category?: string;
    title?: string;
    date?: string;
    readTime?: string;
    image?: string;
}
export interface GlossaryCards {
    GlossaryCardstitle?: string;
    GlossaryCardsDescription?: string;
    GlossaryCardsImage?: string;
}
export type Analysis = LabAnalysis & DoctorAnalysis;
export interface LabAnalysis {
    title: string;
    description: string;
    features: Feature[];
    buttonText: string;
    image: string;
}
export interface DoctorAnalysis {
    title: string;
    description: string;
    features: Feature[];
    buttonText: string;
    image: string;
}
export interface BenefitCardsData {
    title: string;
    subtitle: string;
    buttonText?: string;
    content: BenefitContent[];
}
export interface BenefitContent {
    icon: string;
    cardtitle: string;
    text: string;
}
export interface Doctor {
    name: string;
    country: string;
    experience: string;
    specialty: string;
    image?: string;
}
export interface Count {
    value: string;
    label: string;
}
export interface QusetionsBlock {
    title: string;
    description: string;
    tags: string[];
    date: string;
}
export interface MainTitle {
    LabAnalysisTitle: string
    DoctorAnalysisTitle: string
}
export interface Feature {
    icon: string;
    title: string;
    description: string;
}
export interface SafeDataPoster {
    title?: string;
    subtitle: string;
    content: Content[];
}
export interface Content {
    icon: string;
    text: string;
}
export interface PosterInterface {
    title: string;
    description?: string;
    button: Button;
    image: string;
}
export interface Button {
    text: string;
    action: string;
    url: string;
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