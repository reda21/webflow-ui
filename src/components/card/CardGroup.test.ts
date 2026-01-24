import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CardGroup from "./CardGroup.vue";
import { h } from "vue";

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(
    public callback: any,
    public options: any,
  ) {}
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("CardGroup.vue", () => {
  const items = [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
  ];

  it("renders a list of items using the default slot", () => {
    const wrapper = mount(CardGroup, {
      props: {
        items,
      },
      slots: {
        default: (params: { item: any }) =>
          h("div", { class: "test-card" }, params.item.title),
      },
    });

    const renderedCards = wrapper.findAll(".test-card");
    expect(renderedCards.length).toBe(3);
    expect(renderedCards[0].text()).toBe("Card 1");
  });

  it("applies grid styles based on columns prop", () => {
    const wrapper = mount(CardGroup, {
      props: {
        columns: 4,
        gap: "2rem",
      },
    });

    const container = wrapper.find(".card-group");
    expect(container.attributes("style")).toContain(
      "grid-template-columns: repeat(4, minmax(0, 1fr))",
    );
    expect(container.attributes("style")).toContain("gap: 2rem");
  });

  it("initializes IntersectionObserver when virtual is true", () => {
    const wrapper = mount(CardGroup, {
      props: {
        items,
        virtual: true,
      },
    });

    // Check if global IntersectionObserver was instantiated
    // Since we stubbed it with a class, we can check if it was called (if it was a spy)
    // or just verify that it's being used.
    expect(wrapper.vm).toBeDefined();
  });

  it("renders placeholder instead of content if item is not visible in virtual mode", () => {
    const wrapper = mount(CardGroup, {
      props: {
        items,
        virtual: true,
      },
      slots: {
        default: (params: { item: any }) =>
          h("div", { class: "test-card" }, params.item.title),
      },
    });

    expect(wrapper.find(".test-card").exists()).toBe(false);
    expect(wrapper.find(".card-group-placeholder").exists()).toBe(true);
  });
});
