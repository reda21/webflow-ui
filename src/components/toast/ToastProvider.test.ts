import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ToastProvider from "./ToastProvider.vue";
import { nextTick, h, defineComponent } from "vue";
import { toastsState } from "./store";
import type { ToastPosition, ToastProps } from "./types";

// Mock Icon, Button, Avatar components
vi.mock("@/index", () => ({
  Icon: {
    name: "Icon",
    template: '<span class="mock-icon"></span>',
    props: ["name", "size"],
  },
  Button: {
    name: "Button",
    template: '<button class="mock-button"><slot /></button>',
    props: ["size", "variant", "severity", "loading", "icon", "ariaLabel"],
  },
  Avatar: {
    name: "Avatar",
    template: '<div class="mock-avatar"></div>',
    props: ["src", "size", "rounded", "loading"],
  },
}));

// Mock config
vi.mock("../../lib/config", () => ({
  useWebmxConfig: () => ({}),
}));

describe("ToastProvider Component", () => {
  let wrapper: VueWrapper<any>;

  const resetToastsState = () => {
    const positions: ToastPosition[] = [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top-center",
      "bottom-center",
    ];
    for (const pos of positions) {
      toastsState.value[pos] = [];
    }
  };

  beforeEach(() => {
    resetToastsState();
    vi.useFakeTimers();
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    resetToastsState();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ============================================
  // Basic Rendering
  // ============================================
  describe("Basic Rendering", () => {
    it("renders after mount (isClient)", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();
      expect(wrapper.find(".toast-containers").exists()).toBe(true);
    });

    it("renders slot content", async () => {
      wrapper = mount(ToastProvider, {
        slots: {
          default: '<div class="test-child">Child Content</div>',
        },
      });
      await nextTick();
      expect(wrapper.find(".test-child").exists()).toBe(true);
    });
  });

  // ============================================
  // Toast Management
  // ============================================
  describe("Toast Management", () => {
    it("adds a toast via exposed add method", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      const id = wrapper.vm.add({
        title: "Test Toast",
        description: "Test description",
      });

      await nextTick();
      expect(id).toBeDefined();
      expect(toastsState.value["top-right"].length).toBe(1);
    });

    it("adds toast to correct position", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({
        title: "Bottom Left Toast",
        position: "bottom-left",
      });

      await nextTick();
      expect(toastsState.value["bottom-left"].length).toBe(1);
      expect(toastsState.value["top-right"].length).toBe(0);
    });

    it("removes a toast via exposed remove method", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      const id = wrapper.vm.add({ title: "Test Toast" });
      await nextTick();
      expect(toastsState.value["top-right"].length).toBe(1);

      wrapper.vm.remove(id);
      await nextTick();
      expect(toastsState.value["top-right"].length).toBe(0);
    });

    it("updates existing toast via update method", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      const id = wrapper.vm.add({ title: "Original Title" });
      await nextTick();

      wrapper.vm.update(id, { title: "Updated Title" });
      await nextTick();

      const toast = toastsState.value["top-right"].find(
        (t: ToastProps) => t.id === id,
      );
      expect(toast?.title).toBe("Updated Title");
    });

    it("clears all toasts via clear method", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({ title: "Toast 1" });
      wrapper.vm.add({ title: "Toast 2", position: "bottom-right" });
      await nextTick();

      expect(toastsState.value["top-right"].length).toBe(1);
      expect(toastsState.value["bottom-right"].length).toBe(1);

      wrapper.vm.clear();
      await nextTick();

      expect(toastsState.value["top-right"].length).toBe(0);
      expect(toastsState.value["bottom-right"].length).toBe(0);
    });

    it("checks if toast is active via isActive method", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      const id = wrapper.vm.add({ title: "Test Toast" });
      await nextTick();

      expect(wrapper.vm.isActive(id)).toBe(true);
      expect(wrapper.vm.isActive("non-existent-id")).toBe(false);
    });
  });

  // ============================================
  // Max Limit
  // ============================================
  describe("Max Limit", () => {
    it("respects max prop limit", async () => {
      wrapper = mount(ToastProvider, {
        props: { max: 3 },
      });
      await nextTick();

      wrapper.vm.add({ title: "Toast 1" });
      wrapper.vm.add({ title: "Toast 2" });
      wrapper.vm.add({ title: "Toast 3" });
      wrapper.vm.add({ title: "Toast 4" });
      wrapper.vm.add({ title: "Toast 5" });

      await nextTick();
      expect(toastsState.value["top-right"].length).toBe(3);
    });

    it("removes oldest toast when max is exceeded", async () => {
      wrapper = mount(ToastProvider, {
        props: { max: 2 },
      });
      await nextTick();

      wrapper.vm.add({ title: "Toast 1" });
      wrapper.vm.add({ title: "Toast 2" });
      wrapper.vm.add({ title: "Toast 3" });

      await nextTick();
      const titles = toastsState.value["top-right"].map(
        (t: ToastProps) => t.title,
      );
      expect(titles).not.toContain("Toast 1");
      expect(titles).toContain("Toast 2");
      expect(titles).toContain("Toast 3");
    });
  });

  // ============================================
  // Deduplication
  // ============================================
  describe("Deduplication", () => {
    it("updates existing toast if same ID is used", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({ id: "unique-id", title: "Original" });
      await nextTick();

      // Wait to bypass rate limiting
      vi.advanceTimersByTime(600);

      wrapper.vm.add({ id: "unique-id", title: "Updated" });
      await nextTick();

      expect(toastsState.value["top-right"].length).toBe(1);
      expect(toastsState.value["top-right"][0].title).toBe("Updated");
    });

    it("rate limits duplicate content within 500ms", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({ title: "Same", description: "Content" });
      wrapper.vm.add({ title: "Same", description: "Content" });

      await nextTick();
      expect(toastsState.value["top-right"].length).toBe(1);
    });

    it("allows same content after 500ms", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({ title: "Same", description: "Content" });
      await nextTick();

      vi.advanceTimersByTime(600);

      wrapper.vm.add({ title: "Same", description: "Content" });
      await nextTick();

      expect(toastsState.value["top-right"].length).toBe(2);
    });
  });

  // ============================================
  // Stacked Mode
  // ============================================
  describe("Stacked Mode", () => {
    it("applies stacked class when enabled", async () => {
      wrapper = mount(ToastProvider, {
        props: { stacked: true },
      });
      await nextTick();

      wrapper.vm.add({ title: "Toast 1" });
      await nextTick();

      const viewport = wrapper.find(".toast-viewport");
      expect(viewport.classes()).toContain("toast-viewport--stacked");
    });

    it("expands on hover when stacked", async () => {
      wrapper = mount(ToastProvider, {
        props: { stacked: true },
      });
      await nextTick();

      wrapper.vm.add({ title: "Toast 1" });
      await nextTick();

      const viewport = wrapper.find(".toast-viewport");
      await viewport.trigger("mouseenter");

      expect(viewport.classes()).toContain("toast-viewport--expanded");
    });

    it("collapses on mouseleave when stacked", async () => {
      wrapper = mount(ToastProvider, {
        props: { stacked: true },
      });
      await nextTick();

      wrapper.vm.add({ title: "Toast 1" });
      await nextTick();

      const viewport = wrapper.find(".toast-viewport");
      await viewport.trigger("mouseenter");
      await viewport.trigger("mouseleave");

      expect(viewport.classes()).not.toContain("toast-viewport--expanded");
    });
  });

  // ============================================
  // Callbacks
  // ============================================
  describe("Callbacks", () => {
    it("calls onAdd callback when toast is added", async () => {
      const onAdd = vi.fn();
      wrapper = mount(ToastProvider, {
        props: { onAdd },
      });
      await nextTick();

      wrapper.vm.add({ title: "Test Toast" });
      await nextTick();

      expect(onAdd).toHaveBeenCalledTimes(1);
      expect(onAdd).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Test Toast" }),
      );
    });

    it("calls onRemove callback when toast is removed", async () => {
      const onRemove = vi.fn();
      wrapper = mount(ToastProvider, {
        props: { onRemove },
      });
      await nextTick();

      const id = wrapper.vm.add({ title: "Test Toast" });
      await nextTick();

      wrapper.vm.remove(id);
      await nextTick();

      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onRemove).toHaveBeenCalledWith(id);
    });
  });

  // ============================================
  // Provide/Inject
  // ============================================
  describe("Provide/Inject", () => {
    it("provides toast API to children", async () => {
      let injectedToast: any = null;

      const ChildComponent = defineComponent({
        inject: ["toast"],
        created() {
          injectedToast = this.toast;
        },
        template: "<div>Child</div>",
      });

      wrapper = mount(ToastProvider, {
        slots: {
          default: () => h(ChildComponent),
        },
      });

      await nextTick();
      expect(injectedToast).toBeTruthy();
      expect(typeof injectedToast.add).toBe("function");
      expect(typeof injectedToast.remove).toBe("function");
      expect(typeof injectedToast.clear).toBe("function");
    });
  });

  // ============================================
  // Viewport Rendering
  // ============================================
  describe("Viewport Rendering", () => {
    it("renders viewport for each position with toasts", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({ title: "Top Right", position: "top-right" });
      wrapper.vm.add({ title: "Bottom Left", position: "bottom-left" });
      await nextTick();

      expect(wrapper.find(".toast-viewport--top-right").exists()).toBe(true);
      expect(wrapper.find(".toast-viewport--bottom-left").exists()).toBe(true);
    });

    it("does not render empty viewports", async () => {
      wrapper = mount(ToastProvider);
      await nextTick();

      wrapper.vm.add({ title: "Top Right", position: "top-right" });
      await nextTick();

      expect(wrapper.find(".toast-viewport--top-right").exists()).toBe(true);
      expect(wrapper.find(".toast-viewport--bottom-left").exists()).toBe(false);
    });
  });
});
