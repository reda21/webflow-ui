import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.webflowUi || {};

  nuxtApp.vueApp.provide("webmx-config", config);
});
