import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Toast from "./Toast.vue";
import { nextTick } from "vue";

// Mock Icon, Button, Avatar components
vi.mock("@/index", () => ({
  Icon: {
    name: "Icon",
    template: '<span class="mock-icon" :data-name="name"></span>',
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

describe("Toast Accessibility", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  // ============================================
  // ARIA Attributes
  // ============================================
  describe("ARIA Attributes", () => {
    it("has role='alert' for foreground type", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", type: "foreground" },
      });
      expect(wrapper.find(".toast-root").attributes("role")).toBe("alert");
    });

    it("has role='status' for background type", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", type: "background" },
      });
      expect(wrapper.find(".toast-root").attributes("role")).toBe("status");
    });

    it("has aria-live='assertive' for foreground type", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", type: "foreground" },
      });
      expect(wrapper.find(".toast-root").attributes("aria-live")).toBe(
        "assertive",
      );
    });

    it("has aria-live='polite' for background type", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", type: "background" },
      });
      expect(wrapper.find(".toast-root").attributes("aria-live")).toBe(
        "polite",
      );
    });

    it("close button has aria-label", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", closable: true },
      });
      const closeBtn = wrapper.find(".toast-close");
      expect(closeBtn.attributes("aria-label")).toBe("Fermer");
    });
  });

  // ============================================
  // Keyboard Navigation
  // ============================================
  describe("Keyboard Navigation", () => {
    it("responds to Escape key", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1" },
      });
      await nextTick();

      // Simulate keydown event on window
      const event = new KeyboardEvent("keydown", { key: "Escape" });
      window.dispatchEvent(event);
      await nextTick();

      expect(wrapper.emitted("escapeKeyDown")).toBeTruthy();
    });

    it("closes on Escape when not preventClose", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", preventClose: false, duration: 0 },
      });
      await nextTick();

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      window.dispatchEvent(event);
      await nextTick();

      expect(wrapper.emitted("close")).toBeTruthy();
    });

    it("does not close on Escape when preventClose is true", async () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", preventClose: true, duration: 0 },
      });
      await nextTick();

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      window.dispatchEvent(event);
      await nextTick();

      expect(wrapper.emitted("close")).toBeFalsy();
    });
  });

  // ============================================
  // Focus Management
  // ============================================
  describe("Focus Management", () => {
    it("close button is focusable", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", closable: true },
      });
      const closeBtn = wrapper.find(".toast-close");
      expect(closeBtn.element.tagName.toLowerCase()).toBe("button");
    });

    it("action buttons are focusable", () => {
      wrapper = mount(Toast, {
        props: {
          id: "test-1",
          action: { label: "Action", onClick: vi.fn() },
        },
      });
      const actionBtn = wrapper.find(".mock-button");
      expect(actionBtn.exists()).toBe(true);
    });
  });

  // ============================================
  // Screen Reader Content
  // ============================================
  describe("Screen Reader Content", () => {
    it("title is semantically marked as heading", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", title: "Important Notice" },
      });
      const title = wrapper.find(".toast-title");
      expect(title.element.tagName.toLowerCase()).toBe("h4");
    });

    it("description is in paragraph element", () => {
      wrapper = mount(Toast, {
        props: { id: "test-1", description: "Description text" },
      });
      const desc = wrapper.find(".toast-description");
      expect(desc.element.tagName.toLowerCase()).toBe("p");
    });
  });
});
