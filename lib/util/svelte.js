import {compile} from "svelte/compiler";

import * as svelte from "svelte";
import * as svelte_internal from "svelte/internal";
import * as svelte_store from "svelte/store";

import {resolve_map} from "./functional";

/**
 * Represents the default modules passed into `ReplEditor`
 */
export const REPL_DEFAULT_MODULES = {
    svelte: svelte,
    "svelte/internal": svelte_internal,
    "svelte/store": svelte_store
};

/**
 * Represents the pattern for replacing the compiled export
 */
const COMPONENT_EXPORT_PATTERN = "exports.default = Component";

/**
 * Represents the replacement for the compiled export
 */
const COMPONENT_EXPORT_REPLACE = "return Component";

/**
 * Returns the compiled Svelte Component code formatted as something a Browser can execute
 */
function format_compiled(output) {
    let {code} = output.js;

    // We need to replace the import / export statements with our own shims
    //code = code.replace(COMPONENT_IMPORT_PATTERN, COMPONENT_IMPORT_REPLACE);
    //code = code.replace(COMPONENT_FROM_PATTERN, COMPONENT_FROM_REPLACE);
    code = code.replace(COMPONENT_EXPORT_PATTERN, COMPONENT_EXPORT_REPLACE);

    return code;
}

/**
 * Returns a new `require` function mapped to the given modules / importers
 */
async function make_require(modules = {}, importers = []) {
    // We need to resolve any asynchronusly queued modules
    modules = await resolve_map(modules);

    return (name) => {
        const module = modules[name];
        if (module) return module;

        for (const importer of importers) {
            const module = importer(name);
            if (typeof module !== "undefined") return module;
        }

        throw new ReferenceError(`bad dispatch to 'require' (module '${name}' not found)`);
    };
}

/**
 * Compiles the code of the Svelte Component into executable Javascript
 */
export async function compile_component(code, modules = {}, importers = []) {
    let compiled = compile(code, {format: "cjs"});
    compiled = format_compiled(compiled);

    const _require = await make_require(modules, importers);

    // Here, we're creating a virtual function out of the compiled Javascript,
    // basically making the equivalent of `(function (window, require) { ... some code... return Component; })(window, _require)`
    const func = new Function("window", "require", compiled);
    return func(window, _require);
}
