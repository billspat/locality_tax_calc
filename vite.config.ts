import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/// <reference types="vitest/config" />

export default defineConfig({
     plugins: [sveltekit()],

     test: {
        // 1. Explicitly define test files (where describe/test lives)
        include: ['test/*.{test,spec}.{ts,js}'], 
	},

    resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
    
});
