import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: 'pmu184i8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sknmTB1h2IhVXEvt6T7H9fIgTHS2Z1hzIBmVYOrBjJizqGDFO2BZdYJPZDdAvIvrF1ag50K2UJf5zJH1WwFedvm8hI6J2IhF36paRiACqVnmcf1E9Ycw9Q0RY9P2Bx5AsMPLgUBE4w1YSg20jQZerxylfpTLIN68UklykbRCp5qeYa8F8ZvA',
});

async function seed() {
  console.log('Seeding Sanity with sample articles...');

  const articles = [
    {
      _id: 'article-chatgpt-vs-claude-2026',
      _type: 'article',
      title: 'ChatGPT vs Claude: Which AI Assistant Actually Saves You More Time in 2026?',
      slug: { _type: 'slug', current: 'chatgpt-vs-claude-2026-comparison' },
      excerpt: 'We spent 3 weeks running identical tasks through ChatGPT and Claude — from writing marketing copy to debugging Python. Here\'s what the data actually shows, not what the marketing pages claim.',
      author: 'Marcus Chen',
      category: 'comparisons',
      tags: ['ChatGPT', 'Claude', 'AI Comparison', 'Productivity', 'LLM'],
      featured: true,
      publishedAt: '2026-04-25T10:00:00Z',
      seoTitle: 'ChatGPT vs Claude 2026: Real-World Speed & Quality Test',
      seoDescription: '3-week head-to-head test of ChatGPT vs Claude on writing, coding, and research tasks. Real data, no hype. See which AI actually saves more time.',
      content: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Every comparison article you\'ve read about ChatGPT vs Claude probably starts the same way: "Both are powerful AI assistants..." and then lists features from their respective websites. That\'s not what this is. We ran 147 identical prompts through both tools over 21 days — writing tasks, coding challenges, research queries, and data analysis — and tracked every metric that matters: time to completion, revision rounds, and whether the output was actually usable without heavy editing.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'The Testing Setup (No Cherry-Picking)',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span3',
              text: 'We defined 5 task categories and ran 30 prompts per category through both ChatGPT (GPT-4o) and Claude (Claude 3.5 Sonnet). Each prompt was evaluated by 3 independent reviewers who didn\'t know which model produced which output. The categories were: long-form writing (blog posts, reports), code generation (Python, JavaScript, SQL), data analysis (interpreting spreadsheets, generating insights), creative tasks (brainstorming, ad copy), and research synthesis (summarizing papers, comparing sources).',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block4',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span4',
              text: 'Writing Quality: The Numbers Don\'t Lie',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block5',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span5',
              text: 'For long-form writing, Claude produced first-draft content that required an average of 1.3 revision rounds before it was publish-ready. ChatGPT needed 2.1 rounds. The gap widened specifically for nuanced topics — when we asked both to write about regulatory compliance in fintech, Claude\'s output referenced actual SEC guidelines (specifically Regulation S-K Item 303) while ChatGPT produced generic compliance language that a compliance officer would immediately flag as insufficient.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block6',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span6',
              text: 'However, ChatGPT was noticeably faster for short-form content. Product descriptions under 100 words were generated 40% faster on average (8.2 seconds vs 13.7 seconds), and the quality difference was negligible. If you\'re writing e-commerce listings, ChatGPT\'s speed advantage is real.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block7',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span7',
              text: 'Code Generation: A Clear Winner Emerges',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block8',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span8',
              text: 'This is where things got interesting. We tested both models on 30 coding tasks ranging from simple scripts to complex API integrations. Claude produced working code on the first attempt for 24 out of 30 tasks (80%). ChatGPT managed 19 out of 30 (63%). The difference was most pronounced in debugging scenarios — when given broken code and asked to fix it, Claude identified the root cause correctly 87% of the time versus ChatGPT\'s 71%.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block9',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span9',
              text: 'A concrete example: we gave both a Python script that was failing due to a race condition in asyncio.gather(). Claude not only identified the race condition but explained why using asyncio.shield() wasn\'t the right fix and suggested a proper TaskGroup pattern (Python 3.11+). ChatGPT identified it was an async issue but suggested wrapping in try/except, which would mask the problem rather than solve it.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block10',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span10',
              text: 'The Bottom Line',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block11',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span11',
              text: 'If your work is primarily writing-heavy and requires depth over speed, Claude saves more time in the long run because you spend less time revising. If you\'re generating high volumes of shorter content or need faster iteration cycles, ChatGPT\'s speed advantage compounds. For coding, Claude is the stronger choice based on our data — the higher first-attempt success rate means fewer debugging cycles. The real answer, of course, is that most professionals benefit from having both. But if you can only pick one, let your primary task type be the deciding factor, not the marketing page.',
            },
          ],
          markDefs: [],
        },
      ],
    },
    {
      _id: 'article-ai-tools-productivity-2026',
      _type: 'article',
      title: '7 AI Tools That Actually Improved Our Team\'s Output (Tested Over 6 Months)',
      slug: { _type: 'slug', current: 'ai-tools-productivity-tested-6-months' },
      excerpt: 'Most "best AI tools" lists are just rewritten press releases. We tested 23 tools over 6 months with a 12-person team and measured real productivity changes. Here are the 7 that moved the needle.',
      author: 'Sarah Mitchell',
      category: 'ai-tools',
      tags: ['AI Tools', 'Productivity', 'Team Workflow', 'Real Data', 'SaaS'],
      featured: true,
      publishedAt: '2026-04-20T10:00:00Z',
      seoTitle: '7 AI Tools That Boosted Real Team Productivity (6-Month Test)',
      seoDescription: 'We tested 23 AI tools over 6 months with a 12-person team. Only 7 actually improved output. Real productivity data, not marketing claims.',
      content: [
        {
          _type: 'block',
          _key: 'block20',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span20',
              text: 'Let\'s be honest about something: most AI tool reviews are written by people who used the tool for 20 minutes, took a screenshot, and called it a day. We wanted to know what happens when you actually integrate these tools into a real workflow for months. So we did exactly that. Our 12-person content and product team at a mid-size SaaS company tested 23 AI tools between October 2025 and March 2026. We tracked output metrics, time savings, and — crucially — whether the quality of work actually improved or just got faster.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block21',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span21',
              text: 'The Testing Framework',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block22',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span22',
              text: 'Each tool was tested for a minimum of 4 weeks. We measured three things: time saved per task (compared to the pre-tool baseline), output quality (rated by a senior team member on a 1-5 scale), and adoption rate (what percentage of the team was still using it voluntarily after the test period). A tool only made this list if it scored above 3.5 on quality AND had an adoption rate above 60%. Out of 23 tools, only 7 cleared both bars.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block23',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span23',
              text: '1. Cursor — The One That Changed How We Code',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block24',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span24',
              text: 'Our 3-person dev team went from shipping 14 features per sprint to 22. That\'s a 57% increase, and no, the quality didn\'t drop — our bug rate actually decreased by 12% because Cursor\'s inline suggestions caught edge cases we would have missed. The key insight: Cursor works best when you already have a well-structured codebase. When we tried it on a messy legacy module, the suggestions were often wrong and slowed us down. But for our main TypeScript/Next.js app, it was transformative. Monthly cost: $20/dev. ROI based on developer time saved: roughly 8x.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block25',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span25',
              text: '2. Perplexity — Replaced Our Research Workflow',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block26',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span26',
              text: 'Before Perplexity, a typical competitive analysis took our content team 4-6 hours of Googling, reading, and synthesizing. With Perplexity Pro, that dropped to 90 minutes on average. The citations feature is what sets it apart — every claim comes with a source link, which means we can verify before publishing. One specific example: when researching the AI writing tool market, Perplexity surfaced a TechCrunch article from 3 weeks prior that reported Jasper\'s ARR had dropped 22% year-over-year. That datapoint changed our entire article angle. Google Search hadn\'t surfaced that article on the first two pages.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block27',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span27',
              text: '3-7: Quick Hits',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block28',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span28',
              text: 'Midjourney v6 cut our design team\'s concept-to-approval time from 3 days to 4 hours. Notion AI reduced meeting notes processing from 30 minutes to 3 minutes (though the summaries sometimes miss action items — we still review them). Grammarly Business caught an average of 8.3 errors per long-form article that our writers missed, including 2-3 factual consistency issues per week. Descript reduced our video editing time by 65% — the text-based editing approach is genuinely faster than timeline editing for talking-head content. And Linear\'s AI features reduced our sprint planning meetings from 45 minutes to 20 minutes by auto-suggesting task breakdowns and dependencies.',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block29',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span29',
              text: 'What Didn\'t Work',
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block30',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span30',
              text: 'Equally important: 16 tools failed our test. The most common failure mode was "looks impressive in a demo, doesn\'t fit real workflows." Several AI writing assistants produced content that was grammatically correct but factually generic — our editors spent more time fixing shallow analysis than they would have writing from scratch. Three AI scheduling tools couldn\'t handle our team\'s timezone spread (US East, London, Bangalore). And two AI presentation builders produced slides that looked like every other AI-generated deck — our sales team reported lower engagement rates on those decks compared to manually designed ones. The lesson: AI tools are most valuable when they accelerate work you\'re already doing well, not when they try to replace human judgment entirely.',
            },
          ],
          markDefs: [],
        },
      ],
    },
  ];

  for (const article of articles) {
    try {
      const existing = await writeClient.getDocument(article._id);
      if (existing) {
        console.log(`Article "${article.title}" already exists, updating...`);
        await writeClient.patch(article._id).set(article).commit();
      } else {
        await writeClient.create(article);
      }
      console.log(`✓ Article "${article.title}" seeded successfully`);
    } catch (err: any) {
      if (err.statusCode === 409) {
        console.log(`Article "${article.title}" already exists, updating...`);
        await writeClient.patch(article._id).set(article).commit();
        console.log(`✓ Article "${article.title}" updated successfully`);
      } else {
        console.error(`✗ Failed to seed "${article.title}":`, err.message);
      }
    }
  }

  console.log('\nDone! Visit your blog at /blog/');
}

seed().catch(console.error);
