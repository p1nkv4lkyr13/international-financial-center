$(document).ready(function () {
    let questions = [];
    let currentQuestionIndex = -1;
    let totalBalance = 0;

    // Function to update the total balance display
    function updateTotalBalance() {
        $('#total-balance').text(`${totalBalance} VNĐ`);
    }

    // Function to log actions to the history list
    function logAction(action) {
        const time = new Date().toLocaleTimeString();
        $('#history-list').prepend(
            `<div class="list-group-item">${time}: ${action}</div>`
        );
    }

    // Load questions from JSON file
    $.ajax({
        url: '/international-financial-center/data/questions.json',
        dataType: 'json',
        success: function (data) {
            questions = data;
            renderQuestionList();
            logAction('Questions loaded.');
        },
        error: function () {
            alert('Failed to load questions.');
        },
    });

    // Render the list of questions on the left
    function renderQuestionList() {
        const questionList = $('#question-list');
        questionList.empty();
        questions.forEach((q, index) => {
            const card = $(`
        <div class="card mb-2 ${
            q.answered ? 'answered' : ''
        }" data-index="${index}">
          <div class="card-body">
            <h5 class="card-title">${q.subject}</h5>
            <p class="card-text">Status: ${
                q.answered ? 'Answered' : 'Not Answered'
            }</p>
          </div>
        </div>
      `);
            card.on('click', function () {
                loadQuestion(index);
            });
            questionList.append(card);
        });
    }

    // Load a specific question into the center panel
    function loadQuestion(index) {
        currentQuestionIndex = index;
        const question = questions[index];
        $('#question-display').html(
            `<h4>${question.subject}</h4><p>${question.question}</p>`
        );
        $('#answer-input').val('').prop('disabled', question.answered);
        $('#save-answer').prop('disabled', question.answered);
    }

    // Save answer
    $('#save-answer').on('click', function () {
        if (currentQuestionIndex === -1) return;

        const userAnswer = $('#answer-input').val().trim();
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            questions[currentQuestionIndex].answered = true;
            totalBalance += 1000;
            updateTotalBalance();
            logAction(
                `Answered question '${questions[currentQuestionIndex].subject}' correctly. You earned 1000 VNĐ.`
            );
            renderQuestionList();
            loadQuestion(currentQuestionIndex);
        } else {
            alert('Incorrect answer. Please try again.');
        }
    });

    // Previous question
    $('#prev-question').on('click', function () {
        if (currentQuestionIndex > 0) {
            loadQuestion(currentQuestionIndex - 1);
        }
    });

    // Next question
    $('#next-question').on('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1);
        }
    });

    // Make a deposit
    $('#make-deposit').on('click', function () {
        const amount = prompt('Please enter the amount to deposit:');
        if (amount && !isNaN(amount)) {
            totalBalance += parseInt(amount);
            updateTotalBalance();
            logAction(`User deposited ${amount} VNĐ.`);
        } else if (amount) {
            alert('Please enter a valid number.');
        }
    });

    // Make a withdraw request
    $('#make-withdraw').on('click', function () {
        const amount = prompt('Please enter the amount to withdraw:');
        if (amount && !isNaN(amount)) {
            const withdrawAmount = parseInt(amount);
            if (withdrawAmount > totalBalance) {
                alert('Insufficient balance.');
            } else {
                totalBalance -= withdrawAmount;
                updateTotalBalance();
                logAction(`User withdrew ${withdrawAmount} VNĐ.`);
            }
        } else if (amount) {
            alert('Please enter a valid number.');
        }
    });

    // Update user information
    $('#update-info').on('click', function () {
        const info = prompt('Please enter your information:');
        if (info) {
            logAction('User information updated.');
        }
    });

    // Update user name
    $('#update-name').on('click', function () {
        const newName = prompt('Please enter your name:');
        if (newName) {
            $('#user-name').text(newName);
            logAction(`User name updated to '${newName}'.`);
        }
    });

    // Initial log
    logAction('User logged in.');
    updateTotalBalance();
});
