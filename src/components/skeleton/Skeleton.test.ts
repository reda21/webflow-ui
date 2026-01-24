import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Skeleton from "./Skeleton.vue";
import SkeletonGroup from "./SkeletonGroup.vue";
import { h } from "vue";

describe("Skeleton.vue", () => {
  it("renders with default props", () => {
    const wrapper = mount(Skeleton);
    expect(wrapper.classes()).toContain("skeleton");
    expect(wrapper.classes()).toContain("skeleton--pulse");
  });

  it("applies variant and animation classes correctly", () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: "circle",
        animation: "wave",
      },
    });
    expect(wrapper.classes()).toContain("skeleton--circle");
    expect(wrapper.classes()).toContain("skeleton--wave");
  });

  it('renders as a custom element using "as" prop', () => {
    const wrapper = mount(Skeleton, {
      props: {
        as: "section",
      },
    });
    expect(wrapper.element.tagName).toBe("SECTION");
  });

  it("applies custom styles for width, height, and radius", () => {
    const wrapper = mount(Skeleton, {
      props: {
        width: "100px",
        height: 50,
        radius: "20px",
      },
    });
    const style = wrapper.attributes("style");
    expect(style).toContain("width: 100px;");
    expect(style).toContain("height: 50px;");
    expect(style).toContain("border-radius: 20px;");
  });

  it("applies color, glow, and gradient styles", () => {
    const wrapper = mount(Skeleton, {
      props: {
        color: "#ff0000",
        glow: true,
        gradient: "linear-gradient(to right, #000, #fff)",
      },
    });
    expect(wrapper.classes()).toContain("skeleton--glow");
    expect(wrapper.classes()).toContain("skeleton--gradient");

    const style = wrapper.attributes("style");
    expect(style).toContain("--skeleton-glow-color: #ff0000;");
    expect(style).toContain(
      "--skeleton-gradient: linear-gradient(to right, #000, #fff);",
    );
  });

  it("handles inferred size through default slot", () => {
    const wrapper = mount(Skeleton, {
      slots: {
        default: h("div", { style: "width: 200px; height: 100px;" }, "Content"),
      },
    });
    expect(wrapper.classes()).toContain("skeleton--has-content");
    expect(wrapper.find(".skeleton-content").exists()).toBe(true);
  });

  it("includes accessibility attributes", () => {
    const wrapper = mount(Skeleton, {
      props: {
        loadingText: "Loading content...",
        ariaLive: "assertive",
      },
    });
    expect(wrapper.attributes("aria-live")).toBe("assertive");
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.find(".sr-only").text()).toBe("Loading content...");
  });
});

describe("SkeletonGroup.vue", () => {
  it("renders and wraps multiple skeletons", () => {
    const wrapper = mount(SkeletonGroup, {
      slots: {
        default: [h(Skeleton), h(Skeleton)],
      },
    });
    expect(wrapper.classes()).toContain("skeleton-group");
    expect(wrapper.findAll(".skeleton").length).toBe(2);
  });

  it("applies stagger class by default", () => {
    const wrapper = mount(SkeletonGroup);
    expect(wrapper.classes()).toContain("skeleton-group--stagger");
  });
});
