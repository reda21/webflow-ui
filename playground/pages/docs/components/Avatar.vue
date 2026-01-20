<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from '../../../../src/index'
</script>

<template>
    <section id="avatar" class="scroll-mt-24 mb-20">
        <div class="flex items-center gap-3 mb-2">
            <span
                class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Composant</span>
            <span
                class="px-2 py-0.5 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">Disponible</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Avatar
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Composant d'avatar avec support d'image, fallback initiales et multiples tailles.
        </p>

        <!-- Basic Examples -->
        <div class="mb-12 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
            <div
                class="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <span class="text-xs font-medium text-slate-500">Aperçu</span>
            </div>
            <div class="bg-white dark:bg-slate-900 p-8 flex flex-wrap gap-6 items-center justify-center">
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Jane Smith" />
                    <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="/invalid-image.jpg" alt="Failed Load" />
                    <AvatarFallback>FL</AvatarFallback>
                </Avatar>
            </div>
        </div>

        <!-- Sizes -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tailles</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-6 items-end">
                <Avatar size="xs">
                    <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="XS" />
                    <AvatarFallback>XS</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                    <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="SM" />
                    <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar size="md">
                    <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="MD" />
                    <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                    <AvatarImage src="https://i.pravatar.cc/150?img=13" alt="LG" />
                    <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <Avatar size="xl">
                    <AvatarImage src="https://i.pravatar.cc/150?img=14" alt="XL" />
                    <AvatarFallback>XL</AvatarFallback>
                </Avatar>
                <Avatar size="2xl">
                    <AvatarImage src="https://i.pravatar.cc/150?img=15" alt="2XL" />
                    <AvatarFallback>2X</AvatarFallback>
                </Avatar>
            </div>
        </div>

        <!-- Rounded Variants -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Formes</h3>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-6 items-center">
                <Avatar rounded="none">
                    <AvatarImage src="https://i.pravatar.cc/150?img=20" alt="Square" />
                    <AvatarFallback>SQ</AvatarFallback>
                </Avatar>
                <Avatar rounded="md">
                    <AvatarImage src="https://i.pravatar.cc/150?img=21" alt="Rounded" />
                    <AvatarFallback>RD</AvatarFallback>
                </Avatar>
                <Avatar rounded="full">
                    <AvatarImage src="https://i.pravatar.cc/150?img=22" alt="Circle" />
                    <AvatarFallback>FL</AvatarFallback>
                </Avatar>
            </div>
        </div>

        <!-- AvatarGroup -->
        <div class="mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">AvatarGroup</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
                Affichez plusieurs avatars empilés avec un compteur pour les avatars excédentaires.
            </p>
            <div
                class="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/50 flex flex-wrap gap-8 items-center">
                <AvatarGroup :max="3">
                    <Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                    <Avatar src="https://i.pravatar.cc/150?img=2" alt="Jane Smith" />
                    <Avatar src="https://i.pravatar.cc/150?img=3" alt="Bob Wilson" />
                    <Avatar src="https://i.pravatar.cc/150?img=4" alt="Alice Brown" />
                    <Avatar src="https://i.pravatar.cc/150?img=5" alt="Charlie Davis" />
                </AvatarGroup>

                <AvatarGroup :max="2" size="lg">
                    <Avatar src="https://i.pravatar.cc/150?img=10" alt="User 1" size="lg" />
                    <Avatar src="https://i.pravatar.cc/150?img=11" alt="User 2" size="lg" />
                    <Avatar src="https://i.pravatar.cc/150?img=12" alt="User 3" size="lg" />
                </AvatarGroup>
            </div>
            <div
                class="bg-slate-50 dark:bg-slate-950 px-6 py-4 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl">
                <pre class="text-sm overflow-x-auto text-sky-400"><code>&lt;AvatarGroup :max="3"&gt;
  &lt;Avatar src="..." alt="John Doe" /&gt;
  &lt;Avatar src="..." alt="Jane Smith" /&gt;
  &lt;Avatar src="..." alt="Bob Wilson" /&gt;
&lt;/AvatarGroup&gt;</code></pre>
            </div>
        </div>

        <!-- Props Table -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Avatar Props</h3>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-8">
            <table class="w-full text-sm text-left">
                <thead
                    class="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th class="py-3 px-4">Propriété</th>
                        <th class="py-3 px-4">Type</th>
                        <th class="py-3 px-4">Par défaut</th>
                        <th class="py-3 px-4">Description</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">size</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'md'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Taille (xs, sm, md, lg, xl, 2xl).</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">rounded
                        </td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 font-mono text-slate-500 text-xs">'full'</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Rayon de bordure (none, xs, sm, md, lg,
                            xl, 2xl, full).</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">AvatarImage Props</h3>
        <div class="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mb-8">
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
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">src</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">URL de l'image.</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">alt</td>
                        <td class="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 text-xs">string</td>
                        <td class="py-3 px-4 text-slate-600 dark:text-slate-400">Texte alternatif pour l'accessibilité.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Code Example -->
        <div
            class="bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                <span class="text-xs font-medium text-slate-400">Exemple</span>
            </div>
            <pre class="p-4 text-sm overflow-x-auto"><code class="text-sky-400">&lt;Avatar&gt;
  &lt;AvatarImage src="/user.jpg" alt="User" /&gt;
  &lt;AvatarFallback&gt;JD&lt;/AvatarFallback&gt;
&lt;/Avatar&gt;</code></pre>
        </div>
    </section>
</template>
