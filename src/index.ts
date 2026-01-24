// Styles
import "./style.css";

// Components
export { default as Navbar } from "./components/Navbar.vue";
export type { NavItem } from "./components/Navbar.types";

export { default as Button } from "./components/button/Button.vue";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSeverity,
  ButtonSize,
  ButtonRounded,
  ButtonAs,
  ButtonIconPos,
  ButtonShadow,
  ButtonRing,
} from "./components/button/types";

export { default as SocialButton } from "./components/social-button/SocialButton.vue";
export { default as SocialButtonGroup } from "./components/social-button/SocialButtonGroup.vue";
export type { SocialProvider } from "./components/social-button/types";

export { default as ButtonGroup } from "./components/button-group/ButtonGroup.vue";
export type {
  ButtonGroupProps,
  ButtonGroupDirection,
} from "./components/button-group/types";

export { default as SplitButton } from "./components/split-button/SplitButton.vue";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "./components/avatar/index";
export type {
  AvatarProps,
  AvatarSize,
  AvatarRounded,
} from "./components/avatar/types";

export { default as Icon } from "./components/icon/Icon.vue";

export { Tooltip } from "./components/tooltip/index";
export type {
  TooltipProps,
  TooltipPosition,
  TooltipVariant,
  TooltipSize,
} from "./components/tooltip/types";

export { Modal, ModalRenderer, useModal } from "./components/modal/index";
export type {
  ModalProps,
  ModalSize,
  ModalVariant,
  ModalSeverity,
} from "./components/modal/types";

export { Card, CardGroup } from "./components/card/index";
export type {
  CardProps,
  CardVariant,
  CardShadow,
  CardPadding,
} from "./components/card/types";

export { default as OverlayProvider } from "./components/overlay/OverlayProvider.vue";
export { useOverlay } from "./composables/useOverlay";

export {
  Skeleton,
  Skeleton as USkeleton,
  SkeletonGroup,
} from "./components/skeleton/index";
export type {
  SkeletonProps,
  SkeletonAnimation,
  SkeletonVariant,
} from "./components/skeleton/types";

export { Toast, ToastProvider, useToast } from "./components/toast/index";
export type {
  ToastProps,
  ToastOptions,
  ToastSeverity,
  ToastPosition,
} from "./components/toast/types";
