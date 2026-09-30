import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

// 1. Update 5rX2HT45mqrEvPOosZspdPaq_BOF0FpmxkSXIvJxon0.D-R76LfK.mjs (Detail page)
const detailBundlePath = path.join(root, 'public/assets/framer/5rX2HT45mqrEvPOosZspdPaq_BOF0FpmxkSXIvJxon0.D-R76LfK.mjs');
let detailCode = fs.readFileSync(detailBundlePath, 'utf8');

const targetDetailPattern = 'let[L,Re]=xe(we,W,!1),';
const replacementDetail = `let[L,Re]=xe(we,W,!1);
    if (!d?.KVCXsWDZS || d?.KVCXsWDZS === 'meridian-health') {
      y = '2026-07-01T00:00:00.000Z';
      b = 'ArkCV Builder';
      Ee = 'AI-powered resume and career platform that helps job seekers beat ATS filters and get discovered by recruiters.';
      x = { alt: 'ArkCV Builder AI Resume Platform Dashboard', src: '/assets/img/arkcv_cover.jpg', pixelWidth: 2400, pixelHeight: 1350 };
      De = 'UX Case Study';
      S = 'AI Product';
      ke = 'UX Designer';
      C = '12 weeks';
      w = '1 UX Designer (me), 1 PM, 1 Dev';
      je = 'Responsive Web (arkcv.arkanj.tech)';
      T = { alt: 'ArkCV Builder UX Architecture Flow', src: '/assets/img/arkcv_flow.jpg', pixelWidth: 1500, pixelHeight: 844 };
      D = { alt: 'ArkCV Before vs After Transformation Comparison', src: '/assets/img/arkcv_transformation.jpg', pixelWidth: 1500, pixelHeight: 844 };
      Me = a(r, { children: [
        a('h4', { className: 'framer-text framer-styles-preset-jjv5nu', children: 'The Real Problem' }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "Final-year students and early-career job seekers spend 30–45 minutes tailoring their resume for each application. Yet over 75% of resumes are discarded by Applicant Tracking Systems (ATS) algorithms before a hiring manager ever sees them. Candidates are left in the dark—submitting dozens of applications and getting automated rejections with zero feedback." }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "During our initial discovery interviews with 18 university graduates and job seekers, several key pain points surfaced repeatedly:" }),
        a('ul', { className: 'framer-text', children: [
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "'I apply to 40+ jobs every week, but I have no idea if my resume is even being parsed correctly by their ATS.'" }) }),
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "'Existing AI tools just hallucinate or rewrite everything into robotic buzzwords that get flagged.'" }) }),
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "'I don\\'t know which specific skills or keywords in the job description I\\'m actually missing.'" }) })
        ] }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "The core UX challenge was clear: bridge the gap between candidate qualifications and ATS keyword parsing with complete transparency and real-time actionable feedback." })
      ] });
      O = a(r, { children: [
        a('h4', { className: 'framer-text framer-styles-preset-jjv5nu', children: 'Designing the Solution & UX Architecture' }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "I structured ArkCV around a 4-step UX architecture that demystifies ATS algorithms and empowers candidates to optimize their profiles with confidence:" }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '1. Instant Resume Parser & OCR: ' }), "Upload any PDF/DOCX resume and extract structured fields in under 2 seconds." ] }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '2. Real-Time Semantic Matching & ATS Score: ' }), "An intuitive 0–100 radial score gauge that updates dynamically as candidates make edits." ] }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '3. Split-Screen Keyword Tailoring Editor: ' }), "Side-by-side view highlighting matched keywords in green, missing keywords in red, and AI suggestions in yellow." ] }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '4. Recruiter Discovery Pipeline: ' }), "Direct profile export and recruiter-ready candidate portfolio cards that highlight verified skill matches." ] })
      ] });
      A = a(r, { children: [
        a('h4', { className: 'framer-text framer-styles-preset-jjv5nu', children: 'Usability Testing & Design Iterations' }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "Working within a fast 12-week cycle alongside 1 PM and 1 Developer, I led rapid prototype iterations in Figma and conducted 3 rounds of usability testing with 15 target candidates." }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "Key usability discoveries that shaped the final product:" }),
        a('ul', { className: 'framer-text', children: [
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "Replaced full-text AI replacement with granular bullet-point suggestions, preserving the candidate's authentic voice." }) }),
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "Added 'Keyword Gap Breakdown' so users understand exactly why their score changed from 68% to 94%." }) }),
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "Designed a unified Dark Mode UI design system with high-contrast accessibility tokens for long editing sessions." }) })
        ] })
      ] });
      M = a(r, { children: [
        a('h4', { className: 'framer-text framer-styles-preset-jjv5nu', children: 'Impact & Shipped Results' }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: "The shipped product on arkcv.arkanj.tech achieved standout engagement metrics across our launch cohort:" }),
        a('ul', { className: 'framer-text', children: [
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '75% Time Reduction: ' }), "Average resume tailoring time plummeted from 45 minutes to under 8 minutes." ] }) }),
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '+45% Interview Callbacks: ' }), "Candidates using optimized ArkCV resumes reported a 45% increase in recruiter responses." ] }) }),
          a('li', { className: 'framer-text framer-styles-preset-163ovsm', children: a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: '85% Confidence Score: ' }), "85% of job seekers reported feeling significantly more confident about passing ATS filters." ] }) })
        ] })
      ] });
      E = a(r, { children: [
        a('h4', { className: 'framer-text framer-styles-preset-jjv5nu', children: 'Key Takeaways' }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: 'Transparency builds user trust in AI. ' }), "Showing users exactly how the ATS algorithm evaluates their resume made the AI feel like a collaborative partner rather than an opaque black box." ] }),
        a('p', { className: 'framer-text framer-styles-preset-163ovsm', children: [ a('strong', { className: 'framer-text', children: 'Early engineering collaboration drives velocity. ' }), "Designing components alongside developers allowed us to ship a full web product in just 12 weeks while maintaining high UX polish." ] })
      ] });
    }
    let `;

if (detailCode.includes(targetDetailPattern)) {
  detailCode = detailCode.replace(targetDetailPattern, replacementDetail);
  fs.writeFileSync(detailBundlePath, detailCode);
  console.log('Updated 5rX2HT (Case study detail bundle)');
}

// 2. Update zr1Ixf2R4x4Wyb6sqMRqmKhg2PWbyKR3Q7X28o0o8KI.DcEvtl87.mjs (Case studies list page)
const csBundlePath = path.join(root, 'public/assets/framer/zr1Ixf2R4x4Wyb6sqMRqmKhg2PWbyKR3Q7X28o0o8KI.DcEvtl87.mjs');
let csCode = fs.readFileSync(csBundlePath, 'utf8');

const targetCs = '({id:e,KVCXsWDZS:t,N9PVOHoUg:n,rAITKxrzh:r,rS05UF0Io:i,v80eqeLsH:a},o)=>(r??=``,i??=``,t??=``,';
const replCs = `({id:e,KVCXsWDZS:t,N9PVOHoUg:n,rAITKxrzh:r,rS05UF0Io:i,v80eqeLsH:a},o)=>((t === "meridian-health" || o === 0) ? (n = "2026-07-01T00:00:00.000Z", r = "ArkCV Builder", i = "AI-powered resume and career platform that helps job seekers beat ATS filters and get discovered by recruiters.", a = { alt: "ArkCV Builder AI Resume Platform", src: "/assets/img/arkcv_cover.jpg", pixelWidth: 2400, pixelHeight: 1350 }) : null, r??="", i??="", t??="", `;

if (csCode.includes(targetCs)) {
  csCode = csCode.replace(targetCs, replCs);
  fs.writeFileSync(csBundlePath, csCode);
  console.log('Updated zr1Ixf2 (Case studies list bundle)');
}

// 3. Update 0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs (Home page)
const homeBundlePath = path.join(root, 'public/assets/framer/0yBLd0PB0ip5Rzs9-QLcfoj4dY2kFE0yzHwiORtPyPw.Ca3Fwr26.mjs');
let homeCode = fs.readFileSync(homeBundlePath, 'utf8');

const targetHomeShBx = `p(rr,{aMvYYFdlj:hi(s),cUyzKucce:e,Fb73f9BVm:o,hA5JZp5id:n[0],height:\`100%\`,hHixhb3Sw:mi(i,N),id:\`ShBxRijJC\`,JDs6Ey0E7:\`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))\`,layoutId:\`ShBxRijJC\`,NNBVv0e4O:{borderColor:\`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))\`,borderStyle:\`solid\`,borderWidth:2},NxZK0Ti0n:t,q7Vb7T2sX:a`;
const replacementHomeShBx = `p(rr,{aMvYYFdlj:{alt:\`ArkCV Builder AI Resume Platform\`,pixelHeight:1350,pixelWidth:2400,src:\`/assets/img/arkcv_cover.jpg\`},cUyzKucce:\`AI Product\`,Fb73f9BVm:\`AI-powered resume and career platform that helps job seekers beat ATS filters and get discovered by recruiters.\`,hA5JZp5id:n[0],height:\`100%\`,hHixhb3Sw:\`May – July 2026\`,id:\`ShBxRijJC\`,JDs6Ey0E7:\`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))\`,layoutId:\`ShBxRijJC\`,NNBVv0e4O:{borderColor:\`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))\`,borderStyle:\`solid\`,borderWidth:2},NxZK0Ti0n:\`UX Case Study\`,q7Vb7T2sX:\`ArkCV Builder\``;

if (homeCode.includes(targetHomeShBx)) {
  homeCode = homeCode.replace(targetHomeShBx, replacementHomeShBx);
  fs.writeFileSync(homeBundlePath, homeCode);
  console.log('Updated 0yBLd0P (Home bundle)');
}

console.log('All bundle updates complete.');
