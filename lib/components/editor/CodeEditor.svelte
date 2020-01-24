<script>
    import AceEditor from "svelte-ace-editor/src/index.svelte";

    import "brace";
    import "brace/mode/html";
    import "brace/theme/chrome";

    import {IS_BROWSER} from "../../util/browser";

    let _class = "";
    export let style = "";

    export let width = "100%";
    export let height = "100%";

    export let language = "html";
    export let options = {};
    export let theme = "chrome";
    export let value = "";

    export {_class as class};

    /**
     * Handles initializing the Ace Editor, when it is ready
     */
    function on_init(event) {
        const editor = event.detail;
    }

    /**
     * Handles updating the internal state, when Ace Editor updates code
     */
    function on_input(event) {
        // `AceEditor.value` is not a two-way bindings, so we
        // need to manually update it
        value = event.detail;
    }
</script>

<div class="sr-code-editor {_class}" style="width:100%;height:100%;{style}">
    {#if IS_BROWSER}
        <AceEditor
            lang={language}
            {value}
            on:init={on_init}
            on:input={on_input}
            {height}
            {theme}
            {options}
            {width} />
    {:else}
        <h3>Code View requires to be ran in a Browser and Javascript enabled</h3>
    {/if}
</div>
