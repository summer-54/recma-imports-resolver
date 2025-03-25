import {visit} from "estree-util-visit";
import type {Node} from 'estree';

function wrapper(source: string, resolver: (source: string) => string | null | undefined, defaultComponent: string): string {
    if (source === "vue/jsx-dev-runtime") return source;
    return resolver(source) ?? defaultComponent;
}

export default function recmaImportsResolver(resolver: (source: string) => string | null | undefined, defaultComponent: string) {
    return () => (tree: Node) => {
        visit(tree, (node) => {
            if (node.type !== 'ImportDeclaration' || typeof node.source.value !== "string") return;
            let res = wrapper(node.source.value, resolver, defaultComponent);
            node.source.raw = `"${res}"`;
            node.source.value = res;
        });
    };
}