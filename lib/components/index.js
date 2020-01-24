/**
 * Editors
 */

import _CodeEditor from "./editor/CodeEditor.svelte";
import _ReplEditor from "./editor/ReplEditor.svelte";

export {_CodeEditor as CodeEditor};
export {_ReplEditor as ReplEditor};

/**
 * Frames
 */

import _HorizontalFrame from "./frames/HorizontalFrame.svelte";
import _TabbedFrame from "./frames/TabbedFrame.svelte";
import _VerticalFrame from "./frames/VerticalFrame.svelte";

export {_HorizontalFrame as HorizontalFrame};
export {_TabbedFrame as TabbedFrame};
export {_VerticalFrame as VerticalFrame};

export {TABBED_FRAME_MODES} from "./frames/TabbedFrame.svelte";

/**
 * Repls
 */

import _HorizontalRepl from "./repls/HorizontalRepl.svelte";
import _TabbedRepl from "./repls/TabbedRepl.svelte";
import _VerticalRepl from "./repls/VerticalRepl.svelte";

export {_HorizontalRepl as HorizontalRepl};
export {_TabbedRepl as TabbedRepl};
export {_VerticalRepl as VerticalRepl};
