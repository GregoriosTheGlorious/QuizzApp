// Multiple-choice questions
const multipleChoiceTemplate = `
  <div class="container mt-5">
    <div class="question">
      <h3>{{text}}</h3>
      <ul>
        {{#each options}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    </div>
  </div>
`;

// Narrative Questions
const narrativeTemplate = `
  <div class="container mt-5">
    <div class="question">
      <h3>{{text}}</h3>
      <textarea rows="4" cols="50" placeholder="Your answer"></textarea>
    </div>
  </div>
`;

//Image selection questions
const imageSelectionTemplate = `
  <div class="container mt-5">
    <div class="question">
      <h3>{{text}}</h3>
      <div class="image-options">
        {{#each options}}
          <img src="{{url}}" alt="Option {{@index}}" class="img-thumbnail">
        {{/each}}
      </div>
    </div>
  </div>
`;


const fetchAndDisplayQuestions = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/GregoriosTheGlorious/quiz-api/main/questions.json');
    const data = await response.json();

    // Ensure 'questions' is an array
    const questions = Array.isArray(data) ? data : [];

    // Display the first question
    displayQuestion(questions[0]);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};

// Function to display different question templates
const displayQuestion = (question) => {
  // Select the appropriate template based on the question type
  let template;
  switch (question.type) {
    case 'multipleChoice':
      template = Handlebars.compile(multipleChoiceTemplate);
      break;
    case 'narrative':
      template = Handlebars.compile(narrativeTemplate);
      break;
    case 'imageSelection':
      template = Handlebars.compile(imageSelectionTemplate);
      break;
    default:
      console.error('Unknown question type:', question.type);
      return;
  }

  // Render the template with the current question data
  const renderedHtml = template(question);

  // Append the rendered HTML to the #app container
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = renderedHtml;
};

// Fetch and display questions when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayQuestions);
