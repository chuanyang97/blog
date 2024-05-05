import { defineMiddleware } from "astro:middleware";

// `context` 和 `next` 会自动被类型化
export const onRequest = defineMiddleware((context, next) => {
    next();

});