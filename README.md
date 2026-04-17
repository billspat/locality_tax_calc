# Pretend Locality Tax Calculator

## about

An example, simplistic, Javascript application to estimate city income tax for an unamed locality, based on the number of days you worked inside city limits. This is a demonstration only and not meant for tax preparation!

This code will generate a 'static' website that has a single page with some 
basic calculations.  

This project created as a way to get started with <a  href="https://svelte.dev" >Svelte</a>,
        <a href="https://tailwindcss.com" >Tailwind CSS</a>, and 
        <a href="https://www.shadcn.com/svelte">Shadcn-svelte components</a>

## Running and Building

0. install (Javascript package manager)[https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Package_management] if you don't have one:  npm, pnpm, deno, etc etc.  I used https://pnpm.io/ <br>in the instructions below, replace `pnmp` with the package manager your are using (e.g. npm, etc)
1. clone this and cd dir
2. `pnpm install` (or whatever)
3. `pnpm build` will create a website in the /build folder
4. `pnpm dev` will start a dev server and tell where
5. `pnpm preview` should preview the built site but if you have npx can also  
   run `npx serve build` 

In Sveltekit, projects have a builder adapter to target where it will be run. 
This one uses 'staticadapter'  To make deploy, copy the contents of the 'build' 
folder to your web server or service.  That's left as an exercise for the reader. 

## Hacking

Almost all the action is in `src/routes/+page.svelte` 

UI components were installed into `src/lib/components` from the shadcn-svelte
package system, using the following commands after installing using 
`pnpm install` 
(no needed to run, just showing to explain how this was built)

```
pnpx shadcn-svelte@latest init
pnpx shadcn-svelte@latest add input label card separator
```

The styles were mostly picked from one the options the `init` command above
shows. 

## Wanna see 

https://billspat.github.io/locality_tax_calc/

## License

This calculation is probably incorrect and should not be used. But this is
provided with no restrictions at all and no guarantees. 

---

This work is marked <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/zero.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">
