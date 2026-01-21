<script setup lang="ts">
import { SocialButton, SocialButtonGroup } from '../../../../src/index'
</script>

<template>
    <section id="social-button" class="scroll-mt-24 mb-20">
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            SocialButton
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Boutons pré-configurés pour l'authentification sociale, intégrant les icônes officielles, les couleurs de
            marque et des libellés automatiques intelligents.
        </p>

        <!-- Preview Section -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Aperçu interactif</span>
                <div class="flex gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                    <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
            </div>
            <div class="bg-white dark:bg-slate-900 p-12 flex flex-col gap-8 items-center justify-center min-h-[300px]">
                <!-- Circular Style Showcase -->
                <div class="flex flex-wrap gap-8 justify-center">
                    <SocialButton provider="facebook" icon-only pill />
                    <SocialButton provider="instagram" icon-only pill />
                    <SocialButton provider="twitter" icon-only pill />
                    <SocialButton provider="tiktok" icon-only pill />
                    <SocialButton provider="whatsapp" icon-only pill />
                </div>

                <!-- Classic Style -->
                <div class="flex flex-wrap gap-4 justify-center">
                    <SocialButton provider="google" />
                    <SocialButton provider="github" variant="outlined" />
                </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;!-- Libellé automatique : "Continuer avec Google" --&gt;
&lt;SocialButton provider="google" /&gt;

&lt;!-- Icône seule et arrondie --&gt;
&lt;SocialButton provider="twitter" icon-only pill /&gt;

&lt;!-- Variante personnalisée --&gt;
&lt;SocialButton provider="github" variant="outlined"&gt;GitHub Code&lt;/SocialButton&gt;</code></pre>
            </div>
        </div>

        <!-- Section: Tous les Providers -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Fournisseurs Supportés</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Plus de 20 fournisseurs sociaux sont inclus par défaut. Le mode <code>icon-only</code> transforme le
                bouton en un badge circulaire premium.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <div v-for="p in ['google', 'facebook', 'instagram', 'twitter', 'github', 'linkedin', 'apple', 'youtube', 'whatsapp', 'discord', 'slack', 'spotify', 'amazon', 'pinterest', 'tiktok', 'snapchat', 'paypal', 'twitch', 'behance', 'dribbble']"
                    :key="p" class="flex flex-col items-center gap-3 group">
                    <SocialButton :provider="p" icon-only pill />
                    <span
                        class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter group-hover:text-indigo-500 transition-colors">{{
                            p }}</span>
                </div>
            </div>
        </div>

        <!-- Section: SocialButtonGroup -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">SocialButtonGroup & Layouts</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Organisez vos boutons sociaux avec <code>SocialButtonGroup</code>. Le groupe supporte des alignements
                variés et un <strong>diviseur intégré</strong> pour séparer les méthodes de connexion.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Connexion rapide -->
                <div
                    class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-col items-center">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Connexion
                        Rapide</span>
                    <SocialButtonGroup align="center">
                        <SocialButton provider="google" icon-only pill variant="outlined" />
                        <SocialButton provider="apple" icon-only pill />
                        <SocialButton provider="instagram" icon-only pill />
                        <SocialButton provider="twitter" icon-only pill />
                    </SocialButtonGroup>
                </div>

                <!-- Formulaire + Social -->
                <div class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                    <div class="space-y-3 mb-6">
                        <input type="email" placeholder="Email"
                            class="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <Button block severity="primary">Continuer par Email</Button>
                    </div>

                    <SocialButtonGroup divider direction="column" align="center">
                        <SocialButton provider="google" variant="outlined" block />
                        <SocialButton provider="github" variant="outlined" block />
                    </SocialButtonGroup>
                </div>
            </div>
        </div>

        <!-- Section: Variantes & Personnalisation -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Variantes & Styles</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Les SocialButtons héritent de toutes les fonctionnalités du composant <code>Button</code>, incluant les
                variantes de style.
            </p>
            <div class="p-8 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
                <div class="flex flex-wrap gap-6 items-center justify-center">
                    <div class="flex flex-col items-center gap-3">
                        <SocialButton provider="google" variant="outlined" />
                        <span class="text-xs text-slate-400 font-mono">variant="outlined"</span>
                    </div>
                    <div class="flex flex-col items-center gap-3">
                        <SocialButton provider="github" variant="subtle" />
                        <span class="text-xs text-slate-400 font-mono">variant="subtle"</span>
                    </div>
                    <div class="flex flex-col items-center gap-3">
                        <SocialButton provider="discord" variant="ghost" />
                        <span class="text-xs text-slate-400 font-mono">variant="ghost"</span>
                    </div>
                    <div class="flex flex-col items-center gap-3">
                        <SocialButton provider="twitter" icon-only size="xl" shadow="lg" />
                        <span class="text-xs text-slate-400 font-mono">shadow="lg"</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section: Logic & State -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Logique & Hooks</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Pour une intégration fluide, utilisez le composable <code>useSocialLogin</code> qui gère les états de
                chargement et les erreurs.
            </p>
            <div class="p-6 bg-slate-900 dark:bg-black rounded-xl border border-slate-800">
                <pre class="text-xs sm:text-sm text-indigo-300 overflow-x-auto"><code>import { useSocialLogin } from '@webmx/ui'

const { isLoading, currentProvider, login } = useSocialLogin({
    onSuccess: (res) => console.log('Connecté !', res),
    popup: true
})

// Utilisation
&lt;SocialButton 
    provider="google" 
    :loading="isLoading && currentProvider === 'google'" 
    @click="login('google')" 
/&gt;</code></pre>
            </div>
        </div>

        <!-- Section: API -->
        <div class="scroll-mt-24 mb-16" id="api">
            <div class="flex items-center gap-3 mb-6">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">API Reference</h2>
                <span
                    class="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">SocialButtonProps</span>
            </div>

            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Props</h3>
            <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-12">
                <table class="w-full text-sm text-left">
                    <thead
                        class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th class="py-3 px-4">Propriété</th>
                            <th class="py-3 px-4">Type</th>
                            <th class="py-3 px-4">Défaut</th>
                            <th class="py-3 px-4">Description</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                provider</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">
                                SocialProvider</td>
                            <td class="py-3 px-4 text-slate-400 italic">-</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                Identifiant du service social (google, github, apple, etc.)
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                iconOnly</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                Masque le texte pour n'afficher que l'icône dans un cercle/carré.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                showIcon</td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 text-xs">true</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                Permet de masquer l'icône officielle du fournisseur.
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">pill
                            </td>
                            <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">boolean</td>
                            <td class="py-3 px-4 text-xs">false</td>
                            <td class="py-3 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                Raccourci pour <code>rounded="full"</code>.
                            </td>
                        </tr>
                        <tr class="bg-indigo-50/30 dark:bg-indigo-900/10">
                            <td colspan="4" class="py-2 px-4 text-[10px] font-bold uppercase text-indigo-500">
                                + Toutes les propriétés héritées du composant Button
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Section: Accessibilité -->
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Accessibilité</h2>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-amber-50/50 dark:bg-amber-900/10 text-amber-900 dark:text-amber-200 text-sm">
                <p class="mb-3">
                    <strong>Auto-labels :</strong> Pour les boutons sans contenu texte personnalisé (slot vide),
                    SocialButton génère automatiquement un <code>aria-label</code> descriptif (ex: "Continuer avec
                    Google").
                </p>
                <p>
                    <strong>Icon Only :</strong> En mode <code>icon-only</code>, le libellé automatique est conservé
                    uniquement comme <code>aria-label</code> pour les lecteurs d'écran, assurant une navigation
                    inclusive.
                </p>
            </div>
        </div>
    </section>
</template>
