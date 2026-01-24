/**
 * Tooltip Component - Performance Tests
 */
import { describe, it, expect, afterEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";
import { nextTick } from "vue";

describe("Tooltip Performance", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    document.body.innerHTML = "";
  });

  describe("Render Performance", () => {
    it("renders quickly with default props", () => {
      const start = performance.now();
      wrapper = mount(Tooltip, {
        props: { content: "Performance test" },
        slots: { default: "<button>Trigger</button>" },
      });
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(300); // 300ms threshold
    });

    it("shows/hides 50 tooltips efficiently", async () => {
      const wrappers: VueWrapper[] = [];
      for (let i = 0; i < 50; i++) {
        wrappers.push(
          mount(Tooltip, {
            props: { content: `Tooltip ${i}` },
            slots: { default: `<button id="btn-${i}">Btn ${i}</button>` },
          }),
        );
      }

      const start = performance.now();
      for (const w of wrappers) {
        await w.find(".tooltip-wrapper").trigger("mouseenter");
      }
      await nextTick();
      const duration = performance.now() - start;

      // Checking 50 triggers
      expect(duration).toBeLessThan(1500);

      wrappers.forEach((w) => w.unmount());
    });
  });

  describe("Prop Update Performance", () => {
    it("handles rapid position changes", async () => {
      wrapper = mount(Tooltip, {
        props: { content: "Test", position: "top" },
        slots: { default: "<button>Trigger</button>" },
      });

      const start = performance.now();
      const positions = [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "bottom-end",
      ] as const;

      for (let i = 0; i < 30; i++) {
        await wrapper.setProps({ position: positions[i % positions.length] });
      }

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(1000);
    });
  });
});
