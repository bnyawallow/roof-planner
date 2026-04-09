export interface RoofingProfile {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  specs?: {
    effectiveWidth: string;
    gaugeRange: string;
  };
}

export const ROOFING_PROFILES: RoofingProfile[] = [
  {
    id: "classic-tile",
    title: "Classic Tile",
    description: "Symmetrical and beautiful, provides a prestigious look for high-end residential projects.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw_qwO2CU5DUySCO4pIEJ6mT67mxZ0NG7GkjEVVYa-YFUg3Ee8TFT62TWYdeOoEqyP3evjZVhv1E3MxseVlTUgNwnrH2poRpfAT2MocWIh0qSODqGdJI-zRiTZ0d_ZeCKIV5L8vjZoUL2J3NPtjV1xKblykzGKUrYvf9ZATlUSZyOKf7EpihL6r-yRJrFKB5uBpc6OEx4BwPXJdxTIz8epOe5IuQViA7EX6qEWsZNm7BxkbHNmpGo1NyR3y3T56t6SJxV-rnO-LgU",
    category: "Pinnacle"
  },
  {
    id: "ecospan-tile",
    title: "EcoSpan Tile",
    description: "Modern roofing with a unique design, cost-effective and durable solution for contemporary builds.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjkB95aCIQS21D0gtGtIa159FliCkDrwwQ3I-yUMoNXqe7TE1hhJVp31Ys05lF-G5MjY1NvsPzG0cF_K8kCuF26vnttSKHBNdsCMAANhQDkEE8INrjbSzpzCLowvgMcDvV7fzJ1w2MjAfcZhT34ZGB4NNDKHdH0UNMJCtbEkYQVZh8tksmbpGJ9y362sVxtWtZemupSDYonpZGTz9tyTht1FQXPVXOX7NEVomZLswhBJqMZuFRpkGwqcSYoDdttTUfWR9EQyST_o",
    category: "Pinnacle roofing"
  },
  {
    id: "briton-tile",
    title: "Briton Tile",
    description: "A classic aesthetic with high strength, perfectly suited for Kenyan architectural heritage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwUSMYFfyJ9rxB2PaHTwqbFr3XM9kqj2WdVmson4mFUKZNVgR29GTYUd-N0jJNSCMvk0m1uie6mJZ75zG2TknNmFkirX9JJ8A5269YHaiRaqvIqMwXkRa5H0VNFXjuSHeggzowbK4pjzNGlN-vLMQigiiJDLu_MasFZQt7XtK7Z8OTCt4u0lXByKYD86SfHro-Hs-dl2jJR7ycS0I5PZgPm7UH1qNKUgGoPuCUw4yk2718Th4KoDtYMnfIP-YXu05Bji0Sx82383Q",
    category: "Pinnacle"
  },
  {
    id: "stone-coated-shingles",
    title: "Stone Coated Shingles",
    description: "Premium, extremely durable with a natural stone look. The ultimate choice for longevity.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVQkiyRnLoLcl-UpSm32HdEeAXXecu20HpdAZdt7A_Ae1fNYlzqSYKuXHVTvq2UnaYMLytm1t2Z_qduJx9_cdLJXYCboAKLCE1SmgH72kgasCUvJV4b1SihxKpWjCf9_wFS8TI1Gy1dDiGQEt5dFDW-V1F2U-puhF_xql_y5OxG1l4_NieCP6ALHKbYc_9_Kg9_cxW2CKwa2AZUISySmKBEtzEqLOnUYXU2ne-Al8gunq2lMw8ixpap0-sG57pzV6r9CjGvOLD5Bw",
    category: "Pinnacle"
  },
  {
    id: "box-profile",
    title: "Box Profile",
    description: "Angular ribs for high strength. Ideal for industrial, commercial and modern residential roofing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3K8HWdu0_gkfiZyGFLdcXvc0cQIygbGSKfeCo2SHQ6jf4sqCmtslLqUv0H72CphC22d7x5_UFs2vI3C9Rf-HlufY9vZ-qa9zdXUv1wGSPw3trIXuHuGvw-y62Jk09Qi8qmwuYiKSCNHOLHtnaH5V1yrUNhILTVuGpRSL7O_nIKg7oGmaaWFTqXMOY_OifZ_a0u5huTYkMN9-Il43MDfYdEEmlMqj4DtGpHY1CLD5BQb_o4mT21vJM5W9vTYtT5B1WfHhqo9T4iaI",
    category: "Pinnacle",
    specs: {
      effectiveWidth: "880mm",
      gaugeRange: "28G - 32G"
    }
  },
  {
    id: "corrugated-sheets",
    title: "Corrugated Sheets",
    description: "The timeless classic waveform. Versatile, reliable, and the standard for structural economy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjkB95aCIQS21D0gtGtIa159FliCkDrwwQ3I-yUMoNXqe7TE1hhJVp31Ys05lF-G5MjY1NvsPzG0cF_K8kCuF26vnttSKHBNdsCMAANhQDkEE8INrjbSzpzCLowvgMcDvV7fzJ1w2MjAfcZhT34ZGB4NNDKHdH0UNMJCtbEkYQVZh8tksmbpGJ9y362sVxtWtZemupSDYonpZGTz9tyTht1FQXPVXOX7NEVomZLswhBJqMZuFRpkGwqcSYoDdttTUfWR9EQyST_o",
    category: "Colored"
  }
];
