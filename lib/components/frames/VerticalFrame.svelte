<script>
    let _class = "";
    export let style = "";

    export let title_code = "Code";
    export let title_preview = "Preview";

    export {_class as class};

    let legend_element;

    $: height_style = legend_element ? `height:calc(100% - ${legend_element.clientHeight}px)` : "";
</script>

<style>
    .sr-vertical-frame--view > :global(*[slot="code-view"]),
    .sr-vertical-frame--view > :global(*[slot="preview-view"]) {
        height: 100%;
    }
</style>

<fieldset class="sr-vertical-frame {_class}" {style}>
    <legend class="sr-vertical-frame--title" bind:this={legend_element}>{title_code}</legend>

    <div class="sr-vertical-frame--view" style={height_style}>
        <slot name="code-view" />
    </div>
</fieldset>

<fieldset class="sr-vertical-frame {_class}" {style}>
    <legend class="sr-vertical-frame--title">{title_preview}</legend>

    <div class="sr-vertical-frame--view" style={height_style}>
        <slot name="preview-view" />
    </div>
</fieldset>
