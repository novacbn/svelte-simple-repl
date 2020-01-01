<script>
    import README_MARKDOWN from "../../README.md";

    import ReplDemo from "./ReplDemo.svelte";

    let hash = "";

    function update_hash() {
        hash = location.hash ? location.hash.slice(1) : "";
    }

    update_hash();
    window.addEventListener("hashchange", update_hash);
</script>

<fieldset>
    <legend>NAVIGATION</legend>

    <h2 style="display:inline;">
        <a href="#">README</a>
    </h2>

    <h2 style="display:inline;">|</h2>

    <h2 style="display:inline;">
        <a href="#demo">DEMO</a>
    </h2>
</fieldset>

{#if hash === 'demo'}
    <ReplDemo />
{:else}
    {@html README_MARKDOWN}
{/if}
