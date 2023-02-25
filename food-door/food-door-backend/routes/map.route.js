app.get('/search', async (req, res) => {
    const { term } = req.query;
    const restaurants = await Restaurant.find({ $text: { $search: term } });
    res.json(restaurants);
  });
  