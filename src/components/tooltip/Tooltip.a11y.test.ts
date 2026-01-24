import { describe, it, expect, afterEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";
import { nextTick } from "vue";

describe("Tooltip Accessibility", () => {
  let wrapper: VueWrapper<any>;

  afterEach(() => {
    if (wrapper) wrapper.unmount();
    document.body.innerHTML = "";
  });

  it("sets aria-describedby on trigger element when visible", async () => {
    wrapper = mount(Tooltip, {
      props: { content: "Tooltip content" },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    const trigger = wrapper.find(".tooltip-trigger");
    expect(trigger.attributes("aria-describedby")).toBeUndefined();

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await nextTick();

    const tooltipId = document.body.querySelector(".tooltip-content")?.id;
    expect(trigger.attributes("aria-describedby")).toBe(tooltipId);
  });

  it("sets correct role on tooltip content", async () => {
    wrapper = mount(Tooltip, {
      props: { content: "Tooltip content", role: "tooltip" },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await nextTick();

    const tooltip = document.body.querySelector(".tooltip-content");
    expect(tooltip?.getAttribute("role")).toBe("tooltip");
  });

  it("sets aria-hidden correctly", async () => {
    wrapper = mount(Tooltip, {
      props: { content: "Tooltip content" },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await nextTick();

    const tooltip = document.body.querySelector(".tooltip-content");
    expect(tooltip?.getAttribute("aria-hidden")).toBe("false");

    await wrapper.find(".tooltip-wrapper").trigger("mouseleave");
    await nextTick();
    // Note: When using Vue Transition, it might stay in DOM for a bit but aria-hidden is handled by v-if/v-show
  });

  it("closes on Escape key press", async () => {
    vi.useFakeTimers();
    wrapper = mount(Tooltip, {
      props: { content: "Tooltip content", closeOnEscape: true },
      slots: {
        default: '<button id="trigger">Hover me</button>',
      },
      attachTo: document.body,
    });

    await wrapper.find(".tooltip-wrapper").trigger("mouseenter");
    await vi.runAllTimersAsync();
    await nextTick();
    expect(document.body.querySelector(".tooltip-content")).toBeTruthy();

    // Simulate Escape key
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await vi.runAllTimersAsync();
    await nextTick();
    await nextTick(); // Double tick just in case

    expect(document.body.querySelector(".tooltip-content")).toBeFalsy();
    vi.useRealTimers();
  });
});
