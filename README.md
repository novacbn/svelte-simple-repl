# svelte-simple-repl

> **NOTE**: Not ready yet for installation, build chain needs to be finalized.

## Description

Simple Svelte v3 Component for providing an end-user editable view for real-time rendering of Svelte code.

## Live Demo

Visit the [Demo Page](https://novacbn.github.io/svelte-simple-repl#demo) for a live demo of each type of Repl.

## Why?

I need a straight-forward way of integrating interactive Repl snippets for the documentation of some of my other projects. And the Repl that powers the Svelte Docs, [`sveltejs/svelte-repl`](https://github.com/sveltejs/svelte-repl) isn't documented that well. And is pretty complex, with multi-file support and using Rollup as a service! _(also I couldn't figure out how to use it)_

So this package of Components supports a straight forward use case of, run the Svelte Compiler in browser and display the results. No other fancy-ness.

## Caveats

-   The height of the Repl elements must be set, either through the `.style` property, or otherwise through a CSS stylesheet rule. Otherwise they **will not** render properly.
-   If you're using a SSR-enabled Svelte framework, the CodeEditor and ReplEditor Components will not render out HTML, only the outer layout frames will.

## Browser Support

So far only tested on Falkon which is based on QT's integrated Webkit. That being said, it should _probably_ run in most major **MODERN** Browsers...

## Developer

### Installation

Open your terminal and install via `npm`:

```sh
npm install git+https://github.com/novacbn/svelte-simple-repl#0.0.1
```

### Usage

First, to import use one of these import paths:

-   `import {HorizontalRepl, TabbedRepl, VerticalRepl} from "svelte-simple-repl";` **-** If you don't care about your bundle weight.

-   `import {HorizontalRepl, TabbedRepl, VerticalRepl} from "svelte-simple-repl/lib/components";` **-** If you some what care about your bundle weight.

-   `import HorizontalRepl or TabbedRepl or VerticalRepl from "svelte-simple-repl/lib/components/repls/{HorizontalRepl, TabbedRepl, VerticalRepl}.svelte";` **-** For granular control.

Then simply pass in code to the `.value` property, e.g.:

```html
<script>
import {VerticalRepl} from "svelte-simple-repl";

/**
 * HUGE NOTE HERE: You can't ACTUALLY write Svelte Component code within a Component as a string... the compiler currently
 * freaks out about it. So you'll need to actually import your example codes from some other file, like `.json` or `.txt` or something.
 *
 * Notice how I do that in `/docs/src/ReplDemo.svelte` via `examples.toml`
 */

const hello_world_component =`<script>
    const name = "world";
</script>

<h1>Hello, {name}!</h1>`;
</script>

<VerticalRepl value={hello_world_component} />
```

When the end-user inputs code that has a compile-time error, it'll be displayed in yellow-ish text. When they have a Component initialization-time error, it'll be displayed in red-ish text. _(Svelte doesn't provide built-in error handling, so initialization-time is best I can do without get hacky)_

### Properties

Each type of `[type]Repl` Component have various customizable properties you can edit.

#### Shared Properties

Each `[type]Repl` Component share all the same exported properties with these defaults:

-   `class: string = "";` **-** Sets the `.class` attribute of the `HTMLElement`

-   `style: string = "";` **-** Sets the `.style` attribute of the `HTMLElement`

-   `language: string = "html";` - Sets the syntax highlighting language of the Ace Code Editor. Normally you shouldn't adjust this.

-   `theme: string = "chrome";` **-** Sets the theme of [Ace Code Editor](https://ace.c9.io), see [Syntax Highlighting and Themes](https://docs.c9.io/docs/syntax-highlighting-themes) for list of available themes.

-   `options: {'Object<string, any>'} = {'{}'};` **-** Sets the options passed into the Ace Code Editor, see [Configuring Ace](https://github.com/ajaxorg/ace/wiki/Configuring-Ace) for a list of options.

-   `value: string = "";` **-** Sets the value passed into the Code View and Preview View.

-   `title_code: string = "Code";` **-** Sets the title of the Code View.

-   `title_preview: string = "Preview";` **-** Sets the title of the Preview View.

-   `modules: Object<string, any>; = REPL_DEFAULT_MODULES;` **-** See the "Customizing / Runtime Imports" section below

-   `importers: ((name: string) => any)[] = [];` **-** See the "Customizing / Runtime Imports" section below

#### `HorizontalRepl` Properties

The `HorizontalRepl` has some specific properties only applicable to it:

-   `slider: number = 65;` **-** Sets the default percentage position of the horizontal slider along the width of the `.sr-horizontal-frame` element.

-   `slider_max: number = 75;` **-** Sets the maximum the end-user can slide the horizontal slider to the left.

-   `slider_min: number = 25;` **-** Sets the minimum the end-user can slide the horizontal slider to the right.

#### `TabbedRepl` Properties

The `TabbedRepl` has some specific properties only applicable to it:

-   `mode: TABBED_FRAME_MODES = TABBED_FRAME_MODES.code` **-** Sets the currently / default selected Repl view.

### Customizing

#### Ace Code Editor Themes

As shown above, visit [Syntax Highlighting and Themes](https://docs.c9.io/docs/syntax-highlighting-themes) for all the available standard themes. Only `chrome` is imported by default. So if you wish to change, you'll need to import from the [`brace`](https://github.com/thlorenz/brace) wrapper library in the following format:

```javascript
import "brace/theme/${theme_file_name}";
```

As an example:

```javascript
import "brace/theme/clouds_midnight";
```

#### CSS Styling

Each type of Repl is fully annotated with CSS classes to support full customization and theming, see below for sample layout of each Repl type:

**HorzontialRepl**

```html
<div
    class="sr-horizontal-frame 
    sr-horizontal-repl"
    style="height:256px;"
>
    <fieldset class="sr-horizontal-frame--container" style="width: 65%;">
        <legend>Code</legend>
        <div class="sr-horizontal-frame--view" style="height:calc(100% - 18px)">
            <div slot="code-view">
                <div class="sr-code-editor" style="width:100%;height:100%;">
                    <!-- ...Repl code view -->
                </div>
            </div>
        </div>
    </fieldset>

    <div class="sr-horizontal-frame--slider">↔</div>

    <fieldset class="sr-horizontal-frame--container" style="width: 35%;">
        <legend>Preview</legend>
        <div class="sr-horizontal-frame--view" style="height:calc(100% - 18px)">
            <div slot="preview-view">
                <div class="sr-repl-editor" style="width:100%;height:100%;">
                    <!-- ...Repl preview view... -->
                </div>
            </div>
        </div>
    </fieldset>
</div>
```

**TabbedRepl**

```html
<fieldset
    class="sr-tabbed-frame sr-tabbed-repl"
    data-tabbed-frame-mode="MODE_CODE"
    style="height:256px;"
>
    <legend class="sr-tabbed-frame--title">
        <button class="sr-tabbed-frame--button" disabled="">Code</button>
        <button class="sr-tabbed-frame--button">Preview</button>
    </legend>

    <div class="sr-tabbed-frame--view" style="height:calc(100% - 42px)">
        <div slot="code-view">
            <div class="sr-code-editor " style="width:100%;height:100%;">
                <!-- ...Repl code view -->
            </div>
        </div>
    </div>

    <div class="sr-tabbed-frame--view" style="height:calc(100% - 42px)">
        <div slot="preview-view">
            <div class="sr-repl-editor" style="width:100%;height:100%;">
                <!-- ...Repl preview view... -->
            </div>
        </div>
    </div>
</fieldset>
```

**VerticalRepl**

```html
<fieldset class="sr-vertical-frame sr-vertical-repl" style="height:256px;">
    <legend class="sr-vertical-frame--title">Code</legend>
    <div class="sr-vertical-frame--view" style="height:calc(100% - 18px)">
        <div slot="code-view">
            <div class="sr-code-editor " style="width:100%;height:100%;">
                <!-- ...Repl code view... -->
            </div>
        </div>
    </div>
</fieldset>

<fieldset class="sr-vertical-frame sr-vertical-repl " style="height:256px;">
    <legend class="sr-vertical-frame--title">Preview</legend>
    <div class="sr-vertical-frame--view" style="height:calc(100% - 18px)">
        <div slot="preview-view">
            <div class="sr-repl-editor" style="width:100%;height:100%;">
                <!-- ...Repl preview view... -->
            </div>
        </div>
    </div>
</fieldset>
```

**Error Theming**

You should also note, you can theme the error messages as-well. They appear as children of `.sr-repl-editor` when present:

```html
<!-- Represents an error that happens during compile-time, typically yellow-ish -->
<h3 class="sr-repl-editor--compile">...</h3>

<!-- Represents an error that happens during runtime, typically red-ish -->
<h3 class="sr-repl-editor--runtime">...</h3>
```

#### Runtime Repl Imports

By default `svelte`, `svelte/internal`, and `svelte/store` are already exposed for importing. You can also provide additional imports to Repls via both the `.modules` and `.importers` properties. This will allow code ran in a Repl to import anything you specify. For example say we have a `./addition_math.js` file:

```javascript
export function add(a, b) {
    return a + b;
}
```

Simple right? And to expose it to our Repl in `./SampleView.svelte`:

```html
<script context="module">
    // NOTE: You can define your module map anywhere within your codebase. This is just as an example.
    import {REPL_DEFAULT_MODULES} from "svelte-simple-repl";

    import addition_math_lib from "./addition_math";

    // And then here, since we're overriding the default modules. We need to import them and
    // them as our base. And then specify our custom module.
    const exposed_modules = {
        ...REPL_DEFAULT_MODULES,
        addition_math: addition_math_lib
    };
</script>

<script>
    import VerticalRepl from "svelte-simple-repl";

    let value = "...";
</script>

<!-- prettier-ignore -->
<VerticalRepl modules={exposed_modules} {value} />
```

And finally in our provided Repl via `VerticalRepl.value`, we can import the module like normal:

```html
<script>
    import {add} from "addition_math";

    const sum = add(1, 3);
</script>

{sum}
```

You can also use [Dynamic Import Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) as-well, they will be resolved before execution:

```html
<script context="module">
    const exposed_modules = {
        "addition-math": import("./addition_math")
    };
</script>
```

And lastly regarding imports, you can define dynamic import functions via `.importers` property. Just supply an `Array` of functions that take strings and return any or no value:

```html
<script context="module">
    // NOTE: You can define your module map anywhere within your codebase. This is just as an example.
    import {REPL_DEFAULT_MODULES} from "svelte-simple-repl";

    import addition_math_lib from "./addition_math";

    // The importers are executed in the `Array`'s index ordering
    const exposed_importers = [
        (name) => {
            if (name === "addition_math") return addition_math_lib;
        }
    ];
</script>

<script>
    import VerticalRepl from "svelte-simple-repl";

    let value = "...";
</script>

<!-- prettier-ignore -->
<VerticalRepl importers={exposed_importers} {value} />
```

Please note however, these importers **CANNOT** return `Promise`s. They must be synchronous only, since the Repls cannot resolve them ahead of time.
