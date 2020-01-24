const globals = typeof window === "undefined" ? global : window;
const {clearTimeout, setTimeout} = globals;

/**
 * Returns a wrapper around given `callback`, that waits for `duration` to elapse before
 * calling `callback. Cancels previous dispatches within the `duration timeframe
 */
export function debounce(callback, duration) {
    let identifier;

    return (...args) => {
        if (identifier) {
            clearTimeout(identifier);
            identifier = null;
        }

        identifier = setTimeout(() => {
            callback.apply(null, args);
        }, duration);
    };
}

/**
 * Returns resolved `Promise` object values within an `Object` mapping
 * @param {*} map
 */
export async function resolve_map(map) {
    let map_entries = Object.entries(map);
    map_entries = Array.from(map_entries);

    let map_promises = map_entries.map(([key, value]) => value);
    map_promises = await Promise.all(map_promises);

    return map_promises.reduce((accum, value, index) => {
        const [key] = map_entries[index];

        accum[key] = value;

        return accum;
    }, {});
}
