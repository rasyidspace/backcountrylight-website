import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const JOURNAL_POSTS = [
  {
    id: 1,
    title: "Thru-Hiking the Pacific Crest Trail: A Gear Retrospective",
    excerpt: "After 2,650 miles, here is what worked, what failed, and what I would do differently next time.",
    category: "Trip Reports",
    date: "July 12, 2026",
    image: "/tent/tc-hero-lifestyle.webp",
    slug: "pct-gear-retrospective"
  },
  {
    id: 2,
    title: "The Evolution of Ultralight Shelters",
    excerpt: "From heavy canvas to Dyneema Composite Fabrics, we trace the history of the modern backpacking tent.",
    category: "Gear Deep Dive",
    date: "June 28, 2026",
    image: "/tent/tc-collection-shelters.jpg",
    slug: "evolution-ultralight-shelters"
  },
  {
    id: 3,
    title: "Layering Systems for Four-Season Camping",
    excerpt: "Stay warm without adding unnecessary bulk to your pack. Our guide to modular clothing systems.",
    category: "How-To",
    date: "June 15, 2026",
    image: "/tent/tc-philosophy-tenbi.webp",
    slug: "layering-systems-four-season"
  },
  {
    id: 4,
    title: "Interview: The Designers Behind Tokyo Crafts",
    excerpt: "We sat down with the team at Tokyo Crafts to discuss their approach to minimalist outdoor design.",
    category: "Community",
    date: "May 30, 2026",
    image: "/tent/tc-philosophy-diafort.webp",
    slug: "interview-tokyo-crafts"
  },
  {
    id: 5,
    title: "Leave No Trace: Best Practices for Alpine Environments",
    excerpt: "Fragile ecosystems require extra care. How to minimize your impact above the tree line.",
    category: "Education",
    date: "May 12, 2026",
    image: "/tent/tc-philosophy-wingfort.webp",
    slug: "leave-no-trace-alpine"
  },
  {
    id: 6,
    title: "Stove Comparison: Isobutane vs Alcohol",
    excerpt: "Which cooking system is right for your next adventure? We break down the pros and cons.",
    category: "Gear Reviews",
    date: "April 25, 2026",
    image: "/tent/tc-product-ognis-dome.webp",
    slug: "stove-comparison-isobutane-alcohol"
  }
];

export const metadata = {
  title: "Journal | Backcountry Light",
  description: "Stories, gear reviews, and field notes from the backcountry.",
};

export default function JournalPage() {
  const featuredPost = JOURNAL_POSTS[0];
  const regularPosts = JOURNAL_POSTS.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight mb-6">The Dispatch</h1>
          <p className="text-lg text-muted-foreground">
            Field notes, gear reviews, and stories from the trail.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <Link href={`/journal/${featuredPost.slug}`} className="group block">
            <div className="relative aspect-[16/9] md:aspect-[2.35/1] overflow-hidden mb-8 bg-muted">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                fill 
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                <span>{featuredPost.category}</span>
                <span>&bull;</span>
                <span>{featuredPost.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4 group-hover:underline underline-offset-4">{featuredPost.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{featuredPost.excerpt}</p>
            </div>
          </Link>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/journal/${post.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-muted">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                <span>{post.category}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-2xl font-heading font-medium mb-3 group-hover:underline underline-offset-4 leading-tight">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              <span className="text-sm font-medium border-b border-foreground pb-1 self-start uppercase tracking-widest">Read Article</span>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-24 text-center border-t border-border pt-16">
          <Button variant="outline" size="lg" className="rounded-none px-12 h-14 text-base">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
