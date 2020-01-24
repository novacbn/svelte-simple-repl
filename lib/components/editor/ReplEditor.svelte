<script>
    import {onDestroy} from "svelte";

    import {IS_BROWSER} from "../../util/browser";
    import {debounce} from "../../util/functional";
    import {REPL_DEFAULT_MODULES, compile_component} from "../../util/svelte";

    let _class = "";
    export let style = "";

    export let importers = [];
    export let modules = REPL_DEFAULT_MODULES;
    export let value = "";

    export {_class as class};

    let _component;
    let error;
    let parent_element;
    let Component;

    const _compile_component = debounce(async (...args) => {
        try {
            Component = await compile_component(...args);
        } catch (err) {
            Component = null;

            error = err;
            error.is_runtime = false;
        }
    }, 250);

    $: if (IS_BROWSER && value) _compile_component(value, modules, importers);

    $: {
        if (IS_BROWSER) {
            if (_component) {
                _component.$destroy();
                _component = null;
            }

            if (parent_element && Component) {
                try {
                    error = null;
                    _component = new Component({target: parent_element});
                } catch (err) {
                    error = err;
                    error.is_runtime = true;
                }
            }
        }
    }

    onDestroy(() => {
        if (_component) {
            _component.$destroy();
            _component = null;
        }
    });
</script>

<style>
    .sr-repl-editor--compile {
        color: khaki;
    }

    .sr-repl-editor--runtime {
        color: darkred;
    }
</style>

<div
    class="sr-repl-editor {_class}"
    style="width:100%;height:100%;{style}"
    bind:this={parent_element}>
    {#if !IS_BROWSER}
        <h3>Code View requires to be ran in a Browser and Javascript enabled</h3>
    {:else if error}
        <h3 class={error.is_runtime ? 'sr-repl-editor--runtime' : 'sr-repl-editor--compile'}>
            {error.message}
        </h3>
    {/if}
</div>
