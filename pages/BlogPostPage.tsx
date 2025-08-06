import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import type { BlogPost } from '../types';
import Footer from '../components/Footer';
import newPosts from '../src/content/200-real-posts.json';

const originalBlogPosts: BlogPost[] = Array.from({ length: 78 }, (_, i) => ({
  id: `post${i + 1}`,
  title: {
    en: `Original Post ${i + 1} Title`,
    fr: `[FR] Original Post ${i + 1} Title`,
    ar: `[AR] Original Post ${i + 1} Title`
  },
  summary: {
    en: `This is the summary for the original post number ${i + 1}.`,
    fr: `[FR] This is the summary for the original post number ${i + 1}.`,
    ar: `[AR] This is the summary for the original post number ${i + 1}.`
  },
  content: {
    en: `This is the full content for the original post number ${i + 1}. The content would be much longer and would be retrieved from a translation file.`,
    fr: `[FR] This is the full content for the original post number ${i + 1}. The content would be much longer and would be retrieved from a translation file.`,
    ar: `[AR] This is the full content for the original post number ${i + 1}. The content would be much longer and would be retrieved from a translation file.`
  },
  author: {
    en: "Original Author",
    fr: "Auteur Original",
    ar: "المؤلف الأصلي"
  },
  date: {
    en: `July ${31 - (i % 31)}-2025`,
    fr: `[FR] July ${31 - (i % 31)}-2025`,
    ar: `[AR] July ${31 - (i % 31)}-2025`
  },
  imageUrl: `https://picsum.photos/seed/blog${i + 1}/600/400`,
}));

const allBlogPosts = [...originalBlogPosts, ...newPosts];

export default function BlogPostPage() {
    const { postId } = useParams<{ postId: string }>();
    const { language } = useTranslations();
    const post = allBlogPosts.find(p => p.id === postId);

    const postTitle = post ? post.title[language] : 'Post Not Found';
    const postContent = post ? post.content[language] : 'The blog post you are looking for could not be found.';

    useDocumentHead({
        title: `${postTitle} | BrandHUB Blog`,
        description: post ? post.summary[language] : 'Blog post from BrandHUB, a creative agency in Morocco.',
    });

    if (!post) {
        return (
            <div className="bg-soft-lavender/90 dark:bg-charcoal-black/90 text-charcoal-black dark:text-soft-lavender min-h-screen">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p className="mb-8">We couldn't find the blog post you were looking for.</p>
                    <Link to="/" className="text-neon-lime font-bold hover:underline">
                        &larr; Back to Home
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-soft-lavender/90 dark:bg-charcoal-black/90 text-charcoal-black dark:text-soft-lavender">
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link to="/" className="text-neon-lime font-bold hover:underline">
                            &larr; Back to Blog
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender mb-4">
                        {post.title[language]}
                    </h1>
                    <div className="text-sm text-charcoal-black/60 dark:text-soft-lavender/60 mb-8">
                        <span>By {post.author[language]}</span> &bull; <span>{post.date[language]}</span>
                    </div>
                    <img src={post.imageUrl} alt={post.title[language]} className="w-full h-auto object-cover rounded-2xl mb-8" />
                    <div className="prose dark:prose-invert max-w-none text-lg" dangerouslySetInnerHTML={{ __html: post.content[language].replace(/\n/g, '<br />') }} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
