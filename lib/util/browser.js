/**
 * Returns the current Javascript context is being ran in a Browser
 */
export const IS_BROWSER = typeof window !== "undefined";

/**
 * Copies the supplied `text` to the end-user's clipboard
 */
export function copy_text(text) {
    const textarea = document.createElement("textarea");

    document.body.appendChild(textarea);
    textarea.value = text;

    textarea.select();

    document.execCommand("copy");
    textarea.remove();
}
