import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Progress from "./Progress.vue";
import CircularProgress from "./CircularProgress.vue";

describe("Progress", () => {
  it("renders correctly", () => {
    const wrapper = mount(Progress, {
      props: { value: 50, showValue: true },
    });
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
    expect(wrapper.find(".progress-bar").exists()).toBe(true);
    expect(wrapper.text()).toContain("50%");
  });

  it("renders indeterminate state", () => {
    const wrapper = mount(Progress, {
      props: { indeterminate: true },
    });
    expect(wrapper.find('[role="progressbar"]').attributes("aria-busy")).toBe(
      "true",
    );
    // Should have carousel animation by default for indeterminate
    expect(wrapper.find(".progress-bar--animate-carousel").exists()).toBe(true);
  });

  it("applies severity classes", () => {
    const wrapper = mount(Progress, {
      props: { value: 50, severity: "success" },
    });
    expect(wrapper.find(".progress-bar--success").exists()).toBe(true);
  });

  it("applies animation classes", () => {
    const animations = ["pulse", "striped", "glow", "bounce", "gradient-flow"];

    animations.forEach((animation) => {
      const wrapper = mount(Progress, {
        props: { value: 50, animation: animation as any },
      });
      expect(wrapper.find(`.progress-bar--animate-${animation}`).exists()).toBe(
        true,
      );
    });
  });

  it("renders labels correctly", () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50,
        label: "Custom Label",
        showValue: true,
        labelPosition: "top",
      },
    });
    expect(wrapper.find(".progress-label-text").text()).toBe("Custom Label");
    expect(wrapper.find(".progress-label-value").text()).toBe("50%");
  });

  it("applies aria label", () => {
    const wrapper = mount(Progress, {
      props: { value: 50, ariaLabel: "Download progress" },
    });
    expect(wrapper.find('[role="progressbar"]').attributes("aria-label")).toBe(
      "Download progress",
    );
  });
});

describe("CircularProgress", () => {
  it("renders correctly", () => {
    const wrapper = mount(CircularProgress, {
      props: { value: 75 },
    });
    expect(wrapper.find("circle.circular-progress__track").exists()).toBe(true);
    expect(wrapper.find("circle.circular-progress__bar").exists()).toBe(true);
    expect(wrapper.text()).toContain("75%");
  });

  it("calculates path correctly for partial circle", () => {
    const wrapper = mount(CircularProgress, {
      props: { value: 50, startAngle: 0, endAngle: 180 }, // Semicircle
    });
    // Just ensuring it renders without error and applies transform
    const track = wrapper.find(".circular-progress__track");
    expect(track.attributes("style")).toContain("rotate(0deg)");
  });

  it("renders gradient variant", () => {
    const wrapper = mount(CircularProgress, {
      props: { value: 50, variant: "gradient" },
    });
    expect(wrapper.find("defs linearGradient").exists()).toBe(true);
  });

  it("applies aria label", () => {
    const wrapper = mount(CircularProgress, {
      props: { value: 75, ariaLabel: "Battery level" },
    });
    expect(wrapper.find('[role="progressbar"]').attributes("aria-label")).toBe(
      "Battery level",
    );
  });
});
