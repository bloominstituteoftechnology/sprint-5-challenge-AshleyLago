async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  // npm test claims that I failed because the current year is not 2023, fix if necessary

// Task 1: Import data from learners and mentors
  let urlL = `http://localhost:3003/api/learners`;
  const resL = await axios.get(urlL);
  let urlM = `http://localhost:3003/api/mentors`;
  const resM = await axios.get(urlM);
// Task 1

// Task 2: Combine learners and mentors into a new array
  let resLM = [];
  resL.data.forEach(idx => {
    let tempArr = [];

    for (let i in idx.mentors) {
      resM.data.forEach(inx => {
        if (inx.id === idx.mentors[i]) {
          let fixName = `${inx.firstName} ${inx.lastName}`
          tempArr.push(fixName);
        }
      })
    }

    resLM.push({
      "id": idx.id,
      "fullName": idx.fullName,
      "email": idx.email,
      "mentors": tempArr
    });

  })
// Task 2
  
// Task 3: Create a function for building cards
  function buildCard(learner) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const nameh3 = document.createElement("h3");
    nameh3.textContent = learner.fullName;

    const emaildiv = document.createElement("div");
    emaildiv.textContent = learner.email;

    const mentorh4 = document.createElement("h4");
    mentorh4.classList.add('closed');
    mentorh4.textContent = "Mentors";


    const mentorsul = document.createElement("ul");

    for (let i = 0; i < learner.mentors.length; i++) {
      const mentorli = document.createElement("li");
      mentorli.textContent = learner.mentors[i];
      mentorsul.appendChild(mentorli);
    }

    [nameh3,emaildiv,mentorh4,mentorsul].forEach(i => {
      card.appendChild(i)
    });

    
// Task 5: Adding the card behavior (evt.target.closest("h4"))
    card.addEventListener("click", evt => {
      const clickedCard = evt.target.closest(".card");
      if (!clickedCard.classList.contains("selected")) {
        card.classList.toggle("selected");
      }
      else if (!(evt.target.closest("h4"))) {
        card.classList.toggle("selected");
      }
      if (card.classList.contains("selected")) {
        nameh3.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else {
        nameh3.textContent = learner.fullName;
      }
    })

    mentorh4.addEventListener("click", evt => {
      mentorh4.classList.toggle("closed");
      mentorh4.classList.toggle("open");
    })
// Task 5

    return card;
  }
// Task 3

// Task 6: Change the selected learner text
  function selectedLearnerInfo() {
    const selectedCards = document.querySelectorAll(".card.selected");
    const infop= document.querySelector(".info");
    
    if (selectedCards.length > 0) {
      const selectedLearner = selectedCards[0].querySelector("h3").textContent.split(", ")[0];
      infop.textContent = `The selected learner is ${selectedLearner}`;
    } else {
      infop.textContent = "No learner is selected";
    }
  }
// Task 6

// Task 4: Calling the function
  resLM.forEach(learner => {
    const learnerCard = buildCard(learner);
    document.querySelector(".cards").appendChild(learnerCard);
  })
// Task 4

  document.querySelector(".info").textContent = "No learner is selected"; // Task 6

// Task 5
  document.addEventListener("click", evt => {
    const clickedCard = evt.target.closest(".card");
    if (clickedCard) {
      document.querySelectorAll(".card").forEach(card => {
        if (card !== clickedCard) {
          card.classList.remove("selected");
          const nameh3 = card.querySelector("h3");
          nameh3.textContent = nameh3.textContent.split(", ")[0];
        }
      });
      selectedLearnerInfo(); // Task 6
    }
  });
// Task 5

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()

