// Styles
import './style.css';

// Components
export { default as Navbar } from './components/Navbar.vue';
export type { NavItem } from './components/Navbar.vue';

export { default as Button } from './components/button/Button.vue';
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
} from './components/button/types';

export { default as SocialButton } from './components/social-button/SocialButton.vue';
export { default as SocialButtonGroup } from './components/social-button/SocialButtonGroup.vue';
export type { SocialProvider } from './components/social-button/types';

export { default as ButtonGroup } from './components/button-group/ButtonGroup.vue';
export type { ButtonGroupProps, ButtonGroupDirection } from './components/button-group/types';

export { default as SplitButton } from './components/split-button/SplitButton.vue';

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from './components/avatar/index';
export type { AvatarProps, AvatarSize, AvatarRounded } from './components/avatar/types';

export { default as Icon } from './components/icon/Icon.vue';


