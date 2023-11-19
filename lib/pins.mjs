import * as pin from '@myno_21/pinterest-scraper';

async function pinterest(query) {
    if(!query) return { status: false, msg: "query is undefined" };
    try {
        const data = await pin.searchPins(query);
        return { status: true, data: data };
    } catch(e) {
        return { status: false, error: e };
        console.log(`Error at pins.mjs lib:`, e);
    }
}

export default pinterest;