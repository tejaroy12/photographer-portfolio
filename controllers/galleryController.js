const supabase = require('../supabase');

exports.createLocation = async (req, res) => {
  try {
    const { name, description, location, images } = req.body;

    if (!name || !description || !location || !images) {
      return res.status(400).json({ message: 'Please provide name, description, location and images.' });
    }

    // Parse images if it's a string
    let imagesData = images;
    if (typeof images === 'string') {
      try {
        imagesData = JSON.parse(images);
      } catch {
        return res.status(400).json({ message: 'Images must be a valid JSON array.' });
      }
    }

    if (!Array.isArray(imagesData)) {
      return res.status(400).json({ message: 'Images must be an array.' });
    }

    // Insert into Supabase
    const { data, error } = await supabase.from('locations').insert([
      { name, description, location, images: imagesData }
    ]).select();

    if (error) {
      console.error('Insert error:', error);
      return res.status(500).json({ message: 'Failed to insert location', error });
    }

    res.status(201).json({ message: 'Location created successfully', location: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const { data, error } = await supabase.from('locations').select('id, name, description, location, images');

    if (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ message: 'Failed to fetch locations', error });
    }

    res.status(200).json({ locations: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
