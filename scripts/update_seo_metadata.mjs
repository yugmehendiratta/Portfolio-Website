import fs from 'node:fs';

const manifestPath = 'src/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const pagesSeo = {
  '/': {
    title: 'Yug Mehendiratta — Product Designer & UX Analyst',
    description: 'Portfolio of Yug Mehendiratta, a Product Designer & UX Analyst specializing in SaaS products, user research, design systems, and end-to-end UX.',
    keywords: 'Yug Mehendiratta, Product Designer, UX Analyst, UI/UX Designer, UX Portfolio, SaaS UX, Design Systems, User Research, Product Design Portfolio, Interaction Design',
    ogImage: '/assets/img/og_yug.jpg',
    ogImageAlt: 'Yug Mehendiratta — Product Designer & UX Analyst',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://yugmehendiratta.com/#person',
          name: 'Yug Mehendiratta',
          jobTitle: 'Product Designer & UX Analyst',
          worksFor: {
            '@type': 'Organization',
            name: 'Arkanj Tech Solutions'
          },
          description: 'Product Designer and UX Analyst specializing in SaaS products, user research, wireframing, and design systems.',
          image: '/assets/img/yug_profile.jpg',
          sameAs: [
            'https://www.linkedin.com/in/yugmehendiratta'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://yugmehendiratta.com/#website',
          url: '/',
          name: 'Yug Mehendiratta — Portfolio',
          description: 'Portfolio of Yug Mehendiratta, Product Designer & UX Analyst.',
          publisher: {
            '@id': 'https://yugmehendiratta.com/#person'
          }
        }
      ]
    }
  },
  '/about': {
    title: 'About Yug Mehendiratta — Product Designer & UX Analyst',
    description: 'Learn about Yug Mehendiratta\'s UX philosophy, design journey, experience at Arkanj Tech Solutions & ArkCV, timeline, and industry achievements.',
    keywords: 'About Yug Mehendiratta, UX Philosophy, Product Designer Bio, UX Designer Background, Arkanj Tech Solutions, ArkCV Founding Designer, Design Story, UX Timeline',
    ogImage: '/assets/img/og_yug.jpg',
    ogImageAlt: 'About Yug Mehendiratta — Product Designer & UX Analyst',
    type: 'profile',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Yug Mehendiratta',
      description: 'Background, UX philosophy, career timeline, and awards of Yug Mehendiratta.',
      mainEntity: {
        '@type': 'Person',
        name: 'Yug Mehendiratta',
        jobTitle: 'Product Designer & UX Analyst',
        worksFor: {
          '@type': 'Organization',
          name: 'Arkanj Tech Solutions'
        },
        image: '/assets/img/yug_profile.jpg',
        sameAs: [
          'https://www.linkedin.com/in/yugmehendiratta'
        ]
      }
    }
  },
  '/case-study': {
    title: 'Work & Case Studies | Yug Mehendiratta — Product Designer',
    description: 'Selected UX case studies and product design work by Yug Mehendiratta across SaaS platforms, AI tools, PropTech, and enterprise systems.',
    keywords: 'UX Case Studies, Product Design Portfolio, SaaS Design Case Studies, UI/UX Projects, ArkCV Case Study, StyleBook UX, Homestead Proptech, North Light Enterprise UX',
    ogImage: '/assets/img/arkcv_cover.jpg',
    ogImageAlt: 'Featured Work and Case Studies by Yug Mehendiratta',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Work & Case Studies — Yug Mehendiratta',
      description: 'Selected UX case studies and product design work across SaaS, AI tools, PropTech, and enterprise systems.',
      author: {
        '@type': 'Person',
        name: 'Yug Mehendiratta'
      }
    }
  },
  '/case-study/meridian-health': {
    title: 'ArkCV Builder — AI Resume & Career Platform UX Case Study | Yug Mehendiratta',
    description: 'UX case study on ArkCV Builder: Designing an AI-powered resume and career platform that helps job seekers beat ATS filters and get discovered by recruiters.',
    keywords: 'ArkCV Case Study, AI Resume Builder UX, ATS Optimization UX, SaaS Product Design, Job Seeker UX, Founding Designer, Yug Mehendiratta, UX Architecture',
    ogImage: '/assets/img/arkcv_cover.jpg',
    ogImageAlt: 'ArkCV Builder AI Resume Platform UX Case Study Cover',
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'ArkCV Builder — AI Resume & Career Platform UX Case Study',
      description: 'Designing an AI-powered resume and career platform that helps job seekers beat ATS filters and get discovered by recruiters.',
      author: {
        '@type': 'Person',
        name: 'Yug Mehendiratta'
      },
      image: '/assets/img/arkcv_cover.jpg'
    }
  },
  '/case-study/stylebook': {
    title: 'StyleBook — SaaS Redesign & Workflow UX Case Study | Yug Mehendiratta',
    description: 'How transforming StyleBook\'s salon management SaaS from frustrating friction into an intuitive workflow turned user resistance into enthusiastic adoption.',
    keywords: 'StyleBook UX Case Study, SaaS Redesign, Workflow Optimization, B2B UX Design, Salon Management Software, User Adoption UX, Yug Mehendiratta',
    ogImage: '/assets/img/80c1e70ab2d02dbd.webp',
    ogImageAlt: 'StyleBook SaaS Redesign UX Case Study Cover',
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'StyleBook — SaaS Redesign & Workflow UX Case Study',
      description: 'Transforming salon management SaaS from frustrating friction into an intuitive, high-adoption experience.',
      author: {
        '@type': 'Person',
        name: 'Yug Mehendiratta'
      },
      image: '/assets/img/80c1e70ab2d02dbd.webp'
    }
  },
  '/case-study/north-light': {
    title: 'North Light — Enterprise Product Strategy & UX Case Study | Yug Mehendiratta',
    description: 'Enterprise UX case study on aligning 7 stakeholders around a unified product strategy, simplifying complex multi-layered workflows into clear UI.',
    keywords: 'North Light UX Case Study, Enterprise UX Strategy, Stakeholder Alignment, Information Architecture, Complex Systems UX, Product Design, Yug Mehendiratta',
    ogImage: '/assets/img/99d088f4c1f4750e.webp',
    ogImageAlt: 'North Light Enterprise Product Strategy UX Case Study Cover',
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'North Light — Enterprise Product Strategy & UX Case Study',
      description: 'Aligning 7 stakeholders around a unified product strategy, simplifying complex enterprise workflows.',
      author: {
        '@type': 'Person',
        name: 'Yug Mehendiratta'
      },
      image: '/assets/img/99d088f4c1f4750e.webp'
    }
  },
  '/case-study/homestead': {
    title: 'Homestead — PropTech UX Design & 0-to-1 Case Study | Yug Mehendiratta',
    description: '0-to-1 PropTech UX design: Making complex property data, valuation metrics, and market insights accessible and empowering for first-time homebuyers.',
    keywords: 'Homestead UX Case Study, PropTech UX Design, 0 to 1 Product Design, Real Estate UI, Data Visualization UX, Mobile First Design, Yug Mehendiratta',
    ogImage: '/assets/img/67d45ff5e560331c.webp',
    ogImageAlt: 'Homestead PropTech UX Case Study Cover',
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Homestead — PropTech UX Design & 0-to-1 Case Study',
      description: 'Making complex property data, valuation metrics, and market insights accessible and empowering for first-time homebuyers.',
      author: {
        '@type': 'Person',
        name: 'Yug Mehendiratta'
      },
      image: '/assets/img/67d45ff5e560331c.webp'
    }
  },
  '/play-ground': {
    title: 'Playground & Visual Design Explorations | Yug Mehendiratta',
    description: 'A creative playground of visual design experiments, UI interactions, micro-animations, photography, and personal design side projects by Yug Mehendiratta.',
    keywords: 'UI Design Playground, Visual Experiments, Interaction Design, Micro Animations, Design Side Projects, Creative Portfolio, Yug Mehendiratta, Photography',
    ogImage: '/assets/img/og_yug.jpg',
    ogImageAlt: 'Playground & Visual Design Explorations by Yug Mehendiratta',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Playground & Visual Design Explorations — Yug Mehendiratta',
      description: 'Visual design experiments, UI interactions, micro-animations, and photography by Yug Mehendiratta.',
      author: {
        '@type': 'Person',
        name: 'Yug Mehendiratta'
      }
    }
  },
  '/contact': {
    title: 'Contact Yug Mehendiratta — Product Designer & UX Analyst',
    description: 'Get in touch with Yug Mehendiratta for full-time product design roles, freelance UX contracts, design consulting, or hard problem discussions.',
    keywords: 'Contact Yug Mehendiratta, Hire Product Designer, Hire UX Designer, Freelance UX Consultant, Design Inquiries, Product Design Collaboration, New Delhi NCR UX Designer',
    ogImage: '/assets/img/og_yug.jpg',
    ogImageAlt: 'Contact Yug Mehendiratta — Product Designer & UX Analyst',
    type: 'website',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Yug Mehendiratta',
      description: 'Get in touch with Yug Mehendiratta for UX design roles, contract projects, or collaborations.',
      mainEntity: {
        '@type': 'Person',
        name: 'Yug Mehendiratta',
        email: 'work.yug29@gmail.com',
        telephone: '+91 7988865453',
        jobTitle: 'Product Designer & UX Analyst'
      }
    }
  },
  '/404': {
    title: '404: Page Not Found | Yug Mehendiratta',
    description: 'The requested page could not be found. Return to Yug Mehendiratta\'s product design and UX portfolio.',
    keywords: '404, Page Not Found, Yug Mehendiratta Portfolio',
    ogImage: '/assets/img/og_yug.jpg',
    ogImageAlt: 'Page Not Found — Yug Mehendiratta Portfolio',
    type: 'website',
    schema: null
  }
};

function updateHead(headStr, pageRoute, seo) {
  // 1. Remove old SEO tags that we will replace cleanly
  let cleaned = headStr
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+name="keywords"[^>]*>/gi, '')
    .replace(/<meta\s+name="author"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:type"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:site_name"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:title"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:description"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:image"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:image:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:url"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:locale"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:card"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:site"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:creator"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:title"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:description"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:image"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:image:alt"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>/gi, '')
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<!--\s*Open Graph\s*-->/gi, '')
    .replace(/<!--\s*X\s*-->/gi, '');

  // 2. Build new SEO block
  const seoTags = [
    `\t<title>${seo.title}</title>`,
    `\t<meta name="description" content="${seo.description}">`,
    `\t<meta name="keywords" content="${seo.keywords}">`,
    `\t<meta name="author" content="Yug Mehendiratta">`,
    `\t<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `\t<link rel="canonical" href="${pageRoute}">`,
    `\t<!-- Open Graph / Facebook -->`,
    `\t<meta property="og:site_name" content="Yug Mehendiratta Portfolio">`,
    `\t<meta property="og:type" content="${seo.type}">`,
    `\t<meta property="og:url" content="${pageRoute}">`,
    `\t<meta property="og:title" content="${seo.title}">`,
    `\t<meta property="og:description" content="${seo.description}">`,
    `\t<meta property="og:image" content="${seo.ogImage}">`,
    `\t<meta property="og:image:alt" content="${seo.ogImageAlt}">`,
    `\t<meta property="og:locale" content="en_US">`,
    `\t<!-- Twitter Card -->`,
    `\t<meta name="twitter:card" content="summary_large_image">`,
    `\t<meta name="twitter:title" content="${seo.title}">`,
    `\t<meta name="twitter:description" content="${seo.description}">`,
    `\t<meta name="twitter:image" content="${seo.ogImage}">`,
    `\t<meta name="twitter:image:alt" content="${seo.ogImageAlt}">`
  ];

  if (seo.schema) {
    seoTags.push(`\t<script type="application/ld+json">${JSON.stringify(seo.schema)}</script>`);
  }

  // Insert after charset/viewport/generator
  const insertPoint = cleaned.indexOf('<meta name="generator"');
  if (insertPoint !== -1) {
    const genEnd = cleaned.indexOf('>', insertPoint) + 1;
    cleaned = cleaned.slice(0, genEnd) + '\n' + seoTags.join('\n') + '\n' + cleaned.slice(genEnd);
  } else {
    cleaned = seoTags.join('\n') + '\n' + cleaned;
  }

  return cleaned;
}

manifest.pages.forEach(page => {
  const seo = pagesSeo[page.route];
  if (seo) {
    page.head = updateHead(page.head, page.route, seo);
    console.log(`Updated SEO metadata for: ${page.route} (${page.file})`);
  }
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('src/manifest.json successfully updated with comprehensive SEO metadata!');
