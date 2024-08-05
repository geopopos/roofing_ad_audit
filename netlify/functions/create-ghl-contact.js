const axios = require('axios');
require('dotenv').config();

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, phone, email, companyName } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !phone || !email) {
      return { statusCode: 400, body: 'Name, phone, and email are required' };
    }

    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    const contactData = {
      email,
      phone,
      firstName,
      lastName,
      name,
      companyName,
      source: 'Netlify Function'
    };

    const response = await axios.post('https://rest.gohighlevel.com/v1/contacts/', contactData, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_LOCATION_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact created successfully', data: response.data })
    };
  } catch (error) {
    console.error('Error creating contact:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating contact', error: error.message })
    };
  }
};
