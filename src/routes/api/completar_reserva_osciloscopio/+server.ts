import type { RequestHandler } from './$types';
import { completaReservaOsciloscopio } from '$lib/api_taquillas';
import {json} from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const input = await request.json();
    const { puesto, hora, fecha, email } = input;
    
    // Llama a la API de reserva de la base de datos:
    const result = await completaReservaOsciloscopio(puesto, hora, fecha, email);
    	
    return json({result: result});
};