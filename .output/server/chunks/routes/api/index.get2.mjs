import { c as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'node:crypto';

const index_get = defineEventHandler(async () => {
  return [
    { slug: "technology", label: "Technology", description: "Programming, AI, and software engineering.", icon: "\u{1F4BB}", colors: { dark: "#1E3A5F", mid: "#4A9EFF", light: "#E8F3FF" }, bookCount: 1240 },
    { slug: "science", label: "Science", description: "Biology, physics, and the natural world.", icon: "\u{1F52C}", colors: { dark: "#0D3B2E", mid: "#2ECC71", light: "#E8FBF3" }, bookCount: 890 },
    { slug: "business", label: "Business", description: "Strategy, finance, and entrepreneurship.", icon: "\u{1F4C8}", colors: { dark: "#3B1F00", mid: "#F5A623", light: "#FFF8EC" }, bookCount: 760 },
    { slug: "fiction", label: "Fiction", description: "Novels and literary works.", icon: "\u{1F4D6}", colors: { dark: "#2D0A4E", mid: "#A855F7", light: "#F5EEFF" }, bookCount: 2100 },
    { slug: "history", label: "History", description: "Ancient civilizations to modern events.", icon: "\u{1F3DB}\uFE0F", colors: { dark: "#3B2200", mid: "#C0874F", light: "#FFF5EB" }, bookCount: 540 },
    { slug: "design", label: "Design", description: "Graphic design, UX/UI, and typography.", icon: "\u{1F3A8}", colors: { dark: "#1A1A2E", mid: "#FF6B9D", light: "#FFF0F5" }, bookCount: 320 },
    { slug: "philosophy", label: "Philosophy", description: "Ethics, logic, and great thinkers.", icon: "\u{1F9E0}", colors: { dark: "#1C2340", mid: "#64748B", light: "#F1F5F9" }, bookCount: 280 },
    { slug: "self-help", label: "Self-Help", description: "Personal growth and peak performance.", icon: "\u{1F331}", colors: { dark: "#003D2E", mid: "#10B981", light: "#ECFDF5" }, bookCount: 670 },
    { slug: "travel", label: "Travel", description: "Guides and stories from around the globe.", icon: "\u2708\uFE0F", colors: { dark: "#1A3A4A", mid: "#38BDF8", light: "#F0F9FF" }, bookCount: 410 },
    { slug: "cooking", label: "Cooking", description: "Recipes and culinary traditions.", icon: "\u{1F373}", colors: { dark: "#3B0A00", mid: "#EF4444", light: "#FFF5F5" }, bookCount: 380 }
  ];
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
