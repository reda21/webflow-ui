<template>
    <div>
        <!-- Installation Section -->
        <section id="installation" class="scroll-mt-24 mb-20">
            <div class="flex items-center gap-3 mb-6">
                <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Pour
                    commencer</span>
            </div>
            <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                Installation
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Installez WebFlow UI en quelques secondes avec npm ou yarn.
            </p>

            <div class="space-y-6">
                <div
                    class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                        <span class="text-xs font-medium text-slate-400">Terminal</span>
                    </div>
                    <pre
                        class="p-4 text-sm overflow-x-auto"><code class="text-emerald-400">npm install webflow-ui</code></pre>
                </div>

                <div
                    class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                        <span class="text-xs font-medium text-slate-400">main.ts</span>
                    </div>
                    <pre
                        class="p-4 text-sm overflow-x-auto"><code><span class="text-purple-400">import</span> <span class="text-sky-400">'webflow-ui/style.css'</span></code></pre>
                </div>
            </div>
        </section>

        <!-- Usage Section -->
        <section id="usage" class="scroll-mt-24 mb-20">
            <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Utilisation
            </h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8">
                Importez les composants dont vous avez besoin et utilisez-les directement dans vos templates
                Vue.
            </p>

            <div
                class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                    <span class="text-xs font-medium text-slate-400">MyComponent.vue</span>
                </div>
                <pre class="p-4 text-sm overflow-x-auto"><code><span class="text-slate-500">&lt;script setup&gt;</span>
<span class="text-purple-400">import</span> { <span class="text-yellow-400">Button</span>, <span class="text-yellow-400">Navbar</span> } <span class="text-purple-400">from</span> <span class="text-sky-400">'webflow-ui'</span>
<span class="text-slate-500">&lt;/script&gt;</span>

<span class="text-slate-500">&lt;template&gt;</span>
  <span class="text-pink-400">&lt;Navbar</span> <span class="text-sky-300">brand-name</span>=<span class="text-emerald-400">"Mon App"</span> <span class="text-pink-400">/&gt;</span>
  <span class="text-pink-400">&lt;Button</span> <span class="text-sky-300">severity</span>=<span class="text-emerald-400">"primary"</span><span class="text-pink-400">&gt;</span>Cliquez<span class="text-pink-400">&lt;/Button&gt;</span>
<span class="text-slate-500">&lt;/template&gt;</span></code></pre>
            </div>
        </section>
    </div>
</template>
