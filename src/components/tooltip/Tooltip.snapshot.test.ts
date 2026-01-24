import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";
import { nextTick } from "vue";

describe("Tooltip Snapshots", () => {
  const variants = [
    "dark",
    "light",
    "primary",
    "success",
    "warning",
    "danger",
    "info",
    "glass",
  ] as const;
  const positions = ["top", "bottom", "left", "right"] as const;

  variants.forEach((variant) => {
    it(`matches snapshot for variant: ${variant}`, async () => {
      const wrapper = mount(Tooltip, {
        props: {
          variant,
          content: `Variant ${variant}`,
          defaultOpen: true,
          teleport: false, // Disable teleport for snapshotting inside the wrapper
        },
        slots: {
          default: "<button>Trigger</button>",
        },
      });
      await nextTick();
      expect(wrapper.html()).toMatchSnapshot();
      wrapper.unmount();
    });
  });

  positions.forEach((position) => {
    it(`matches snapshot for position: ${position}`, async () => {
      const wrapper = mount(Tooltip, {
        props: {
          position,
          content: `Position ${position}`,
          defaultOpen: true,
          teleport: false,
        },
        slots: {
          default: "<button>Trigger</button>",
        },
      });
      await nextTick();
      expect(wrapper.html()).toMatchSnapshot();
      wrapper.unmount();
    });
  });
});
