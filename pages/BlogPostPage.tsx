import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useTranslations } from '../hooks/useTranslations';
import type { BlogPost } from '../types';
import Footer from '../components/Footer';
import newPosts from '../src/content/200-real-posts.json';

const originalBlogPosts: BlogPost[] = Array.from({ length: 78 }, (_, i) => ({
  id: `post${i + 1}`,
  titleKey: `post${i + 1}_title`,
  summaryKey: `post${i + 1}_summary`,
  contentKey: `post${i + 1}_content`,
  authorKey: `post${i + 1}_author`,
  dateKey: `post${i + 1}_date`,
  imageUrl: `https://picsum.photos/seed/blog${i + 1}/600/400`,
}));

const allBlogPosts = [...originalBlogPosts, ...(newPosts as BlogPost[])];

export default function BlogPostPage() {
    const { postId } = useParams<{ postId: string }>();
    const { t, language } = useTranslations();
    const post = allBlogPosts.find(p => p.id === postId);

    // Helper functions to handle both data structures
    const getTitle = (p: BlogPost) => p.title ? p.title[language] : t(p.titleKey!);
    const getSummary = (p: BlogPost) => p.summary ? p.summary[language] : t(p.summaryKey!);
    const getContent = (p: BlogPost) => p.content ? p.content[language] : t(p.contentKey!);
    const getAuthor = (p: BlogPost) => p.author ? p.author[language] : t(p.authorKey!);
    const getDate = (p: BlogPost) => p.date ? p.date[language] : t(p.dateKey!);

    const postTitle = post ? getTitle(post) : 'Post Not Found';

    useDocumentHead({
        title: `${postTitle} | BrandHUB Blog`,
        description: post ? getSummary(post) : 'Blog post from BrandHUB, a creative agency in Morocco.',
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
                        {getTitle(post)}
                    </h1>
                    <div className="text-sm text-charcoal-black/60 dark:text-soft-lavender/60 mb-8">
                        <span>By {getAuthor(post)}</span> &bull; <span>{getDate(post)}</span>
                    </div>
                    <img src={post.imageUrl} alt={getTitle(post)} className="w-full h-auto object-cover rounded-2xl mb-8" />
                    <div className="prose dark:prose-invert max-w-none text-lg" dangerouslySetInnerHTML={{ __html: getContent(post).replace(/\n/g, '<br />') }} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
