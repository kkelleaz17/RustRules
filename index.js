const pictureNumber = Math.floor((Math.random()*5)+1)
const wipeForce = document.getElementById('nextWipe')
const body = document.body
var currentPicture = document.getElementsByClassName('p'+pictureNumber)[0];

console.log(currentPicture)

currentPicture.style.display = 'flex'


async function FetchRules() {
    const data = (await fetch('./Rules.txt')).text();
    const rules = await JSON.parse(await data);
    for(let i = 0; i < rules.length; i++){
        body.innerHTML += `<h2>${i+1}. ${rules[i]}</h2>`   
    }

    console.log(rules)
}

function getDaysUntilForceWipe() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
  
   
    const firstDayOfMonth = new Date(year, month, 1);
  
    const firstThursday = new Date(firstDayOfMonth);
    firstThursday.setDate(
      firstDayOfMonth.getDate() + ((4 - firstDayOfMonth.getDay() + 7) % 7)
    );
  
    const differenceInTime = firstThursday - currentDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  
    if (differenceInDays < 0) {
      const firstDayOfNextMonth = new Date(year, month + 1, 1);
      const firstThursdayNextMonth = new Date(firstDayOfNextMonth);
      firstThursdayNextMonth.setDate(
        firstDayOfNextMonth.getDate() + ((4 - firstDayOfNextMonth.getDay() + 7) % 7)
      );
      const nextDifferenceInTime = firstThursdayNextMonth - currentDate;
      const nextDifferenceInDays = Math.ceil(nextDifferenceInTime / (1000 * 60 * 60 * 24));
      return `${nextDifferenceInDays} days until force wipe`;
    }
  
    return `${differenceInDays} days until force wipe`;
  }
  
  console.log(getDaysUntilForceWipe());
  
  wipeForce.innerHTML = getDaysUntilForceWipe()

FetchRules()