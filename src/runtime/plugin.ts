// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp: any) => {
  // @ts-ignore
  const config = useRuntimeConfig().public.webflowUi || {};

  nuxtApp.vueApp.provide("webmx-config", config);
});
