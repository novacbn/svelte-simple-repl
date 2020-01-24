<script>
    import CodeEditor from "../editor/CodeEditor.svelte";
    import ReplEditor from "../editor/ReplEditor.svelte";

    import HorizontalFrame from "../frames/HorizontalFrame.svelte";

    import {REPL_DEFAULT_MODULES} from "../../util/svelte";

    let _class = "";
    export let style = "";

    export let theme = "chrome";
    export let language = "html";
    export let options = {};
    export let value = "";

    export let modules = REPL_DEFAULT_MODULES;
    export let importers = [];

    export let slider = 65;
    export let slider_max = 75;
    export let slider_min = 25;

    export let title_code = "Code";
    export let title_preview = "Preview";

    export {_class as class};
</script>

<HorizontalFrame
    class="sr-horizontal-repl {_class}"
    {style}
    {title_code}
    {title_preview}
    {slider}
    {slider_min}
    {slider_max}>
    <div slot="code-view">
        <CodeEditor bind:value {language} {options} {theme} />
    </div>

    <div slot="preview-view">
        <ReplEditor {modules} {importers} {value} />
    </div>
</HorizontalFrame>
