const questions = [
    {
        id: 1,
        text: "What is your age?",
        type: "text",
        placeholder: "Enter your age"
    },
    {
        id: 2,
        text: "How satisfied are you with our service?",
        type: "radio",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
    },
    {
        id: 3,
        text: "What features would you like to see improved? (Select all that apply)",
        type: "checkbox",
        options: ["User Interface", "Performance", "Customer Support", "Documentation", "Pricing"]
    }
];

let currentQuestionIndex = 0;

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function renderQuestion(index) {
    const question = questions[index];
    let html = `<h2 class="text-xl font-semibold mb-4">${question.text}</h2>`;

    switch (question.type) {
        case 'text':
            html += `<input type="text" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}">`;
            break;
        case 'radio':
            question.options.forEach(option => {
                html += `
                <div class="mb-2">
                    <input type="radio" id="${option}" name="q${question.id}" value="${option}">
                    <label for="${option}">${option}</label>
                </div>`;
            });
            break;
        case 'checkbox':
            question.options.forEach(option => {
                html += `
                <div class="mb-2">
                    <input type="checkbox" id="${option}" name="q${question.id}" value="${option}">
                    <label for="${option}">${option}</label>
                </div>`;
            });
            break;
    }

    questionContainer.innerHTML = html;
    updateButtons();
}

function updateButtons() {
    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion(currentQuestionIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
    } else {
        // Handle survey submission
        alert('Survey completed! Thank you for your responses.');
        // Here you would typically send the data to a server
    }
});

// Initialize the first question
renderQuestion(currentQuestionIndex);
