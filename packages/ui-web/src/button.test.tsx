import { describe, expect, it } from "vitest";
import { buttonVariants } from "./components/ui/button.js";
import { cn } from "./lib/utils.js";

describe("buttonVariants", () => {
  it("uses the accessible link color rather than the solid action fill for links", () => {
    const classes = buttonVariants({ variant: "link" }).split(" ");
    expect(classes).toContain("text-link");
    expect(classes).not.toContain("text-primary");
  });

  it.each(["default", "sm", "xs", "icon-sm", "icon-lg"] as const)(
    "keeps floating buttons a pill at size %s",
    (size) => {
      // Button merges its classes with cn, so later radius classes win.
      const classes = cn(buttonVariants({ variant: "floating", size })).split(" ");
      expect(classes).toContain("rounded-full");
      expect(classes.filter((name) => /^rounded-(?!full$)/.test(name))).toEqual([]);
    },
  );
});
