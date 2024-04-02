const selection = document.querySelector('select');
const form = document.querySelector('form');



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const main = document.querySelector('main');
        while(main.hasChildNodes()) {
            main.removeChild(main.firstChild);
        }

    if(selection.value == 'any-category') {
    fetch('https://opentdb.com/api.php?amount=10')
        .then((response) => response.json())
        .then((json) =>  {
            console.log(json)
            makeQuestions(json.results)
        })
        .catch('Please wait');
    }
    else {
        fetch(`https://opentdb.com/api.php?amount=10&category=${selection.value}`)
        .then((response) => response.json())
        .then((json) =>  {
            console.log(json)
            makeQuestions(json.results)
        })
        .catch('Please wait');
    }
})






function makeQuestions(arrOfQuestions) {
    arrOfQuestions.forEach(item => {
        const main = document.querySelector('main');
            
            const card = document.createElement('article');
            card.setAttribute('class', 'card');
            const difficulty = item.difficulty;

                const category = document.createElement('h2');
                category.textContent = `${item.category} (Difficulty: easy)`;
                
                const question = document.createElement('p');
                question.innerHTML = item.question;

                
                
                
                const correctAnswer = document.createElement('input');
                correctAnswer.setAttribute('type', 'radio');
                correctAnswer.setAttribute('id', item.correct_answer);
                correctAnswer.setAttribute('name', 'answer')
                
                const correctLabel = document.createElement('label');
                correctLabel.setAttribute('for', item.correct_answer);
                correctLabel.innerHTML = `${item.correct_answer}`
                
                
                const answerButton = document.createElement('button');
                answerButton.textContent = 'Show Answer';
                answerButton.addEventListener('click', () => {
                    correctLabel.style['background-color'] = '#b5fbca';
                })

                const answerList = document.createElement('section');
                answerList.setAttribute('class', 'answer-holder')

                    item.incorrect_answers.forEach(choice => {

                        const answerRadio = document.createElement('input');
                        answerRadio.setAttribute('type', 'radio');
                        answerRadio.setAttribute('id', choice);
                        answerRadio.setAttribute('name', 'answer')

                        const answerLabel = document.createElement('label')
                        answerLabel.setAttribute('for', choice);
                        answerLabel.innerHTML = `${choice}`;

                        
                        answerList.append(answerLabel, answerRadio);
                    })

                answerList.append(correctLabel, correctAnswer);

                if(difficulty == 'medium') {
                    card.style.border = '3px solid #c5c862';
                    answerButton.style.background = '#c5c862';
                    answerButton.style.border = '2px solid #f7f988';
                    answerButton.style.color = '#111';
                    category.textContent = `${item.category} (Difficulty: medium)`;
                    answerButton.addEventListener('mouseover', () =>  {
                        answerButton.style.background = '#f7f988';
                        answerButton.style.border = '2px solid #c5c862';
                        answerButton.style.color = '#111';
                    })
                    answerButton.addEventListener('mouseout', () =>  {
                        answerButton.style.background = '#c5c862';
                        answerButton.style.border = '2px solid #f7f988';
                        answerButton.style.color = '#111';
                    })
                }
                if(difficulty == 'hard') {
                    card.style.border = '3px solid #7d4f4f';
                    answerButton.style.background = '#7d4f4f';
                    answerButton.style.border = '2px solid #fd9c9c';
                    category.textContent = `${item.category} (Difficulty: hard)`;
                    answerButton.addEventListener('mouseover', () =>  {
                        answerButton.style.background = '#fd9c9c';
                        answerButton.style.border = '2px solid #7d4f4f';
                        answerButton.style.color = '#111';
                    })
                    answerButton.addEventListener('mouseout', () =>  {
                        answerButton.style.background = '#7d4f4f';
                        answerButton.style.border = '2px solid #fd9c9c';
                        answerButton.style.color = '#fff';
                    })
                }

            card.append(category, question, answerList, answerButton);
        
        main.appendChild(card);

    })
}