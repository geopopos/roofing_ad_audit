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
      country: country || 'United States', // Set default country if not provided
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
    const { surveyResponses, calculatedResults } = JSON.parse(event.body);
    const noteBody = `
Name: ${name}
Phone: ${phone}
Email: ${email}
Company: ${companyName}
City: ${city}
State: ${state}
Country: ${country}
Source: ${contactData.source}

Survey Responses:
1. City: ${surveyResponses.city || 'Not provided'}
2. Lead Generation Methods: ${surveyResponses.leadGenerationMethods || 'Not provided'}
3. Total Monthly Marketing Cost: ${surveyResponses.totalMarketingCost || 'Not provided'}
4. Average Number of Leads: ${surveyResponses.numberOfLeads || 'Not provided'}
5. Average Number of Appointments Set: ${surveyResponses.numberOfAppointments || 'Not provided'}
6. Average Number of Appointments Showed Up: ${surveyResponses.numberOfShows || 'Not provided'}
7. Average Number of Sales Closed: ${surveyResponses.numberOfSales || 'Not provided'}
8. Total Revenue Generated Per Month: ${surveyResponses.totalRevenue || 'Not provided'}

Calculated Results:
- Cost Per Lead: $${calculatedResults.costPerLead || 'N/A'}
- Cost Per Appointment: $${calculatedResults.costPerAppointment || 'N/A'}
- Cost Per Show: $${calculatedResults.costPerShow || 'N/A'}
- Cost Per Sale: $${calculatedResults.costPerSale || 'N/A'}
- Lead to Appointment Conversion: ${calculatedResults.leadToAppointmentConversion || 'N/A'}%
- Appointment to Show Conversion: ${calculatedResults.appointmentToShowConversion || 'N/A'}%
- Show to Sale Conversion: ${calculatedResults.showToSaleConversion || 'N/A'}%
- Average Sale Value: $${calculatedResults.averageSaleValue || 'N/A'}
- ROAS (Return on Ad Spend): ${calculatedResults.roas || 'N/A'}x
    `.trim();
    
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
