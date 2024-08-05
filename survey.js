const calculations = [
    {
        name: "totalRevenue",
        formula: (totalRevenue) => totalRevenue
    },
    {
        name: "averageSaleValue",
        formula: (totalRevenue, numberOfSales) => totalRevenue / numberOfSales
    },
    {
        name: "roas",
        formula: (totalRevenue, totalMarketingCost) => totalRevenue / totalMarketingCost
    },
    {
        name: "costPerLead",
        formula: (totalMarketingCost, numberOfLeads) => totalMarketingCost / numberOfLeads
    },
    {
        name: "costPerAppointment",
        formula: (totalMarketingCost, numberOfAppointments) => totalMarketingCost / numberOfAppointments
    },
    {
        name: "costPerShow",
        formula: (totalMarketingCost, numberOfShows) => totalMarketingCost / numberOfShows
    },
    {
        name: "costPerSale",
        formula: (totalMarketingCost, numberOfSales) => totalMarketingCost / numberOfSales
    },
    {
        name: "leadToAppointmentConversion",
        formula: (numberOfAppointments, numberOfLeads) => (numberOfAppointments / numberOfLeads) * 100
    },
    {
        name: "appointmentToShowConversion",
        formula: (numberOfShows, numberOfAppointments) => (numberOfShows / numberOfAppointments) * 100
    },
    {
        name: "showToSaleConversion",
        formula: (numberOfSales, numberOfShows) => (numberOfSales / numberOfShows) * 100
    }
];

function formatCurrency(input) {
    // Store the current cursor position
    const cursorPos = input.selectionStart;

    // Remove non-digit characters
    let value = input.value.replace(/[^\d.]/g, '');

    // Ensure only one decimal point
    const decimalIndex = value.indexOf('.');
    if (decimalIndex !== -1) {
        value = value.slice(0, decimalIndex + 1) + value.slice(decimalIndex + 1).replace(/\./g, '');
    }

    // Ensure only two decimal places
    const parts = value.split('.');
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join('.');
    }

    // Add commas for thousands
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Add dollar sign
    if (value !== '') {
        value = '$' + value;
    }

    // Calculate new cursor position
    const addedChars = value.length - input.value.length;
    const newCursorPos = cursorPos + addedChars;

    // Update the input value
    input.value = value;

    // Set the cursor position
    input.setSelectionRange(newCursorPos, newCursorPos);
}

// Define the redirect URL
const redirectUrl = 'https://apply.thevolumeupagency.com/31-checkpoint-audit';



const questions = [
    {
        id: 1,
        text: "What city are you located in?",
        type: "text",
        placeholder: "Enter your city",
        validation: true,
        validationMessage: "Please select a valid city from the suggestions.",
        required: true
    },
    {
        id: 2,
        text: "How do you currently generate roofing leads (select all that apply)?",
        type: "checkbox",
        options: [
            "Lead broker (Angi, Thumbtack, CraftJack, etc)",
            "Facebook/Instagram Ads",
            "Google Ads",
            "NextDoor Ads",
            "Yelp Ads",
            "Tik Tok Ads",
            "News Paper",
            "Direct Mail",
            "Cold Calling",
            "Door Knocking",
            "TV",
            "Radio",
            "SEO",
            "Other"
        ],
        required: true
    },
    {
        id: 3,
        text: "What is your total monthly marketing cost? (Just a guess is fine)",
        type: "text",
        placeholder: "Enter total marketing cost",
        min: 0,
        validation: true,
        regex: "^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$",
        validationMessage: "Please enter a valid currency amount.",
        required: true,
        format: formatCurrency
    },
    {
        id: 4,
        text: "How many leads do you generate on average?",
        type: "number",
        placeholder: "Enter number of leads",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 5,
        text: "How many appointments are set on average?",
        type: "number",
        placeholder: "Enter number of appointments",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 6,
        text: "How many appointments showed up on average?",
        type: "number",
        placeholder: "Enter number of shows",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 7,
        text: "How many sales do you close on average?",
        type: "number",
        placeholder: "Enter number of sales",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 8,
        text: "What is your total revenue generated Per Month?",
        type: "text",
        placeholder: "Enter total revenue",
        validation: true,
        regex: "^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$",
        validationMessage: "Please enter a valid currency amount.",
        required: true,
        format: formatCurrency
    },
    {
        id: 9,
        text: "What is your name?",
        type: "text",
        placeholder: "Enter your full name",
        validation: true,
        regex: "^[a-zA-Z ]+$",
        validationMessage: "Please enter a valid name (letters and spaces only).",
        required: true
    },
    {
        id: 12,
        text: "What is your company name?",
        type: "text",
        placeholder: "Enter your company name",
        validation: false,
        required: true
    },
    {
        id: 11,
        text: "What is your email address? (This will be used to send you your instant audit)",
        type: "email",
        placeholder: "Enter your email address",
        validation: true,
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        validationMessage: "Please enter a valid email address.",
        required: true
    },
    {
        id: 10,
        text: "What is your phone number? (This will be used to send you your instant audit)",
        type: "tel",
        placeholder: "Enter your phone number",
        validation: true,
        regex: "^\\+?[1-9]\\d{1,14}$",
        validationMessage: "Please enter a valid phone number.",
        required: true
    }
];

let currentQuestionIndex = 0;
let answers = {};

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function renderQuestion(index) {
    console.log('Rendering question:', index);
    const question = questions[index];
    let html = `<h2 class="text-xl font-semibold mb-4">${question.text}</h2>`;
    
    clearError();

    // Fade out the current question
    questionContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update progress bar
        updateProgress(index);

        switch (question.type) {
            case 'text':
            case 'number':
            case 'tel':
            case 'email':
                html += `<input type="${question.type}" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}" ${question.min !== undefined ? `min="${question.min}"` : ''} ${question.max !== undefined ? `max="${question.max}"` : ''} ${question.validation ? `pattern="${question.regex}"` : ''}>`;
                break;
            // ... (rest of the switch case)
        }

        questionContainer.innerHTML = html;


        // ... (rest of the function)
    }, 300);
}

function initAutocomplete() {
    const input = document.getElementById('q1');
    if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (place.address_components) {
                let city = '', state = '', country = '';
                for (const component of place.address_components) {
                    if (component.types.includes('locality')) {
                        city = component.long_name;
                    } else if (component.types.includes('administrative_area_level_1')) {
                        state = component.short_name;
                    } else if (component.types.includes('country')) {
                        country = component.long_name;
                    }
                }
                answers[1] = `${city}, ${state}, ${country}`.trim();
                input.value = answers[1];
            }
        });
    }
}

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBBRsLUBwQWLvJIfZtySPCK2HHD75HNap8&libraries=places&callback=initAutocomplete`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Call this function when the page loads
window.addEventListener('load', loadGoogleMapsScript);

function renderQuestion(index) {
    console.log('Rendering question:', index);
    const question = questions[index];
    let html = `<h2 class="text-xl font-semibold mb-4">${question.text}</h2>`;
    
    clearError();

    // Fade out the current question
    questionContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update progress bar
        updateProgress(index);

        switch (question.type) {
        case 'text':
        case 'number':
        case 'tel':
        case 'email':
            html += `<input type="${question.type}" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}" ${question.min !== undefined ? `min="${question.min}"` : ''} ${question.max !== undefined ? `max="${question.max}"` : ''} ${question.validation ? `pattern="${question.regex}"` : ''} autofocus>`;
            break;
        // ... (rest of the switch case)
        }

        questionContainer.innerHTML = html;

        // Initialize Google Places Autocomplete for the city question
        if (question.id === 1) {
            initAutocomplete();
        }

        // ... (rest of the function)
    }, 300);
}

function renderQuestion(index) {
    console.log('Rendering question:', index);
    const question = questions[index];
    let html = `<h2 class="text-xl font-semibold mb-4">${question.text}</h2>`;
    
    clearError();

    // Fade out the current question
    questionContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update progress bar
        updateProgress(index);

        switch (question.type) {
        case 'text':
        case 'number':
        case 'tel':
        case 'email':
            html += `<input type="${question.type}" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}" ${question.min !== undefined ? `min="${question.min}"` : ''} ${question.max !== undefined ? `max="${question.max}"` : ''} ${question.validation ? `pattern="${question.regex}"` : ''} autofocus>`;
            break;
        case 'radio':
            html += `<div class="grid grid-cols-2 gap-2">`;
            question.options.forEach((option, index) => {
                const isLastOdd = index === question.options.length - 1 && question.options.length % 2 !== 0;
                html += `
                <button type="button" class="radio-btn bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200 ${isLastOdd ? 'col-span-2' : ''}" data-value="${option}">
                    ${option}
                </button>`;
            });
            html += `</div>`;
            break;
        case 'checkbox':
            html += `<div class="grid grid-cols-2 gap-2">`;
            question.options.forEach((option, index) => {
                const isLastOdd = index === question.options.length - 1 && question.options.length % 2 !== 0;
                html += `
                <button type="button" class="checkbox-btn bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200 ${isLastOdd ? 'col-span-2' : ''}" data-value="${option}">
                    ${option}
                </button>`;
            });
            html += `</div>`;
            break;
    }

    questionContainer.innerHTML = html;

    // Add event listeners for radio buttons
    if (question.type === 'radio') {
        console.log('Adding event listeners for radio buttons');
        const radioButtons = questionContainer.querySelectorAll('.radio-btn');
        radioButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Radio button clicked:', button.dataset.value);
                radioButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                button.classList.remove('bg-gray-200', 'text-gray-800');
                button.classList.add('bg-blue-500', 'text-white');
                
                answers[question.id] = button.dataset.value;
                if (question.required) {
                    moveToNextQuestion();
                }
            });
        });
    }

    // Add event listeners for checkbox buttons
    if (question.type === 'checkbox') {
        console.log('Adding event listeners for checkbox buttons');
        const checkboxButtons = questionContainer.querySelectorAll('.checkbox-btn');
        checkboxButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Checkbox button clicked:', button.dataset.value);
                button.classList.toggle('bg-blue-500');
                button.classList.toggle('text-white');
                button.classList.toggle('bg-gray-200');
                button.classList.toggle('text-gray-800');
                
                if (!answers[question.id]) {
                    answers[question.id] = [];
                }
                if (button.classList.contains('bg-blue-500')) {
                    answers[question.id].push(button.dataset.value);
                } else {
                    answers[question.id] = answers[question.id].filter(value => value !== button.dataset.value);
                }

                if (question.required && answers[question.id].length === 0) {
                    delete answers[question.id];
                }
            });
        });
    }

    // Add event listener for text, number, tel, and email inputs
    if (['text', 'number', 'tel', 'email'].includes(question.type)) {
        const input = document.getElementById(`q${question.id}`);
        input.addEventListener('input', (event) => {
            if (question.format) {
                question.format(input);
            }
            answers[question.id] = input.value;
            if (question.validation) {
                const regex = new RegExp(question.regex);
                if (regex.test(input.value.replace(/[,$]/g, ''))) {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-green-500');
                } else {
                    input.classList.remove('border-green-500');
                    input.classList.add('border-red-500');
                }
            }
        });
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (!question.validation || (question.validation && new RegExp(question.regex).test(input.value))) {
                    moveToNextQuestion();
                }
            }
        });
        // Set focus on the input field
        setTimeout(() => input.focus(), 0);
    }
    updateButtons();

    // Fade in the new question
    setTimeout(() => {
        questionContainer.classList.remove('fade-out');
        questionContainer.classList.add('fade-in');
    }, 50);
}, 300); // This timeout should match the transition duration in CSS
}


function updateButtons() {
    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearError() {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
}

function updateProgress(index) {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((index + 1) / questions.length) * 100;
    
    // Animate the progress bar width
    progressBar.style.width = `${progress}%`;
    
    // Update the text content after a short delay to allow for the width animation
    setTimeout(() => {
        progressBar.textContent = `${Math.round(progress)}%`;
    }, 150);
}

function moveToNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const input = document.getElementById(`q${currentQuestion.id}`);
    console.log("Current question:", currentQuestion);
    console.log("Current question required:", currentQuestion.required);

    clearError();

    if (currentQuestion.required) {
        if (currentQuestion.type === 'checkbox') {
            if (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) {
                showError('This question is required. Please select at least one option.');
                return;
            }
        } else if (['text', 'number', 'tel', 'email'].includes(currentQuestion.type)) {
            if (!input.value.trim()) {
                showError('This question is required. Please provide an answer.');
                return;
            }
        } else if (!answers[currentQuestion.id] || answers[currentQuestion.id] === '') {
            showError('This question is required. Please provide an answer.');
            return;
        }
    }

    if (currentQuestion.validation && ['text', 'number', 'tel', 'email'].includes(currentQuestion.type)) {
        const regex = new RegExp(currentQuestion.regex);
        if (!regex.test(input.value)) {
            input.classList.add('border-red-500');
            showError(currentQuestion.validationMessage || 'Please enter a valid response.');
            return; // Don't move to the next question if validation fails
        }
    }

    // Update answers for text, number, tel, and email inputs
    if (['text', 'number', 'tel', 'email'].includes(currentQuestion.type) && currentQuestion.id !== 1) {
        answers[currentQuestion.id] = input.value.trim();
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
    } else {
        // If it's the last question, trigger the submit action
        submitSurvey();
    }
}

prevBtn.addEventListener('click', () => {
    console.log('Previous button clicked');
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion(currentQuestionIndex);
    }
});

nextBtn.addEventListener('click', () => {
    console.log('Next button clicked');
    moveToNextQuestion();
});

// Initialize the first question
renderQuestion(currentQuestionIndex);



function calculateResults(surveyData) {
    let results = {};
    const answers = {};

    surveyData.forEach(item => {
        if (item.questionId === 2) {
            // Handle the checkbox question for marketing methods
            answers[item.questionId] = item.answer;
        } else {
            answers[item.questionId] = parseFloat(item.answer) || 0;
        }
    });

    calculations.forEach(calc => {
        let result;
        switch (calc.name) {
            case "totalRevenue":
                result = calc.formula(answers[8]);
                break;
            case "averageSaleValue":
                result = calc.formula(answers[8], answers[7]);
                break;
            case "roas":
                result = calc.formula(answers[8], answers[3]);
                break;
            case "costPerLead":
                result = calc.formula(answers[3], answers[4]);
                break;
            case "costPerAppointment":
                result = calc.formula(answers[3], answers[5]);
                break;
            case "costPerShow":
                result = calc.formula(answers[3], answers[6]);
                break;
            case "costPerSale":
                result = calc.formula(answers[3], answers[7]);
                break;
            case "leadToAppointmentConversion":
                result = calc.formula(answers[5], answers[4]);
                break;
            case "appointmentToShowConversion":
                result = calc.formula(answers[6], answers[5]);
                break;
            case "showToSaleConversion":
                result = calc.formula(answers[7], answers[6]);
                break;
        }
        results[calc.name] = isNaN(result) || !isFinite(result) ? 0 : parseFloat(result.toFixed(2));
    });

    return results;
}

function submitSurvey() {
    console.log('Calculator submission');
    const surveyData = questions.map(question => {
        let answer = answers[question.id];
        if (question.type === 'checkbox') {
            answer = Array.isArray(answer) ? answer.join(',') : '';
        } else if (question.format) {
            // Remove currency formatting for calculation
            answer = parseFloat(answer.replace(/[^0-9.-]+/g, "")) || 0;
        }
        console.log(`Question ${question.id} answer:`, answer);
        return { questionId: question.id, answer: answer };
    });
    console.log('Calculator responses:', surveyData);
    
    const results = calculateResults(surveyData);
    console.log('Calculated results:', results);

    const queryParams = new URLSearchParams({
        city: answers[1] || '',
        marketingMethods: surveyData.find(item => item.questionId === 2)?.answer || '',
        totalMarketingCost: surveyData.find(item => item.questionId === 3)?.answer || '0',
        numberOfLeads: answers[4] || '0',
        numberOfAppointments: answers[5] || '0',
        numberOfShows: answers[6] || '0',
        numberOfSales: answers[7] || '0',
        totalRevenue: surveyData.find(item => item.questionId === 8)?.answer || '0',
        costPerLead: (results.costPerLead || 0).toFixed(2),
        costPerAppointment: (results.costPerAppointment || 0).toFixed(2),
        costPerShow: (results.costPerShow || 0).toFixed(2),
        costPerSale: (results.costPerSale || 0).toFixed(2),
        leadToAppointmentConversion: (results.leadToAppointmentConversion || 0).toFixed(2),
        appointmentToShowConversion: (results.appointmentToShowConversion || 0).toFixed(2),
        showToSaleConversion: (results.showToSaleConversion || 0).toFixed(2),
        averageSaleValue: (results.averageSaleValue || 0).toFixed(2),
        roas: (results.roas || 0).toFixed(2),
        name: answers[9] || '',
        phoneNumber: answers[10] || '',
        email: answers[11] || ''
    });

    // Extract city, state, and country from the city field
    const cityParts = (answers[1] || '').split(',').map(part => part.trim());
    const city = cityParts[0] || '';
    const state = cityParts[1] || '';
    const country = cityParts[2] || cityParts[1] || ''; // Use the last part as country, defaulting to state if only two parts
    console.log(`City: ${city}, State: ${state}, Country: ${country}`);

    // Call the Netlify function to create a contact in Go High Level
    fetch('/.netlify/functions/create-ghl-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: answers[9] || '',
            phone: answers[10] || '',
            email: answers[11] || '',
            companyName: answers[12] || '',
            city: city,
            state: state,
            country: country,
            leadGenerationMethods: Array.isArray(answers[2]) ? answers[2].join(', ') : answers[2] || '',
            totalMarketingCost: answers[3] || '',
            numberOfLeads: answers[4] || '',
            numberOfAppointments: answers[5] || '',
            numberOfShows: answers[6] || '',
            numberOfSales: answers[7] || '',
            totalRevenue: answers[8] || '',
            surveyResponses: {
                city: answers[1] || '',
                leadGenerationMethods: Array.isArray(answers[2]) ? answers[2].join(', ') : answers[2] || '',
                totalMarketingCost: answers[3] || '',
                numberOfLeads: answers[4] || '',
                numberOfAppointments: answers[5] || '',
                numberOfShows: answers[6] || '',
                numberOfSales: answers[7] || '',
                totalRevenue: answers[8] || ''
            }
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Contact created:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Trigger confetti effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Delay redirect to show confetti
    setTimeout(() => {
        // Function to check if the page is embedded
        function isPageEmbedded() {
            // Using window.frameElement for same-origin iframes
            if (window.frameElement) {
                return true;
            }
            // Fallback method that might work across origins
            try {
                return window.self !== window.top;
            } catch (e) {
                return true; // Assume embedded if access is denied due to same-origin policy
            }
        }

        // Example usage within the child page
        if (isPageEmbedded()) {
            // The page is embedded, so we set up the redirect mechanism
            window.parent.postMessage({action: 'redirect', url: `${redirectUrl}?${queryParams.toString()}`}, '*');
        }
        // if page is not embedded, we redirect directly
        window.location.href = `${redirectUrl}?${queryParams.toString()}`;
    }, 500);
}
