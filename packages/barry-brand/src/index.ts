export const barryBrand = {
  name: "Barry",
  colors: {
    chocolate: "#3E2214",
    gold: "#FFC928",
    cream: "#FFF3D9",
    background: "#FBF8F2",
    charcoal: "#33383D",
  },
  typography: {
    fontFamily: "inherit",
  },
  assets: {
    logo: "./assets/barry-mascot-reference.png",
    mascot: "./assets/barry-mascot-reference.png",
  },
} as const;

export const barryThemeTokens = {
  light: {
    background: barryBrand.colors.background,
    foreground: barryBrand.colors.charcoal,
    card: barryBrand.colors.cream,
    primary: barryBrand.colors.chocolate,
    primaryForeground: barryBrand.colors.cream,
    accent: barryBrand.colors.gold,
  },
  dark: {
    background: barryBrand.colors.chocolate,
    foreground: barryBrand.colors.cream,
    card: barryBrand.colors.charcoal,
    primary: barryBrand.colors.gold,
    primaryForeground: barryBrand.colors.chocolate,
    accent: barryBrand.colors.gold,
  },
} as const;
