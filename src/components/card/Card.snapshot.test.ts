import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

describe("Card Snapshot Tests", () => {
  it("matches snapshot with basic variants", () => {
    const variants = ["default", "outlined", "glass", "soft", "neumorphism"];
    variants.forEach((variant) => {
      const wrapper = mount(Card, {
        props: {
          variant: variant as any,
          title: "Snapshot Title",
          subtitle: "Snapshot Subtitle",
        },
      });
      expect(wrapper.html()).toMatchSnapshot(`${variant}-variant`);
    });
  });

  it("matches snapshot with premium features", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Premium Card",
        rating: 4,
        price: 99.99,
        badge: "New",
        progress: 65,
        hover: "glow",
      },
    });
    expect(wrapper.html()).toMatchSnapshot("premium-features");
  });
});
