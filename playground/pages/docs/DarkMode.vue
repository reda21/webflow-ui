<template>
    <section id="dark-mode" class="scroll-mt-24 mb-20">
        <h1 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Dark Mode
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Tous les composants supportent nativement le dark mode via la classe <code
                class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-sm">.dark</code> sur le
            document.
        </p>

        <div
            class="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-700">
                <span class="text-xs font-medium text-slate-400">JavaScript</span>
            </div>
            <pre class="p-4 text-sm overflow-x-auto"><code><span class="text-slate-500">// Activer le dark mode</span>
document.documentElement.classList.add('dark')</code></pre>
        </div>
    </section>
</template>
