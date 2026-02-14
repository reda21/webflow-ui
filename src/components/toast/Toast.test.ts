import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Toast from "./Toast.vue";
import { nextTick } from "vue";

// Mock Icon, Button, Avatar components
vi.mock("../icon/Icon.vue", () => ({
  default: {
    name: "Icon",
    template: '<span class="mock-icon" :data-name="name"></span>',
    props: ["name", "size"],
  },
}));
vi.mock("../button/Button.vue", () => ({
  default: {
    name: "Button",
    template: '<button class="mock-button"><slot /></button>',
    props: ["size", "variant", "severity", "loading", "icon", "ariaLabel"],
  },
}));
vi.mock("../avatar/index", () => ({
  Avatar: {
    name: "Avatar",
    template: '<div class="mock-avatar"></div>',
    props: ["src", "size", "rounded", "loading"],
  },
}));

describe("Toast Component", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ============================================
  // Props & Default Values
  // ============================================
  describe("Props and Default Values", () => {
    it("renders with required id prop", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      expect(wrapper.find(".toast-root").exists()).toBe(true);
    });

    it("applies default severity (contrast)", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      expect(wrapper.find(".toast-contrast").exists()).toBe(true);
    });

    it("renders title when provided", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", title: "Test Title" },
      });
      expect(wrapper.find(".toast-title").text()).toBe("Test Title");
    });

    it("renders description when provided", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", description: "Test Description" },
      });
      expect(wrapper.find(".toast-description").exists()).toBe(true);
    });

    it("applies correct severity class", () => {
      const severities = [
        "primary",
        "secondary",
        "success",
        "info",
        "warn",
        "help",
        "danger",
        "contrast",
      ] as const;

      for (const severity of severities) {
        const tempWrapper = mount(Toast, {
          props: { id: "test-1", severity },
        });
        const expectedClass =
          severity === "warn" ? "toast-warn" : `toast-${severity}`;
        expect(tempWrapper.find(`.${expectedClass}`).exists()).toBe(true);
        tempWrapper.unmount();
      }
    });

    it("normalizes 'warning' severity to 'warn'", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", severity: "warning" },
      });
      expect(wrapper.find(".toast-warn").exists()).toBe(true);
    });

    it("applies variant class", () => {
      const variants = ["soft", "minimal", "outlined", "glass"] as const;

      for (const variant of variants) {
        const tempWrapper = mount(Toast, {
          props: { id: "test-1", variant },
        });
        expect(tempWrapper.find(`.toast-variant-${variant}`).exists()).toBe(
          true,
        );
        tempWrapper.unmount();
      }
    });

    it("applies animation class", () => {
      const animations = ["slide", "fade", "scale", "bounce"] as const;

      for (const animation of animations) {
        const tempWrapper = mount(Toast, {
          props: { id: "test-1", animation },
        });
        expect(tempWrapper.find(`.toast-animation-${animation}`).exists()).toBe(
          true,
        );
        tempWrapper.unmount();
      }
    });

    it("applies width class when specified", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", width: "lg" },
      });
      expect(wrapper.find(".toast-width-lg").exists()).toBe(true);
    });

    it("applies orientation class", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", orientation: "vertical" },
      });
      expect(wrapper.find(".toast--vertical").exists()).toBe(true);
    });

    it("shows close button when closable is true (default)", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      expect(wrapper.find(".toast-close").exists()).toBe(true);
    });

    it("hides close button when closable is false", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", closable: false },
      });
      expect(wrapper.find(".toast-close").exists()).toBe(false);
    });

    it("shows progress bar by default", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 5000 },
      });
      expect(wrapper.find(".toast-progress").exists()).toBe(true);
    });

    it("hides progress bar when progress is false", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", progress: false },
      });
      expect(wrapper.find(".toast-progress").exists()).toBe(false);
    });

    it("hides progress bar when duration is 0", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 0 },
      });
      expect(wrapper.find(".toast-progress").exists()).toBe(false);
    });

    it("applies custom progress color", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", progress: { color: "#ff0000" } },
      });
      const progressBar = wrapper.find(".toast-progress-bar");
      expect(progressBar.attributes("style")).toContain(
        "background-color: rgb(255, 0, 0)",
      );
    });

    it("sets correct ARIA role for foreground type", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", type: "foreground" },
      });
      expect(wrapper.find(".toast-root").attributes("role")).toBe("alert");
      expect(wrapper.find(".toast-root").attributes("aria-live")).toBe(
        "assertive",
      );
    });

    it("sets correct ARIA role for background type", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", type: "background" },
      });
      expect(wrapper.find(".toast-root").attributes("role")).toBe("status");
      expect(wrapper.find(".toast-root").attributes("aria-live")).toBe(
        "polite",
      );
    });
  });

  // ============================================
  // Event Emissions
  // ============================================
  describe("Event Emissions", () => {
    it("emits update:open true on mount", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      await nextTick();
      expect(wrapper.emitted("update:open")).toBeTruthy();
      expect(wrapper.emitted("update:open")![0]).toEqual([true]);
    });

    it("emits close event when close button clicked", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 0 },
      });
      await wrapper.find(".toast-close").trigger("click");
      expect(wrapper.emitted("close")).toBeTruthy();
      expect(wrapper.emitted("close")![0]).toEqual(["test-1"]);
    });

    it("emits update:open false when closing", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 0 },
      });
      await wrapper.find(".toast-close").trigger("click");
      expect(wrapper.emitted("update:open")).toBeTruthy();
      const emittedOpen = wrapper.emitted("update:open")!;
      expect(emittedOpen[emittedOpen.length - 1]).toEqual([false]);
    });

    it("emits pause event on mouseenter", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 5000 },
      });
      await wrapper.find(".toast-root").trigger("mouseenter");
      expect(wrapper.emitted("pause")).toBeTruthy();
    });

    it("emits resume event on mouseleave", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 5000 },
      });
      await wrapper.find(".toast-root").trigger("mouseenter");
      await wrapper.find(".toast-root").trigger("mouseleave");
      expect(wrapper.emitted("resume")).toBeTruthy();
    });

    it("emits close:prevent when preventClose is true", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", preventClose: true, closable: true },
      });
      // Manually call close which would be triggered internally
      wrapper.vm.close();
      await nextTick();
      expect(wrapper.emitted("close:prevent")).toBeTruthy();
      expect(wrapper.emitted("close:prevent")![0]).toEqual(["test-1"]);
    });

    it("does not emit close when preventClose is true", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", preventClose: true },
      });
      wrapper.vm.close();
      await nextTick();
      expect(wrapper.emitted("close")).toBeFalsy();
    });
  });

  // ============================================
  // Computed Properties
  // ============================================
  describe("Computed Properties", () => {
    it("shows severity icon by default", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", severity: "success" },
      });
      expect(wrapper.find(".toast-icon-wrapper").exists()).toBe(true);
    });

    it("hides icon when icon prop is false", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", icon: false },
      });
      expect(wrapper.find(".toast-icon-wrapper").exists()).toBe(false);
    });

    it("uses custom icon when string is provided", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", icon: "heroicons:star" },
      });
      const icon = wrapper.find(".mock-icon");
      expect(icon.attributes("data-name")).toBe("heroicons:star");
    });

    it("shows avatar instead of icon when avatar is provided", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", avatar: "https://example.com/avatar.png" },
      });
      expect(wrapper.find(".mock-avatar").exists()).toBe(true);
    });
  });

  // ============================================
  // Timer Pause/Resume
  // ============================================
  describe("Timer Pause/Resume", () => {
    it("auto-closes after duration", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 3000 },
      });

      await nextTick();
      vi.advanceTimersByTime(3100);
      await nextTick();

      expect(wrapper.emitted("close")).toBeTruthy();
    });

    it("pauses timer on mouseenter", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 3000 },
      });

      await nextTick();
      vi.advanceTimersByTime(1000);

      await wrapper.find(".toast-root").trigger("mouseenter");
      vi.advanceTimersByTime(5000);
      await nextTick();

      // Should not have closed yet since timer was paused
      expect(wrapper.emitted("close")).toBeFalsy();
    });

    it("resumes timer on mouseleave", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 3000 },
      });

      await nextTick();
      vi.advanceTimersByTime(1000);

      await wrapper.find(".toast-root").trigger("mouseenter");
      await wrapper.find(".toast-root").trigger("mouseleave");

      vi.advanceTimersByTime(2500);
      await nextTick();

      expect(wrapper.emitted("close")).toBeTruthy();
    });

    it("does not auto-close when duration is 0", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 0 },
      });

      await nextTick();
      vi.advanceTimersByTime(10000);
      await nextTick();

      expect(wrapper.emitted("close")).toBeFalsy();
    });

    it("does not auto-close when preventClose is true", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", duration: 3000, preventClose: true },
      });

      await nextTick();
      vi.advanceTimersByTime(5000);
      await nextTick();

      expect(wrapper.emitted("close")).toBeFalsy();
    });
  });

  // ============================================
  // Shake Animation
  // ============================================
  describe("Shake Animation", () => {
    it("applies shake class when trying to close persistent toast", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", preventClose: true },
      });

      wrapper.vm.close();
      await nextTick();

      expect(wrapper.find(".toast-shake").exists()).toBe(true);

      vi.advanceTimersByTime(600);
      await nextTick();

      expect(wrapper.find(".toast-shake").exists()).toBe(false);
    });

    it("exposes shake method", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      expect(typeof wrapper.vm.shake).toBe("function");
    });
  });

  // ============================================
  // Actions
  // ============================================
  describe("Actions", () => {
    it("renders single action button", () => {
      wrapper = mount(Toast, {
        props: {
          id: "test-1",
          action: { label: "Undo", onClick: vi.fn() },
        },
      });
      expect(wrapper.find(".toast-actions").exists()).toBe(true);
      expect(wrapper.find(".mock-button").text()).toBe("Undo");
    });

    it("renders multiple action buttons", () => {
      wrapper = mount(Toast, {
        props: {
          id: "test-1",
          actions: [
            { label: "Retry", onClick: vi.fn() },
            { label: "Cancel", onClick: vi.fn() },
          ],
        },
      });
      const buttons = wrapper.findAll(".mock-button");
      expect(buttons.length).toBe(2);
    });
  });

  // ============================================
  // Image & Link
  // ============================================
  describe("Image & Link", () => {
    it("renders inline image when provided", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", image: "https://example.com/image.png" },
      });
      const img = wrapper.find(".toast-image");
      expect(img.exists()).toBe(true);
      expect(img.attributes("src")).toBe("https://example.com/image.png");
    });

    it("renders link when provided", () => {
      wrapper = mount(Toast, {
        props: {
          id: "test-1",
          link: { url: "https://example.com", label: "Visit" },
        },
      });
      const link = wrapper.find("a");
      expect(link.exists()).toBe(true);
      expect(link.attributes("href")).toBe("https://example.com");
    });

    it("renders link preview when provided", () => {
      wrapper = mount(Toast, {
        props: {
          id: "test-1",
          link: {
            url: "https://example.com",
            preview: {
              title: "Example Site",
              description: "A description",
            },
          },
        },
      });
      expect(wrapper.find(".toast-preview-card").exists()).toBe(true);
    });
  });

  // ============================================
  // Expose
  // ============================================
  describe("Exposed Methods & Properties", () => {
    it("exposes height ref", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      expect(wrapper.vm.height).toBeDefined();
    });

    it("exposes shake method", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      expect(typeof wrapper.vm.shake).toBe("function");
    });
  });
});
