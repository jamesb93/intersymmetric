import { writable } from 'svelte/store';

interface Config {
    min: number;
    max: number;
    step: number;
}

function numeric_parameter(initial_value: number, config: Config) {
    // Check initial value against bounds
    if (initial_value < config.min) initial_value = config.min;
    if (initial_value > config.max) initial_value = config.max;

    const { subscribe, set, update } = writable(initial_value);

    return {
        subscribe,
        set: (value: number) => {
            // Ensure the value is within the bounds before updating
            value = Math.min(Math.max(value, config.min), config.max);
            set(value);
        },
        update: (updater) => {
            // Allow using update function as well
            update((current) => {
                const new_value = updater(current);
                return Math.min(Math.max(new_value, config.min), config.max);
            });
        },
        init: () => initial_value,
        get: () => config
    };
}

export default numeric_parameter;
