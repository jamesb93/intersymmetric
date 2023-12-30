import { writable } from 'svelte/store';

function enum_parameter(initial_index: number, options: Array<string | number | boolean>) {
    // Check if the initial value is in the allowed values
    if (initial_index < 0 || initial_index >= options.length) {
        throw new Error('Initial index is outside range of enum.');
    }

    const { subscribe, set } = writable(initial_index);

    return {
        subscribe,
        set: (value: number) => {
            // Ensure the value is in the allowed values before updating
            if (value < 0 || value >= options.length) {
                throw new Error('Initial index is outside range of enum.');
            }
            set(value);
        },
        get_options: () => options,
        get_value: (v: number) => {
            if (v < 0 || v >= options.length) {
                throw new Error('Index lookup is outside range of enum.');
            }
            return options[v];
        }
    };
}

export default enum_parameter;
