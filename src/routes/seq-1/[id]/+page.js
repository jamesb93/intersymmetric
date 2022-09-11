import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    if (params.id) {
        console.log(params, 'page.js');
        return {
            id: params.id
        };
    }

    throw error(404, 'Not found');
}
