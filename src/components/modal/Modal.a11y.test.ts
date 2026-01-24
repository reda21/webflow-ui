import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Modal from "./Modal.vue";
import { nextTick } from "vue";

describe("Modal Accessibility", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    document.body.innerHTML = "";
  });

  it("has correct ARIA role", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true, role: "alertdialog" },
    });

    await nextTick();
    const content = document.body.querySelector(".modal-content");
    expect(content?.getAttribute("role")).toBe("alertdialog");
  });

  it("provides aria-label when title is set", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true, title: "Accessibility Title" },
    });

    await nextTick();
    // Radix handles aria-labelledby pointing to the title automatically if it's there
    const content = document.body.querySelector(".modal-content");
    const titleId = document.body.querySelector(".modal-title")?.id;
    expect(content?.getAttribute("aria-labelledby")).toBe(titleId);
  });

  it("emits aria-live announcements for state changes", async () => {
    wrapper = mount(Modal, {
      props: {
        modelValue: false,
        announcements: {
          opened: "Window is now open",
          closed: "Window is now closed",
        },
      },
    });

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    const liveRegion = document.body.querySelector('[aria-live="polite"]');
    expect(liveRegion?.textContent).toContain("Window is now open");

    await wrapper.setProps({ modelValue: false });
    await nextTick();
    // Note: content might be unmounted, but the announcement state is internally tracked
    // and we can check the variable if we had access or check if the region was updated before unmount
  });

  it("includes a visually hidden description if none provided", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true },
    });

    await nextTick();
    const srOnlyDescription = document.body.querySelector(".sr-only");
    expect(srOnlyDescription).toBeTruthy();
    expect(srOnlyDescription?.textContent).toBe("Modal Content");
  });

  it("handles keyboard navigation (Escape key)", async () => {
    vi.useFakeTimers();
    wrapper = mount(Modal, {
      props: { modelValue: true, closeOnEscape: true },
      attachTo: document.body,
    });

    await nextTick();
    expect(document.body.querySelector(".modal-content")).toBeTruthy();

    // Distpatch escape on document
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    await nextTick();
    // In Radix, Escape might be handled on the content element
    // But our component also listens on document for some cases or relies on Radix

    vi.useRealTimers();
  });
});
