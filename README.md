# recma-imports-resolver
Using with @mdx-js:
```ts
import {compile} from '@mdx-js/mdx'
import recmaImportsResolver from "recma-imports-resolver";

await compile(mdxContent /*MDX source*/, {
    recmaPlugins: [
        recmaImportsResolver(source => {
            if (source.startsWith("$/")) return `./mdxComponents/${source.substring(2)}`;
        }, "@/mdxComponents/403.vue") // It will block all imports which doesn't starts with "$/". All imports with "$/" will be redirected to "./mdxComponents/"
    ]
})
```
or in vite.config.ts:
```ts
import {defineConfig} from 'vite'
import mdx from '@mdx-js/rollup';
import recmaImportsResolver from "recma-imports-resolver";

export default defineConfig({
    plugins: [
        // other plugins
        mdx({
            recmaPlugins: [
                recmaImportsResolver(source => {
                    if (source.startsWith("$/")) return `./mdxComponents/${source.substring(2)}`;
                }, "@/mdxComponents/403.vue") // It will block all imports which doesn't starts with "$/". All imports with "$/" will be redirected to "./mdxComponents/"
            ]
            // other options
        })
    ],
    // other options
})
```