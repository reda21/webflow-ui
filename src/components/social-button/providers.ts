import type { SocialProvider } from './types'

export interface ProviderInfo {
    icon: string
    name: string
    color: string
    textColor: string
}

export const PROVIDERS: Record<SocialProvider, ProviderInfo> = {
    google: {
        icon: 'logos:google-icon',
        name: 'Google',
        color: '#ffffff',
        textColor: '#374151'
    },
    facebook: {
        icon: 'entypo-social:facebook',
        name: 'Facebook',
        color: '#1877f2',
        textColor: '#ffffff'
    },
    github: {
        icon: 'entypo-social:github',
        name: 'GitHub',
        color: '#24292f',
        textColor: '#ffffff'
    },
    twitter: {
        icon: 'entypo-social:twitter',
        name: 'Twitter',
        color: '#0f1419',
        textColor: '#ffffff'
    },
    linkedin: {
        icon: 'entypo-social:linkedin',
        name: 'LinkedIn',
        color: '#0a66c2',
        textColor: '#ffffff'
    },
    apple: {
        icon: 'ri:apple-fill',
        name: 'Apple',
        color: '#000000',
        textColor: '#ffffff'
    },
    microsoft: {
        icon: 'logos:microsoft-icon',
        name: 'Microsoft',
        color: '#ffffff',
        textColor: '#374151'
    },
    discord: {
        icon: 'entypo-social:discord',
        name: 'Discord',
        color: '#5865f2',
        textColor: '#ffffff'
    },
    slack: {
        icon: 'logos:slack-icon',
        name: 'Slack',
        color: '#ffffff',
        textColor: '#374151'
    },
    spotify: {
        icon: 'ri:spotify-fill',
        name: 'Spotify',
        color: '#1db954',
        textColor: '#ffffff'
    },
    amazon: {
        icon: 'ri:amazon-fill',
        name: 'Amazon',
        color: '#232f3e',
        textColor: '#ffffff'
    },
    pinterest: {
        icon: 'entypo-social:pinterest',
        name: 'Pinterest',
        color: '#bd081c',
        textColor: '#ffffff'
    },
    tiktok: {
        icon: 'ri:tiktok-fill',
        name: 'TikTok',
        color: '#000000',
        textColor: '#ffffff'
    },
    paypal: {
        icon: 'entypo-social:paypal',
        name: 'PayPal',
        color: '#003087',
        textColor: '#ffffff'
    },
    twitch: {
        icon: 'ri:twitch-fill',
        name: 'Twitch',
        color: '#9146ff',
        textColor: '#ffffff'
    },
    instagram: {
        icon: 'entypo-social:instagram',
        name: 'Instagram',
        color: 'linear-gradient(45deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888)',
        textColor: '#ffffff'
    },
    youtube: {
        icon: 'entypo-social:youtube',
        name: 'YouTube',
        color: '#ff0000',
        textColor: '#ffffff'
    },
    whatsapp: {
        icon: 'ri:whatsapp-fill',
        name: 'WhatsApp',
        color: '#25d366',
        textColor: '#ffffff'
    },
    snapchat: {
        icon: 'ri:snapchat-fill',
        name: 'Snapchat',
        color: '#fffc00',
        textColor: '#000000'
    },
    behance: {
        icon: 'ri:behance-fill',
        name: 'Behance',
        color: '#0057ff',
        textColor: '#ffffff'
    },
    dribbble: {
        icon: 'entypo-social:dribbble',
        name: 'Dribbble',
        color: '#ea4c89',
        textColor: '#ffffff'
    }
}
