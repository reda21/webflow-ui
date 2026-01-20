<script setup lang="ts">
import { SocialButton } from '../../../../src/index'
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
            Boutons pré-configurés pour les principaux réseaux sociaux avec leurs couleurs et icônes officielles.
        </p>

        <!-- Preview -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <span class="text-xs font-medium text-slate-500">Aperçu</span>
            </div>
            <div class="bg-white dark:bg-slate-900 p-8 flex flex-wrap gap-4 items-center justify-center">
                <SocialButton provider="google">Continuer avec Google</SocialButton>
                <SocialButton provider="github">GitHub</SocialButton>
                <SocialButton provider="facebook">Facebook</SocialButton>
                <SocialButton provider="twitter">X / Twitter</SocialButton>
                <SocialButton provider="discord">Discord</SocialButton>
                <SocialButton provider="linkedin">LinkedIn</SocialButton>
            </div>
        </div>

        <!-- Props Table -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Props</h3>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-12">
            <table class="w-full text-sm text-left">
                <thead
                    class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th class="py-3 px-4">Propriété</th>
                        <th class="py-3 px-4">Type</th>
                        <th class="py-3 px-4">Description</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">provider
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">'google' |
                            'github' | 'facebook' | 'twitter' | 'discord' | 'linkedin'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Le fournisseur social pour configurer
                            l'icône et la couleur.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Examples -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Variantes d'icônes</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-4">
                <SocialButton provider="google" />
                <SocialButton provider="github" rounded="full" />
                <SocialButton provider="twitter" variant="outlined" />
                <SocialButton provider="discord" size="xl" />
            </div>
        </div>
    </section>
</template>
