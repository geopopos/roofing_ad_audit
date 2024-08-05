const axios = require('axios');
require('dotenv').config();

exports.handler = async (event, context) => {
  console.log('Function invoked with event:', JSON.stringify(event));

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('Method Not Allowed:', event.httpMethod);
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, phone, email, companyName, city, state, country } = JSON.parse(event.body);
    console.log('Received data:', { name, phone, email, companyName, city, state, country });

    // Validate required fields
    if (!name || !phone || !email) {
      console.log('Missing required fields');
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
      city,
      state,
      country,
      source: 'Netlify Function'
    };
    console.log('Prepared contact data:', contactData);

    console.log('Sending request to Go High Level API');
    const response = await axios.post('https://rest.gohighlevel.com/v1/contacts/', contactData, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_LOCATION_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Go High Level API response:', response.data);

    // Create a note for the contact
    const contactId = response.data.contact.id;
    const noteBody = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCompany: ${companyName}\nSource: ${contactData.source}`;
    
    console.log('Creating note for contact:', contactId);
    const noteResponse = await axios.post(`https://rest.gohighlevel.com/v1/contacts/${contactId}/notes/`, 
      { body: noteBody, userID: process.env.GHL_USER_ID  },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_LOCATION_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Note creation response:', noteResponse.data);

    console.log('Contact created successfully and note added');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact created successfully and note added', data: response.data })
    };
  } catch (error) {
    console.error('Error creating contact:', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error creating contact', 
        error: error.message,
        details: error.response ? error.response.data : 'No additional details available'
      })
    };
  }
};
