import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { BlogPost } from '../types';
import { CloseIcon, SearchIcon } from './icons';

const blogPostsData: BlogPost[] = Array.from({ length: 78 }, (_, i) => ({
  id: `post${i + 1}`,
  titleKey: `post${i + 1}_title`,
  summaryKey: `post${i + 1}_summary`,
  contentKey: `post${i + 1}_content`,
  authorKey: `post${i + 1}_author`,
  dateKey: `post${i + 1}_date`,
  imageUrl: `https://picsum.photos/seed/blog${i + 1}/600/400`,
}));

const POSTS_PER_PAGE = 6;

const BlogPostCard: React.FC<{ post: BlogPost; onReadMore: (post: BlogPost) => void }> = ({ post, onReadMore }) => {
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
                <div className="w-full h-48 overflow-hidden">
                    <img src={post.imageUrl} alt={t(post.titleKey)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-charcoal-black dark:text-soft-lavender mb-2">{t(post.titleKey)}</h3>
                    <div className="text-xs text-charcoal-black/60 dark:text-soft-lavender/60 mb-3">
                        <span>{t(post.authorKey)}</span> &bull; <span>{t(post.dateKey)}</span>
                    </div>
                    <p className="text-charcoal-black/80 dark:text-soft-lavender/80 text-sm mb-4 flex-grow">{t(post.summaryKey)}</p>
                    <button onClick={() => onReadMore(post)} className="mt-auto text-neon-lime font-bold hover:underline self-start">
                        {t('blog_read_more')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const BlogModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
    const { t, dir } = useTranslations();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="relative w-full max-w-4xl max-h-[90vh] bg-soft-lavender dark:bg-charcoal-black rounded-2xl shadow-2xl flex flex-col m-4 animate-fly-in"
                onClick={(e) => e.stopPropagation()}
                dir={dir}
            >
                <div className="relative w-full h-64 md:h-80 rounded-t-2xl overflow-hidden">
                    <img src={post.imageUrl} alt={t(post.titleKey)} className="w-full h-full object-cover"/>
                     <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/70 to-transparent"></div>
                </div>

                <div className="absolute top-0 left-0 right-0 p-8 text-white">
                     <h2 className="text-3xl md:text-4xl font-black text-white">{t(post.titleKey)}</h2>
                      <div className="text-sm text-soft-lavender/80 mt-2">
                        <span>{t(post.authorKey)}</span> &bull; <span>{t(post.dateKey)}</span>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-charcoal-black/50 text-white rounded-full hover:bg-neon-lime hover:text-charcoal-black transition-colors duration-300"
                    aria-label={t('blog_close')}
                >
                    <CloseIcon />
                </button>

                <div className="p-8 overflow-y-auto">
                    <div className="prose dark:prose-invert max-w-none text-charcoal-black dark:text-soft-lavender" dangerouslySetInnerHTML={{ __html: t(post.contentKey).replace(/\n/g, '<br />') }} />
                </div>
            </div>
        </div>
    );
};

const Blog: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPostsData.filter(post => {
      const title = t(post.titleKey).toLowerCase();
      const summary = t(post.summaryKey).toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query) || summary.includes(query);
    });
  }, [searchQuery, t]);

  const handleOpenModal = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

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
              <BlogPostCard key={post.id} post={post} onReadMore={handleOpenModal} />
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
      {selectedPost && <BlogModal post={selectedPost} onClose={handleCloseModal} />}
    </section>
  );
};

export default Blog;
