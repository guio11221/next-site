import excuteQuery from "../../../../../lib/db";

export default async (req, res) => {
    try {
    
        const result = await excuteQuery({query: 'SELECT * FROM noticias', values: null})

        res.json({result})
    } catch (error) {
        console.log(error);
    }
};