const supabase = require('../supabase');

exports.createLocation = [
  upload.array('images', 10),
  async (req, res) => {
    try {
      console.log('Request body:', req.body);
      console.log('Files uploaded:', req.files);

      const { name, description, location } = req.body;

      if (!name || !description || !location || !req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Missing fields or images' });
      }

      const images = req.files.map(file => file.path);
      console.log('Images array:', images);

      const { data, error } = await supabase
        .from('locations')
        .insert([{ name, description, location, images }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({ message: 'Failed to insert location', error });
      }

      res.status(201).json({ message: 'Location created successfully', location: data[0] });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
];


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
