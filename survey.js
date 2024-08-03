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
            html += `<div class="flex flex-wrap gap-2">`;
            question.options.forEach(option => {
                html += `
                <button type="button" class="radio-btn bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200" data-value="${option}">
                    ${option}
                </button>`;
            });
            html += `</div>`;
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

    // Add event listeners for radio buttons
    if (question.type === 'radio') {
        const radioButtons = questionContainer.querySelectorAll('.radio-btn');
        radioButtons.forEach(button => {
            button.addEventListener('click', () => {
                radioButtons.forEach(btn => btn.classList.remove('bg-blue-500', 'text-white'));
                button.classList.add('bg-blue-500', 'text-white');
            });
        });
    }
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
        const surveyData = questions.map(question => {
            let answer;
            if (question.type === 'text') {
                answer = document.getElementById(`q${question.id}`).value;
            } else if (question.type === 'radio') {
                const selectedButton = document.querySelector('.radio-btn.bg-blue-500');
                answer = selectedButton ? selectedButton.dataset.value : null;
            } else if (question.type === 'checkbox') {
                answer = Array.from(document.querySelectorAll(`input[name="q${question.id}"]:checked`))
                    .map(checkbox => checkbox.value);
            }
            return { questionId: question.id, answer: answer };
        });
        console.log('Survey responses:', surveyData);
        alert('Survey completed! Thank you for your responses.');
        // Here you would typically send the data to a server
    }
});

// Initialize the first question
renderQuestion(currentQuestionIndex);
