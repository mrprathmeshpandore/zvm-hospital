import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag, X } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'The Role of Regimenal Therapy in Managing Chronic Pain',
    category: 'Holistic Health',
    date: 'Oct 24, 2023',
    author: 'Dr. S. Ansari',
    excerpt: 'An in-depth exploration of Hijama and Dalk therapies in modern pain management protocols.',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=800&auto=format&fit=crop',
    content: [
      "Regimenal therapy (Ilaj-bit-Tadbeer) is one of the most popular and clinically effective modalities in the Unani System of Medicine. It encompasses physical techniques aimed at improving the human body's constitution, restoring biological equilibrium, and eliminating metabolic wastes (morbid humors) from system tissues.",
      "Among these methods, Hijama (wet and dry cupping) and Dalk (specialized therapeutic massage) have earned immense interest in current medical circles. Hijama generates local negative pressure on specific reflex zones. This process draws out micro-congestions, enhances lymphatic cleansing, and triggers localized anti-inflammatory responses.",
      "Dalk (massage) acts as a premier rehabilitative method. By varying physical pressure, direction, and rhythm, it optimizes blood flow, decreases muscular adhesions, and relieves myofascial trigger points. In modern clinical settings, blending these time-tested physical regimens with state-of-the-art diagnostic parameters enables doctors to provide safe, natural pain relief without the adverse side effects of long-term pharmaceutical reliance."
    ]
  },
  {
    id: 2,
    title: 'Unani Formulations: From Classical Text to Clinical Evidence',
    category: 'Research',
    date: 'Oct 18, 2023',
    author: 'Prof. M. Ali',
    excerpt: 'How Z.V.M. researchers are validating traditional herbal formulas using contemporary laboratory techniques.',
    image: 'https://images.unsplash.com/photo-1576091160621-2633005a3685?q=80&w=800&auto=format&fit=crop',
    content: [
      "Validating classical Unani pharmacopoeia is critical to securing its global clinical integration and scientific recognition. At Z.V.M. Unani Medical College, our researchers are dedicated to verifying the chemical profiles and therapeutic values of traditional formulations using modern laboratory technologies.",
      "By applying advanced high-performance liquid chromatography (HPLC) and spectroscopic analysis, we establish exact chemical barcodes for raw herbal, mineral, and animal-derived active agents. Our latest research highlights potent anti-inflammatory and cellular protective pathways triggered by traditional syrups and powder complexes.",
      "Using in-vitro cell assays, we recorded a significant reduction in key inflammatory markers. This evidence-based approach bridges classical wisdom and contemporary pharmacology, ensuring that patients receive highly standardized, reliable, and safe natural treatments. Z.V.M. remains at the forefront of this scientific evolution, proving that ancient texts contain answers for modern health challenges."
    ]
  },
  {
    id: 3,
    title: 'Dietary Principles for Seasonal Wellness (Ilaj-bil-Ghiza)',
    category: 'Wellness',
    date: 'Oct 12, 2023',
    author: 'Dr. F. Zain',
    excerpt: 'Practical tips for maintaining humeral balance through mindful nutritional choices according to Unani Tibb.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=800&auto=format&fit=crop',
    content: [
      "In Unani medicine, diet is regarded as the fundamental first line of clinical defense and prevention (Ilaj-bil-Ghiza). The core philosophy rests upon maintaining a harmonious balance among the four primary humors: Dam (blood), Balgham (phlegm), Safra (yellow bile), and Sauda (black bile), relative to each individual's unique temperament (Mizaj).",
      "Seasonal transitions represent shifts in temperature and atmospheric humors that directly influence our body's internal homeostasis. During hot summer months, yellow bile rises naturally. Unani physicians recommend consuming cooling, hydrating foods such as cucumber, mint, squash, and watermelon, while avoiding spicy, dry, or excessively heavy proteins.",
      "Conversely, in winter, warm and dry foods are advised to counter cold humors. By adapting our diet to the rhythm of the seasons and our personal body patterns, we prevent the humors from decaying or causing systemic diseases. Implementing these simple, natural dietary adjustments keeps our metabolic systems strong and our immune systems highly responsive."
    ]
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  useEffect(() => {
    document.title = "Unani Perspective Blog | ZVM Unani Medical College";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Read the latest scholarly medical research, clinical studies, and holistic health articles on Unani medicine, Hijama, and dietary principles.");
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <header className="mb-16">
        <span className="label-caps text-secondary mb-4 block">Medical Insights</span>
        <h1 className="heading-h1 text-primary">Unani Perspective: <br />The Scholarly Blog</h1>
      </header>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[480px] rounded-3xl overflow-hidden mb-16 border border-outline-variant shadow-xl group"
      >
        <img 
          src={posts[0].image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop'} 
          alt="Featured Post" 
          className="w-full h-full object-cover grayscale-0 group-hover:grayscale-[0.3] transition-all duration-700"
        />
        <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent text-on-primary">
          <div className="max-w-3xl">
            <span className="bg-secondary px-3 py-1 rounded-full label-caps mb-4 inline-block">{posts[0].category}</span>
            <h2 className="heading-h2 mb-4 drop-shadow-md">{posts[0].title}</h2>
            <p className="body-md text-on-primary-fixed-variant mb-6">{posts[0].excerpt}</p>
            <div className="flex items-center gap-6 text-sm opacity-80 mb-6">
               <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {posts[0].date}</span>
               <span className="flex items-center gap-2"><User className="h-4 w-4" /> {posts[0].author}</span>
            </div>
            <button 
              onClick={() => setSelectedPost(posts[0])}
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-secondary hover:text-white transition-all cursor-pointer"
            >
              Read Article
            </button>
          </div>
        </div>
      </motion.div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col bg-surface border border-outline-variant rounded-2xl overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="h-48 overflow-hidden">
              <img src={post.image || 'https://images.unsplash.com/photo-1512678193727-b73a6a13d3cc?q=80&w=800&auto=format&fit=crop'} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-secondary mb-3 font-bold uppercase tracking-widest">
                <Tag className="h-3 w-3" />
                {post.category}
              </div>
              <h3 className="heading-h3 text-xl text-primary mb-3 leading-tight">{post.title}</h3>
              <p className="body-md text-sm text-on-surface-variant mb-6 flex-grow">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-outline-variant/30">
                <span className="text-xs text-on-surface-variant flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="text-primary font-bold label-caps inline-flex items-center gap-1 hover:text-secondary transition-colors cursor-pointer"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="relative bg-white rounded-[40px] max-w-3xl w-full overflow-hidden shadow-2xl border border-outline-variant z-10"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/80 hover:bg-white text-primary border border-outline-variant rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Article Header Image */}
                <div className="h-64 sm:h-80 w-full overflow-hidden bg-slate-100">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                </div>

                {/* Article Content */}
                <div className="p-8 sm:p-12 max-h-[55vh] overflow-y-auto scrollbar-thin">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-secondary-container text-on-secondary-container border border-secondary/15 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      {selectedPost.category}
                    </span>
                    <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant/80">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-secondary" /> {selectedPost.date}</span>
                      <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-primary" /> {selectedPost.author}</span>
                    </div>
                  </div>

                  <h2 className="heading-h2 text-3xl sm:text-4xl text-primary mb-6 leading-tight font-black tracking-tight italic">
                    {selectedPost.title}
                  </h2>

                  <div className="space-y-6">
                    {selectedPost.content.map((p, i) => (
                      <p key={i} className="text-slate-600 font-medium text-lg leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-outline-variant/30 flex justify-end">
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:opacity-90 transition-all cursor-pointer"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
