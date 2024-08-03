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
    console.log('Rendering question:', index);
    const question = questions[index];
    let html = `<h2 class="text-xl font-semibold mb-4">${question.text}</h2>`;

    switch (question.type) {
        case 'text':
            html += `<input type="text" id="q${question.id}" class="w-full p-2 border rounded" placeholder="${question.placeholder}">`;
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
                
                moveToNextQuestion();
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
            });
        });
    }

    // Add event listener for text input
    if (question.type === 'text') {
        const textInput = document.getElementById(`q${question.id}`);
        textInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                moveToNextQuestion();
            }
        });
    }
    updateButtons();
}

function updateButtons() {
    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next';
}

function moveToNextQuestion() {
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        } else {
            // If it's the last question, trigger the submit action
            submitSurvey();
        }
    }, 500); // Wait for 500ms before moving to the next question
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
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
    } else {
        submitSurvey();
    }
});

// Initialize the first question
renderQuestion(currentQuestionIndex);

function submitSurvey() {
    console.log('Survey submission');
    const surveyData = questions.map(question => {
        let answer;
        if (question.type === 'text') {
            const textInput = document.getElementById(`q${question.id}`);
            answer = textInput ? textInput.value : null;
        } else if (question.type === 'radio') {
            const selectedButton = document.querySelector('.radio-btn.bg-blue-500');
            answer = selectedButton ? selectedButton.dataset.value : null;
        } else if (question.type === 'checkbox') {
            answer = Array.from(document.querySelectorAll(`.checkbox-btn.bg-blue-500`))
                .map(button => button.dataset.value);
        }
        console.log(`Question ${question.id} answer:`, answer);
        return { questionId: question.id, answer: answer };
    });
    console.log('Survey responses:', surveyData);
    alert('Survey completed! Thank you for your responses.');
    // Here you would typically send the data to a server
}
