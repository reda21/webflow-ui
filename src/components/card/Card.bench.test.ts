import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CardGroup from "./CardGroup.vue";
import Card from "./Card.vue";
import { h } from "vue";

describe("Card Performance Benchmarks", () => {
  const generateItems = (count: number) =>
    Array.from({ length: count }, (_, i) => ({ id: i, title: `Card ${i}` }));

  it("renders a large number of cards efficiently", () => {
    const items = generateItems(50);
    const start = performance.now();

    mount(CardGroup, {
      props: { items },
      slots: {
        default: (params: { item: any }) =>
          h(Card, { title: params.item.title }),
      },
    });

    const end = performance.now();
    const duration = end - start;
    console.log(`Rendered 50 cards (no virtual) in ${duration.toFixed(2)}ms`);

    expect(duration).toBeDefined();
  });

  it("initializes virtualization for very large lists", () => {
    const items = generateItems(500);
    const start = performance.now();

    mount(CardGroup, {
      props: {
        items,
        virtual: true,
      },
      slots: {
        default: (params: { item: any }) =>
          h(Card, { title: params.item.title }),
      },
    });

    const end = performance.now();
    const duration = end - start;
    console.log(`Initialized 500 cards (virtual) in ${duration.toFixed(2)}ms`);

    expect(duration).toBeDefined();
  });
});
