const calculations = [
    {
        name: "averageAge",
        questionId: 1,
        type: "average",
        valueType: "number"
    },
    {
        name: "satisfactionScore",
        questionId: 2,
        type: "average",
        valueType: "map",
        valueMap: {
            "Very Satisfied": 5,
            "Satisfied": 4,
            "Neutral": 3,
            "Dissatisfied": 2,
            "Very Dissatisfied": 1
        }
    },
    {
        name: "mostRequestedFeature",
        questionId: 3,
        type: "mostFrequent"
    },
    {
        name: "averageUsage",
        questionId: 4,
        type: "average",
        valueType: "number"
    }
];

const questions = [
    {
        id: 1,
        text: "What is your age?",
        type: "number",
        placeholder: "Enter your age",
        min: 0,
        max: 120,
        validation: true,
        regex: "^\\d{1,3}$",
        validationMessage: "Please enter a valid age between 0 and 120.",
        required: true
    },
    {
        id: 2,
        text: "How satisfied are you with our service?",
        type: "radio",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        validation: false,
        required: true
    },
    {
        id: 3,
        text: "What features would you like to see improved? (Select all that apply)",
        type: "checkbox",
        options: ["User Interface", "Performance", "Customer Support", "Documentation", "Pricing"],
        validation: false,
        required: false
    },
    {
        id: 4,
        text: "How many times have you used our service in the past month?",
        type: "number",
        placeholder: "Enter a number",
        min: 0,
        max: 100,
        validation: true,
        regex: "^\\d{1,3}$",
        validationMessage: "Please enter a number between 0 and 100.",
        required: true
    },
    {
        id: 5,
        text: "What is your phone number?",
        type: "tel",
        placeholder: "Enter your phone number",
        validation: true,
        regex: "^\\+?\\d{10,14}$",
        validationMessage: "Please enter a valid phone number (10-14 digits, optionally starting with +).",
        required: false
    },
    {
        id: 6,
        text: "What is your email address?",
        type: "email",
        placeholder: "Enter your email address",
        validation: true,
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        validationMessage: "Please enter a valid email address.",
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

    if (currentQuestion.validation && ['text', 'number', 'tel', 'email'].includes(currentQuestion.type)) {
        const regex = new RegExp(currentQuestion.regex);
        if (!regex.test(input.value)) {
            input.classList.add('border-red-500');
            showError(currentQuestion.validationMessage || 'Please enter a valid response.');
            return; // Don't move to the next question if validation fails
        }
    }

    // Update answers for text, number, tel, and email inputs
    if (['text', 'number', 'tel', 'email'].includes(currentQuestion.type)) {
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

    calculations.forEach(calc => {
        const relevantData = surveyData.filter(item => item.questionId === calc.questionId);

        switch (calc.type) {
            case "average":
                if (calc.valueType === "number") {
                    const sum = relevantData.reduce((acc, item) => acc + parseFloat(item.answer), 0);
                    results[calc.name] = sum / relevantData.length;
                } else if (calc.valueType === "map") {
                    const sum = relevantData.reduce((acc, item) => acc + calc.valueMap[item.answer], 0);
                    results[calc.name] = sum / relevantData.length;
                }
                break;
            case "mostFrequent":
                const counts = {};
                relevantData.forEach(item => {
                    if (Array.isArray(item.answer)) {
                        item.answer.forEach(ans => {
                            counts[ans] = (counts[ans] || 0) + 1;
                        });
                    } else {
                        counts[item.answer] = (counts[item.answer] || 0) + 1;
                    }
                });
                results[calc.name] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
                break;
        }
    });

    return results;
}

function submitSurvey() {
    console.log('Survey submission');
    const surveyData = questions.map(question => {
        const answer = answers[question.id];
        console.log(`Question ${question.id} answer:`, answer);
        return { questionId: question.id, answer: answer };
    });
    console.log('Survey responses:', surveyData);
    
    const results = calculateResults(surveyData);
    console.log('Calculated results:', results);

    let resultMessage = "Survey Results:\n";
    calculations.forEach(calc => {
        let value = results[calc.name];
        if (typeof value === 'number') {
            value = value.toFixed(2);
        }
        resultMessage += `- ${calc.name}: ${value}\n`;
    });

    alert('Survey completed! Thank you for your responses.\n\n' + resultMessage);
    // Here you would typically send the data to a server
}
