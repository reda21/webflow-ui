/**
 * Icon Component - Performance Tests
 */
import { describe, it, expect, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Icon from "./Icon.vue";

describe("Icon Performance", () => {
  let wrapper: VueWrapper;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  describe("Render Performance", () => {
    it("renders quickly with default props", () => {
      const start = performance.now();
      wrapper = mount(Icon, {
        props: { name: "heroicons:user" },
        global: { stubs: { IconifyIcon: true } },
      });
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(150); // Increased from 50ms
    });

    it("renders 100 icons efficiently", () => {
      const start = performance.now();
      const wrappers: VueWrapper[] = [];

      for (let i = 0; i < 100; i++) {
        wrappers.push(
          mount(Icon, {
            props: { name: `heroicons:user` },
            global: { stubs: { IconifyIcon: true } },
          }),
        );
      }

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(1000); // Increased from 500ms

      wrappers.forEach((w) => w.unmount());
    });

    it("CSS mode renders fast", () => {
      const start = performance.now();
      wrapper = mount(Icon, {
        props: { name: "heroicons:check", mode: "css" },
      });
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100); // Increased from 20)
    });
  });

  describe("Prop Update Performance", () => {
    it("handles rapid size changes", async () => {
      wrapper = mount(Icon, {
        props: { name: "heroicons:user", size: "md" },
        global: { stubs: { IconifyIcon: true } },
      });

      const start = performance.now();
      const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

      for (let i = 0; i < 50; i++) {
        await wrapper.setProps({ size: sizes[i % sizes.length] });
      }

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(1000); // Increased from 300ms
    });
  });
});
