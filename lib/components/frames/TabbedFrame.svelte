<script context="module">
    /**
     * Represents the available tab modes for `TabbedFrame`
     */
    export const TABBED_FRAME_MODES = {
        /**
         * Represents that the "Code" tab is active
         */
        code: "MODE_CODE",

        /**
         * Represents that the "Preview" Tab is active
         */
        preview: "MODE_PREVIEW"
    };
</script>

<script>
    let _class = "";
    export let style = "";

    export let mode = TABBED_FRAME_MODES.code;
    export let title_code = "Code";
    export let title_preview = "Preview";

    export {_class as class};

    let legend_element;

    $: height_style = legend_element ? `height:calc(100% - ${legend_element.clientHeight}px)` : "";
</script>

<style>
    .sr-tabbed-frame--view > :global(*[slot="code-view"]),
    .sr-tabbed-frame--view > :global(*[slot="preview-view"]) {
        height: 100%;
    }

    .sr-tabbed-frame[data-tabbed-frame-mode="MODE_CODE"] > .sr-tabbed-frame--view:last-of-type {
        display: none;
    }

    .sr-tabbed-frame[data-tabbed-frame-mode="MODE_PREVIEW"] > .sr-tabbed-frame--view:first-of-type {
        display: none;
    }
</style>

<fieldset class="sr-tabbed-frame {_class}" data-tabbed-frame-mode={mode} {style}>
    <legend class="sr-tabbed-frame--title" bind:this={legend_element}>
        <button
            class="sr-tabbed-frame--button"
            disabled={mode === TABBED_FRAME_MODES.code}
            on:click={() => (mode = TABBED_FRAME_MODES.code)}>
            {title_code}
        </button>

        <button
            class="sr-tabbed-frame--button"
            disabled={mode === TABBED_FRAME_MODES.preview}
            on:click={() => (mode = TABBED_FRAME_MODES.preview)}>
            {title_preview}
        </button>
    </legend>

    <div class="sr-tabbed-frame--view" style={height_style}>
        <slot name="code-view" />
    </div>

    <div class="sr-tabbed-frame--view" style={height_style}>
        <slot name="preview-view" />
    </div>
</fieldset>
