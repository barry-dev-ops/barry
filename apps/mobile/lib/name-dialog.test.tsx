import { tokensForAppearance } from "@rakazo/ui-tokens";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";
import { TextFieldDialog } from "../components/name-dialog";

const appearance = vi.hoisted(() => ({ value: "light" as "light" | "dark" }));
const text = vi.hoisted(() => vi.fn());
vi.mock("./appearance", () => ({
  mobileTokens: () => tokensForAppearance(appearance.value),
}));
vi.mock("./native", () => ({ useThemedStyles: (create: () => unknown) => create() }));
vi.mock("./i18n", () => ({ useI18n: () => ({ t: (value: string) => value }) }));
vi.mock("react-native", () => {
  const slot = ({ children }: { children?: ReactNode }) => children;
  return {
    StyleSheet: { create: (styles: unknown) => styles, absoluteFill: {} },
    KeyboardAvoidingView: slot,
    Modal: slot,
    Pressable: slot,
    View: slot,
    TextInput: () => null,
    Platform: { OS: "ios" },
    Text: (props: { children: ReactNode }) => {
      text(props);
      return props.children;
    },
  };
});

it.each(["light", "dark"] as const)(
  "uses readable standalone dialog actions in %s mode",
  (scheme) => {
    appearance.value = scheme;
    text.mockClear();
    renderToStaticMarkup(
      <TextFieldDialog
        title="Edit name"
        label="Name"
        submitLabel="Save"
        value="Draft"
        error={null}
        saving={false}
        onChange={() => {}}
        onSubmit={() => {}}
        onClose={() => {}}
      />,
    );
    for (const label of ["Cancel", "Save"]) {
      expect(
        text.mock.calls.find(([props]) => props.children === label)?.[0].style[0],
      ).toMatchObject({
        color: tokensForAppearance(scheme).link,
        fontSize: 14,
      });
    }
  },
);
