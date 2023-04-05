import excuteQuery from "../../../../../lib/db";

export default async (req, res) => {
  try {
    const { titulo, noticia } = req.body;

    console.log(titulo, noticia)
    await excuteQuery({
      query: 'INSERT INTO noticias (titulo, noticia) values (?, ?)',
      values: [titulo, noticia]
    });

    res.redirect('/')
  } catch (error) {
    console.log(error);
    res.redirect('back')
  }
};
