<script>
    import CodeEditor from "../editor/CodeEditor.svelte";
    import ReplEditor from "../editor/ReplEditor.svelte";

    import TabbedFrame, {TABBED_FRAME_MODES} from "../frames/TabbedFrame.svelte";

    import {REPL_DEFAULT_MODULES} from "../../util/svelte";

    let _class = "";
    export let style = "";

    export let theme = "chrome";
    export let language = "html";
    export let options = {};
    export let value = "";

    export let modules = REPL_DEFAULT_MODULES;
    export let importers = [];

    export let mode = TABBED_FRAME_MODES.mode;
    export let title_code = "Code";
    export let title_preview = "Preview";

    export {_class as class};
</script>

<TabbedFrame class="sr-tabbed-repl {_class}" bind:mode {style} {title_code} {title_preview}>
    <div slot="code-view">
        <CodeEditor bind:value {language} {options} {theme} />
    </div>

    <div slot="preview-view">
        <ReplEditor {modules} {importers} {value} />
    </div>
</TabbedFrame>
