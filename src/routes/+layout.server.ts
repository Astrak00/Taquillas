import type { LayoutServerLoad } from "./$types";
// load serverside data
export const load: LayoutServerLoad = async (event) => {
    return {
        session: await event.locals.auth()
    }

}

const email_list = [
        "100472175",
        "100472310"
    ]
    
    

export const _check_user: LayoutServerLoad = async ({email}) => {
    if (email_list.includes(email)) {
        return {
            status: 200
        }
    } else {
        return {
            status: 401
        }
    }
}