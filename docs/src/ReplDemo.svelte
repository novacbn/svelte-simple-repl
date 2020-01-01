<script>
    import {HorizontalRepl, TabbedRepl, VerticalRepl} from "../../src";

    import CODE_EXAMPLES from "./examples.toml";
</script>

<h1>
    <code>svelte-simple-repl</code>
    Demo
</h1>

<h2>Repl Types</h2>

<p>
    Scrolling below, you'll see live examples of each type of Repl. All of them are displayed with a
    height of
    <code>256px;</code>
    .
</p>

<h3>Horizontal Repl</h3>

<p>
    As seen below, you can display an interactive dual-pane Repl by utilizing
    <code>HorizontalRepl</code>
    . Which can be imported from
    <code>svelte-simple-repl</code>
    /
    <code>svelte-simple-repl/lib/components/repls/HorizontalRepl.svelte</code>
    .
</p>

<HorizontalRepl value={CODE_EXAMPLES.clock} style="height:256px;" />

<h3>Tabbed Repl</h3>

<p>
    As seen below, you can display an interactive tabbed Repl by utilizing
    <code>TabbedRepl</code>
    . Which can be imported from
    <code>svelte-simple-repl</code>
    /
    <code>svelte-simple-repl/lib/components/repls/TabbedRepl.svelte</code>
    .
</p>

<TabbedRepl value={CODE_EXAMPLES.clock} style="height:256px;" />

<h3>Vertical Repl</h3>

<p>
    As seen below, you can display an interactive vertical layout Repl by utilizing
    <code>VerticalRepl</code>
    . Which can be imported from
    <code>svelte-simple-repl</code>
    /
    <code>svelte-simple-repl/lib/components/repls/VerticalRepl.svelte</code>
    .
</p>

<VerticalRepl value={CODE_EXAMPLES.clock} style="height:256px;" />
