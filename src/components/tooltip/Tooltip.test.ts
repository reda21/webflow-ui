import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";
import { nextTick } from "vue";

describe("Tooltip", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    document.body.innerHTML = "";
  });

  it("renders trigger element", () => {
    wrapper = mount(Tooltip, {
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });
    expect(wrapper.find("#trigger").exists()).toBe(true);
  });

  it("shows tooltip on hover by default", async () => {
    wrapper = mount(Tooltip, {
      props: { content: "Tooltip content" },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await nextTick();

    // Tooltip is teleported to body by default
    const tooltip = document.body.querySelector(".tooltip-content");
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toContain("Tooltip content");
  });

  it("hides tooltip on mouseleave", async () => {
    vi.useFakeTimers();
    wrapper = mount(Tooltip, {
      props: { content: "Tooltip content" },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    vi.runAllTimers();
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeTruthy();

    await wrapper.find(".tooltip-wrapper").trigger("mouseleave");
    vi.runAllTimers();
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeFalsy();
    vi.useRealTimers();
  });

  it("respects delay prop for showing", async () => {
    vi.useFakeTimers();
    wrapper = mount(Tooltip, {
      props: { content: "Delayed", delay: 500 },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    expect(document.body.querySelector(".tooltip-content")).toBeFalsy();

    vi.advanceTimersByTime(500);
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeTruthy();

    vi.useRealTimers();
  });

  it("works with click trigger", async () => {
    vi.useFakeTimers();
    wrapper = mount(Tooltip, {
      props: { content: "Click tooltip", trigger: "click" },
      slots: {
        default: '<button id="trigger">Click me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("click");
    vi.runAllTimers();
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeTruthy();

    await wrapper.find(".tooltip-wrapper").trigger("click");
    vi.runAllTimers();
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeFalsy();
    vi.useRealTimers();
  });

  it("does not show when disabled", async () => {
    wrapper = mount(Tooltip, {
      props: { content: "Disabled tooltip", disabled: true },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeFalsy();
  });

  it("supports HTML content", async () => {
    wrapper = mount(Tooltip, {
      props: { content: "<b>Bold</b> text", html: true },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await nextTick();
    const tooltip = document.body.querySelector(".tooltip-content");
    expect(tooltip?.querySelector("b")).toBeTruthy();
    expect(tooltip?.querySelector("b")?.textContent).toBe("Bold");
  });
});
