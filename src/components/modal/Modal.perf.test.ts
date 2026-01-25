import { describe, it, expect, afterEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Modal from "./Modal.vue";
import { nextTick } from "vue";

describe("Modal Performance", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    document.body.innerHTML = "";
  });

  describe("Render Performance", () => {
    it("renders quickly when opened", async () => {
      const start = performance.now();
      wrapper = mount(Modal, {
        props: {
          modelValue: true,
          title: "Perf Test",
        },
      });
      await nextTick();
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(2500); // 2.5s relaxed threshold
    });

    it("handles rapid prop updates efficiently", async () => {
      wrapper = mount(Modal, {
        props: { modelValue: true, size: "md" },
      });
      await nextTick();

      const start = performance.now();
      const sizes = ["sm", "md", "lg", "xl", "full"] as const;

      for (let i = 0; i < 20; i++) {
        await wrapper.setProps({ size: sizes[i % sizes.length] });
        await nextTick();
      }

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(3500); // 20 updates in less than 3.5s
    });
  });

  describe("Memory Cleanup", () => {
    it("clears autoClose timer on unmount", async () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      wrapper = mount(Modal, {
        props: { modelValue: true, autoClose: 5000 },
      });

      await nextTick();
      await nextTick();

      wrapper.unmount();
      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });
});
