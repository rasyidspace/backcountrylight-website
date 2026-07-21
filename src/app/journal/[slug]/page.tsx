import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL_POSTS } from "../page";

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-24 pb-12 text-center">
        <div className="flex items-center justify-center gap-4 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
          <Link href="/journal" className="hover:text-foreground transition-colors">Journal</Link>
          <span>&bull;</span>
          <span>{post.category}</span>
          <span>&bull;</span>
          <span>{post.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Featured Image */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[16/9] md:aspect-[2/1] w-full bg-muted">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Article Content (Mock) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl prose prose-neutral lg:prose-lg">
        <p className="lead text-xl text-muted-foreground mb-8">
          The following is placeholder text designed to demonstrate the editorial layout of a standard backcountry journal article. It aims to capture the spirit of ultralight adventure.
        </p>
          <p>
            Enter the ultralight movement. Pioneered by thru-hikers who were spending months on the trail, the ultralight philosophy flips the traditional approach on its head. Instead of asking &quot;what might I need?&quot;, ultralight backpackers ask &quot;what can I safely do without?&quot;
          </p>
          <p>
            For years, the standard advice for backpackers was to pack heavy, durable gear that could withstand anything nature threw at you. The logic was sound—if you&apos;re heading into the wilderness, you need equipment that won&apos;t fail. However, this philosophy led to packs weighing 50 pounds or more, turning a weekend hike into a grueling test of endurance rather than an enjoyable escape.
          </p>
        <h2 className="text-2xl font-heading font-medium mt-12 mb-6">The Journey Begins</h2>
          <p>
            Today, thanks to advancements in materials science—most notably Dyneema Composite Fabrics (DCF) and high-fill-power down—it&apos;s entirely possible to have a base weight (the weight of your pack excluding food, water, and fuel) under 10 pounds without sacrificing safety or reasonable comfort. This shift hasn&apos;t just changed what we carry; it has changed how we experience the backcountry.
          </p>
        <blockquote className="border-l-2 border-foreground pl-6 my-8 italic text-xl">
          &quot;The mountains are calling and I must go. Not to conquer them, but to surrender to them.&quot;
        </blockquote>
        <p>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle of text.
        </p>
        
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link href="/journal" className="text-sm font-medium uppercase tracking-widest hover:underline underline-offset-4">
            &larr; Back to Journal
          </Link>
          <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">Share:</span>
            <button className="text-sm font-medium hover:text-muted-foreground transition-colors">Twitter</button>
            <button className="text-sm font-medium hover:text-muted-foreground transition-colors">Facebook</button>
          </div>
        </div>
      </div>
    </article>
  );
}
