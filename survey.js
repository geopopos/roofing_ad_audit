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

let autocomplete;

let autocomplete;

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
        text: "What is your total marketing cost?",
        type: "number",
        placeholder: "Enter total marketing cost",
        min: 0,
        validation: true,
        regex: "^\\d+(\\.\\d{1,2})?$",
        validationMessage: "Please enter a valid number with up to 2 decimal places.",
        required: true
    },
    {
        id: 3,
        text: "How many leads did you generate?",
        type: "number",
        placeholder: "Enter number of leads",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 4,
        text: "How many appointments were set?",
        type: "number",
        placeholder: "Enter number of appointments",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 5,
        text: "How many appointments showed up?",
        type: "number",
        placeholder: "Enter number of shows",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 6,
        text: "How many sales did you close?",
        type: "number",
        placeholder: "Enter number of sales",
        min: 0,
        validation: true,
        regex: "^\\d+$",
        validationMessage: "Please enter a valid whole number.",
        required: true
    },
    {
        id: 7,
        text: "What is your total revenue generated?",
        type: "number",
        placeholder: "Enter total revenue",
        min: 0,
        validation: true,
        regex: "^\\d+(\\.\\d{1,2})?$",
        validationMessage: "Please enter a valid number with up to 2 decimal places.",
        required: true
    }
];

let currentQuestionIndex = 0;
let answers = {};

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function initAutocomplete() {
    const input = document.getElementById('q1');
    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'],
        fields: ['place_id', 'geometry', 'name']
    });
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        document.getElementById('q1').placeholder = 'Enter a city';
    } else {
        answers[1] = place.name;
    }
}

function initAutocomplete() {
    const input = document.getElementById('q1');
    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'],
        fields: ['place_id', 'geometry', 'name']
    });
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        document.getElementById('q1').placeholder = 'Enter a city';
    } else {
        answers[1] = place.name;
    }
}

function renderQuestion(index) {
    console.log('Rendering question:', index);
    const question = questions[index];
    let html = `<h2 class="text-xl font-semibold mb-4">${question.text}</h2>`;
    
    clearError();

    if (index === 0) {
        html += `<input type="text" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}" autofocus>`;
    } else {

    if (index === 0) {
        html += `<input type="text" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}" autofocus>`;
    } else {

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
            answers[question.id] = event.target.value;
            if (question.validation) {
                const regex = new RegExp(question.regex);
                if (regex.test(event.target.value)) {
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
    }
    updateButtons();
    setFocusOnTextInput();
}

function setFocusOnTextInput() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'text') {
        const textInput = document.getElementById(`q${currentQuestion.id}`);
        if (textInput) {
            textInput.focus();
        }
    }
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

    if (currentQuestion.id === 1) {
        // City validation
        const place = autocomplete.getPlace();
        if (!place || !place.geometry) {
            showError('Please select a valid city from the suggestions.');
            return;
        }
        answers[currentQuestion.id] = place.name;
    } else if (currentQuestion.validation && ['text', 'number', 'tel', 'email'].includes(currentQuestion.type)) {
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

// Initialize Google Places Autocomplete
google.maps.event.addDomListener(window, 'load', initAutocomplete);

// Initialize Google Places Autocomplete
google.maps.event.addDomListener(window, 'load', initAutocomplete);

function calculateResults(surveyData) {
    let results = {};
    const answers = {};

    surveyData.forEach(item => {
        answers[item.questionId] = parseFloat(item.answer);
    });

    calculations.forEach(calc => {
        let result;
        switch (calc.name) {
            case "totalRevenue":
                result = calc.formula(answers[6]);
                break;
            case "averageSaleValue":
                result = calc.formula(answers[6], answers[5]);
                break;
            case "roas":
                result = calc.formula(answers[6], answers[1]);
                break;
            case "costPerLead":
                result = calc.formula(answers[1], answers[2]);
                break;
            case "costPerAppointment":
                result = calc.formula(answers[1], answers[3]);
                break;
            case "costPerShow":
                result = calc.formula(answers[1], answers[4]);
                break;
            case "costPerSale":
                result = calc.formula(answers[1], answers[5]);
                break;
            case "leadToAppointmentConversion":
                result = calc.formula(answers[3], answers[2]);
                break;
            case "appointmentToShowConversion":
                result = calc.formula(answers[4], answers[3]);
                break;
            case "showToSaleConversion":
                result = calc.formula(answers[5], answers[4]);
                break;
        }
        results[calc.name] = isNaN(result) || !isFinite(result) ? 0 : result;
    });

    return results;
}

function submitSurvey() {
    console.log('Calculator submission');
    const surveyData = questions.map(question => {
        const answer = answers[question.id];
        console.log(`Question ${question.id} answer:`, answer);
        return { questionId: question.id, answer: answer };
    });
    console.log('Calculator responses:', surveyData);
    
    const results = calculateResults(surveyData);
    console.log('Calculated results:', results);

    const queryParams = new URLSearchParams({
        city: answers[1] || '',
        totalMarketingCost: answers[2] || '0',
        numberOfLeads: answers[3] || '0',
        numberOfAppointments: answers[4] || '0',
        numberOfShows: answers[5] || '0',
        numberOfSales: answers[6] || '0',
        totalRevenue: answers[7] || '0',
        costPerLead: (results.costPerLead || 0).toFixed(2),
        costPerAppointment: (results.costPerAppointment || 0).toFixed(2),
        costPerShow: (results.costPerShow || 0).toFixed(2),
        costPerSale: (results.costPerSale || 0).toFixed(2),
        leadToAppointmentConversion: (results.leadToAppointmentConversion || 0).toFixed(2),
        appointmentToShowConversion: (results.appointmentToShowConversion || 0).toFixed(2),
        showToSaleConversion: (results.showToSaleConversion || 0).toFixed(2),
        averageSaleValue: (results.averageSaleValue || 0).toFixed(2),
        roas: (results.roas || 0).toFixed(2)
    });

    window.location.href = `thankyou.html?${queryParams.toString()}`;
}
