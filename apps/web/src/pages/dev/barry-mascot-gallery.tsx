import { BARRY_EXPRESSIONS, BarryMascot } from "@barry/brand/mascot";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "@barry/brand/brand.css";
import "@barry/brand/mascot.css";

function BarryMascotGallery() {
  const [expression, setExpression] = useState<(typeof BARRY_EXPRESSIONS)[number]>("idle");
  const [size, setSize] = useState(160);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <main className="gallery" data-barry-theme={theme}>
      <header>
        <h1>Barry mascot</h1>
      </header>
      <section className="preview" aria-label={`${theme} preview`}>
        <BarryMascot
          expression={expression}
          size={size}
          label={`Barry, ${expression}`}
          motion={!reducedMotion}
        />
      </section>
      <section className="controls" aria-label="Preview controls">
        <fieldset>
          <legend>Expression</legend>
          <div className="choices">
            {BARRY_EXPRESSIONS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={expression === item}
                onClick={() => setExpression(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          Background
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value as "light" | "dark")}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label>
          Size
          <input
            type="range"
            min="24"
            max="320"
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
          />
          {size}px
        </label>
        <label>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(event) => setReducedMotion(event.target.checked)}
          />
          Reduced motion
        </label>
      </section>
    </main>
  );
}

const style = document.createElement("style");
style.textContent = `
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.4 system-ui, sans-serif; }
  .gallery { min-height: 100vh; padding: 24px; background: var(--barry-background); color: var(--barry-foreground); }
  .gallery h1 { margin: 0 0 20px; font-size: 20px; }
  .preview { display: grid; min-height: 360px; place-items: center; border-radius: 16px; background: var(--barry-card); }
  .controls { display: grid; gap: 20px; margin: 24px auto; max-width: 800px; }
  fieldset { border: 0; padding: 0; margin: 0; }
  legend { margin-bottom: 8px; }
  .choices { display: flex; flex-wrap: wrap; gap: 8px; }
  button, select { border: 1px solid color-mix(in srgb, var(--barry-foreground) 35%, transparent); border-radius: 8px; padding: 8px 12px; background: transparent; color: inherit; cursor: pointer; }
  button[aria-pressed="true"] { background: var(--barry-primary); color: var(--barry-primary-foreground); }
  label { display: flex; align-items: center; gap: 8px; }
`;
document.head.append(style);
createRoot(document.getElementById("root")!).render(<BarryMascotGallery />);
