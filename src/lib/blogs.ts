export interface BlogPost {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-btech-credit-transfer-services-in-kerala-for-dropout-backlog-students",
    date: "Mar 12, 2026",
    category: "Credit Transfer",
    title:
      "Best B.Tech Credit Transfer Services in Kerala for Dropout & Backlog Students",
    excerpt:
      "Explore how structured credit transfer support can help B.Tech dropout and backlog students in Kerala continue their degree journey without starting over.",
    image:
      "https://images.pexels.com/photos/7972534/pexels-photo-7972534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt:
      "Group of diverse college students walking outdoors and smiling, carrying notebooks and backpacks.",
    content: [
      "B.Tech students who face dropouts or backlogs often assume they must begin again from the first year. In reality, academic credit transfer can create a far more practical route toward degree completion.",
      "With expert support, previously earned subjects can be evaluated and aligned with partner universities, helping students continue from the appropriate semester instead of losing years of progress.",
      "For students in Kerala looking for a reliable second chance, structured credit transfer services can reduce academic stress, save time, and open the door to a recognized engineering qualification.",
    ],
  },
  {
    slug: "ready-to-continue-your-education-credit-transfer-makes-it-easy-to-restart",
    date: "Mar 12, 2026",
    category: "Education",
    title:
      "Ready to Continue Your Education? Credit Transfer Makes It Easy to Restart",
    excerpt:
      "Restarting your studies does not have to mean starting from zero. Credit transfer can help students resume their academic journey smoothly and confidently.",
    image:
      "https://images.pexels.com/photos/32213217/pexels-photo-32213217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt:
      "Group of young adults socializing on university steps, discussing and studying together.",
    content: [
      "Many learners pause their studies due to financial pressure, family responsibilities, relocation, or academic obstacles. That interruption does not have to define the end of their academic journey.",
      "Credit transfer allows students to use the work they have already completed and move into a recognized institution that accepts eligible prior coursework.",
      "With the right guidance, restarting education becomes easier, faster, and far more affordable—making long-term academic and career goals achievable again.",
    ],
  },
  {
    slug: "how-to-resume-your-btech-after-a-3-year-gap-in-india",
    date: "Feb 25, 2026",
    category: "Education",
    title: "How to Resume Your B.Tech After a 3-Year Gap in India",
    excerpt:
      "A long study gap does not always end your engineering ambitions. Learn how to restart a B.Tech path with the help of academic credit transfer options.",
    image:
      "https://images.pexels.com/photos/6684506/pexels-photo-6684506.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    imageAlt:
      "Multiracial group of college students studying together indoors in a library.",
    content: [
      "A 3-year gap in engineering education can feel overwhelming, especially when students are unsure whether their previous semesters will still hold value.",
      "The right credit transfer pathway can help evaluate completed coursework, identify accepted credits, and map the student into a continuation route that minimizes repetition.",
      "For many students in India, restarting B.Tech after a gap becomes possible when supported by recognized institutions, proper documentation, and experienced academic advisors.",
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
