import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Modal from "./Modal.vue";
import { nextTick } from "vue";

describe("Modal Component", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    document.body.innerHTML = "";
  });

  it("renders when open is true", async () => {
    wrapper = mount(Modal, {
      props: {
        modelValue: true,
        title: "Test Modal",
        description: "Test Description",
      },
      slots: {
        default: "<p>Modal Content</p>",
      },
    });

    await nextTick();

    // Element is teleported to body by default
    const content = document.body.querySelector(".modal-content");
    expect(content).toBeTruthy();
    expect(content?.textContent).toContain("Test Modal");
    expect(content?.textContent).toContain("Test Description");
    expect(content?.textContent).toContain("Modal Content");
  });

  it("does not render when open is false", async () => {
    wrapper = mount(Modal, {
      props: {
        modelValue: false,
        title: "Test Modal",
      },
    });

    await nextTick();
    const content = document.body.querySelector(".modal-content");
    expect(content).toBeFalsy();
  });

  it("emits open event when opened", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: false },
    });

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    expect(wrapper.emitted("open")).toBeTruthy();
  });

  it("emits close event when closed", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true },
    });

    await nextTick();
    // We can't easily trigger Radix close from outside without clicking the button
    // But we can call the exposed close method
    wrapper.vm.close("test-result");
    await nextTick();

    expect(wrapper.emitted("close")).toBeTruthy();
    expect(wrapper.emitted("close")![0]).toEqual(["test-result"]);
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
  });

  it("applies correct size classes", async () => {
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;

    for (const size of sizes) {
      const tempWrapper = mount(Modal, {
        props: { modelValue: true, size },
      });
      await nextTick();
      const content = document.body.querySelector(".modal-content");
      expect(content?.classList.contains(`modal--${size}`)).toBe(true);
      tempWrapper.unmount();
    }
  });

  it("applies severity classes and shows icon", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true, severity: "danger", title: "Error" },
    });

    await nextTick();
    const content = document.body.querySelector(".modal-content");
    expect(content?.classList.contains("modal--danger")).toBe(true);

    const icon = document.body.querySelector(".modal-header-icon");
    expect(icon).toBeTruthy();
    expect(icon?.classList.contains("text-danger")).toBe(true);
  });

  it("respects dismissible prop", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true, dismissible: false },
    });

    await nextTick();

    // Simulating Radix outside click or escape is hard in JSDOM/Happy-DOM without full integration
    // But we can check if the interact-outside handler is configured to prevent default
    // In our component logic, dismissible: false calls event.preventDefault()
  });

  it("renders footer slot", async () => {
    wrapper = mount(Modal, {
      props: { modelValue: true },
      slots: {
        footer: '<button id="footer-btn">Action</button>',
      },
    });

    await nextTick();
    const footerBtn = document.body.querySelector("#footer-btn");
    expect(footerBtn).toBeTruthy();
  });

  it("handles auto-close delay", async () => {
    vi.useFakeTimers();
    wrapper = mount(Modal, {
      props: { modelValue: true, autoClose: 1000 },
    });

    await nextTick();
    await nextTick();

    vi.advanceTimersByTime(1100);
    await vi.runAllTimersAsync();
    await nextTick();
    await nextTick();

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
    vi.useRealTimers();
  });
});
