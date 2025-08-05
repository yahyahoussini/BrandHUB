import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../hooks/useTranslations';
import type { BlogPost } from '../types';
import { SearchIcon } from './icons';
import generatedPosts from '../src/content/generated-posts.json';

const originalBlogPosts: BlogPost[] = Array.from({ length: 78 }, (_, i) => ({
  id: `post${i + 1}`,
  titleKey: `post${i + 1}_title`,
  summaryKey: `post${i + 1}_summary`,
  contentKey: `post${i + 1}_content`,
  authorKey: `post${i + 1}_author`,
  dateKey: `post${i + 1}_date`,
  imageUrl: `https://picsum.photos/seed/blog${i + 1}/600/400`,
}));

// Combine the original posts with the new AI-generated posts
const allBlogPosts = [...originalBlogPosts, ...generatedPosts];

const POSTS_PER_PAGE = 6;

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { t } = useTranslations();
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 15;
        const y = (clientY - top - height / 2) / 15;
        setStyle({
            transform: `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`,
        });
    };

    const onMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`,
        });
    };

    // For generated posts, the content is not a key but the actual text.
    const getTitle = (post: BlogPost) => post.id.startsWith('post') ? t(post.titleKey) : post.titleKey;
    const getSummary = (post: BlogPost) => post.id.startsWith('post') ? t(post.summaryKey) : post.summaryKey;
    const getAuthor = (post: BlogPost) => post.id.startsWith('post') ? t(post.authorKey) : post.authorKey;
    const getDate = (post: BlogPost) => post.id.startsWith('post') ? t(post.dateKey) : post.dateKey;

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={style}
            className="group relative h-full transition-transform duration-500 ease-out"
        >
            <div className="absolute -inset-px bg-gradient-to-r from-neon-lime via-deep-purple to-neon-lime rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-background-pan" style={{ backgroundSize: '200%' }}></div>
            <div className="relative bg-white/50 dark:bg-deep-purple/20 border border-deep-purple/10 dark:border-transparent rounded-2xl flex flex-col h-full overflow-hidden">
                <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden">
                    <img src={post.imageUrl} alt={getTitle(post)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-charcoal-black dark:text-soft-lavender mb-2">
                        <Link to={`/blog/${post.id}`} className="hover:text-neon-lime transition-colors">{getTitle(post)}</Link>
                    </h3>
                    <div className="text-xs text-charcoal-black/60 dark:text-soft-lavender/60 mb-3">
                        <span>{getAuthor(post)}</span> &bull; <span>{getDate(post)}</span>
                    </div>
                    <p className="text-charcoal-black/80 dark:text-soft-lavender/80 text-sm mb-4 flex-grow">{getSummary(post)}</p>
                    <Link to={`/blog/${post.id}`} className="mt-auto text-neon-lime font-bold hover:underline self-start">
                        {t('blog_read_more')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Blog: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter(post => {
      const title = (post.id.startsWith('post') ? t(post.titleKey) : post.titleKey).toLowerCase();
      const summary = (post.id.startsWith('post') ? t(post.summaryKey) : post.summaryKey).toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query) || summary.includes(query);
    });
  }, [searchQuery, t]);

  const handleViewMore = () => {
    setVisiblePostsCount(prevCount => prevCount + POSTS_PER_PAGE);
  };

  const postsToShow = filteredPosts.slice(0, visiblePostsCount);

  return (
    <section id={id} className="py-20 md:py-32 bg-soft-lavender/90 dark:bg-charcoal-black/90">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
            {t('blog_title')}
          </h2>
          <p className="text-xl md:text-2xl text-neon-lime mt-4 font-bold">{t('blog_subtitle')}</p>
        </div>

        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('blog_search_placeholder')}
              className="w-full py-3 pl-12 pr-4 bg-white/50 dark:bg-deep-purple/20 text-charcoal-black dark:text-soft-lavender rounded-full border-2 border-transparent focus:border-neon-lime focus:outline-none focus:ring-0 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-black/50 dark:text-soft-lavender/50">
              <SearchIcon />
            </div>
          </div>
        </div>

        {postsToShow.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {postsToShow.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-charcoal-black/80 dark:text-soft-lavender/80">
            {t('blog_no_results')}
          </p>
        )}

        {visiblePostsCount < filteredPosts.length && (
          <div className="text-center mt-16">
            <button
              onClick={handleViewMore}
              className="bg-neon-lime text-charcoal-black font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition-colors duration-300"
            >
              {t('blog_view_more')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
