import { writable } from 'svelte/store';
import { clip } from '$lib/utility';

// Custom store function to create a bounded array store
function numeric_array_parameter(initial_value, min, max) {
    // Check initial values against bounds
    const clamped_values = initial_value.map((value) => clip(value, min, max));

    const { subscribe, set, update } = writable(clamped_values);

    return {
        subscribe,
        set: (values) => {
            // Ensure each value is within the bounds before updating the array
            const clamped_values = values.map((value) => clip(value, min, max));
            set(clamped_values);
        },
        update: (updater) => {
            // Allow using update function as well
            update((current) => {
                const new_values = current.map((value) => {
                    const new_value = updater(value);
                    return clip(new_value, min, max);
                });
                return new_values;
            });
        }
    };
}

export default numeric_array_parameter;
