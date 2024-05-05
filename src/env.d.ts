/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        theme:'dark' | 'light'
    }
    interface Astro extends Astro{
        data:  {
            theme:'dark' | 'light'
        }
    }
}

