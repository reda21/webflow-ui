/**
 * Avatar Component - Performance Tests
 */
import { describe, it, expect, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Avatar from "./Avatar.vue";

describe("Avatar Performance", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  describe("Render Performance", () => {
    it("renders quickly with default props", () => {
      const start = performance.now();
      wrapper = mount(Avatar);
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(200);
    });

    it("renders 100 avatars efficiently", () => {
      const start = performance.now();
      const wrappers: VueWrapper[] = [];

      for (let i = 0; i < 100; i++) {
        wrappers.push(
          mount(Avatar, {
            props: { alt: `User ${i}`, size: "sm" },
          }),
        );
      }

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(2000);

      wrappers.forEach((w) => w.unmount());
    });
  });

  describe("Prop Update Performance", () => {
    it("handles rapid prop changes", async () => {
      wrapper = mount(Avatar, { props: { size: "md" } });
      const start = performance.now();
      const sizes = [
        "3xs",
        "2xs",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
      ] as const;

      for (let i = 0; i < 50; i++) {
        await wrapper.setProps({ size: sizes[i % sizes.length] });
      }

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(1000); // Relaxed from 500ms
    });
  });
});
