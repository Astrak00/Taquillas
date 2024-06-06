import type { PageServerLoad, Actions} from './$types';
import size from '$lib/size';
import { prueba, reservaTaquilla } from '$lib/api_taquillas';


export const load: PageServerLoad = async ({ request }) => {
	const cositas = request.url.split('/').filter((element) => element.length <= 2);
	cositas.shift();
	const edificio = cositas[0];
	const planta = cositas[1][0];
	const fetchOcupacionBloques = async () => {
		const res = await fetch(`http://localhost:18080/api/ocupacionBloque/${edificio}/${planta}`);
		const data = await res.json();
		console.log(data);
		return data;
	}

	return {
		serverMessage: 'hello from server load function',
        size: size,
		bloques: fetchOcupacionBloques(),
	};
};


export const actions = {
	registerTaquilla: async ({ cookies, request }) => {
		//console.log('registerTaquilla ha sido invocado');
		const data = await request.formData();
		const taquilla = data.get('taquilla');
		const nia = data.get('nia');
		const result = prueba(taquilla, nia);
		return result;
	},
} satisfies Actions;
