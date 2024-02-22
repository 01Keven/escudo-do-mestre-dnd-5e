// script.js

document.addEventListener("DOMContentLoaded", function() {
  const monsterList = document.getElementById("monsterList");
  const monsterDetails = document.getElementById("monsterDetails");

  fetch("https://www.dnd5eapi.co/api/monsters")
    .then(response => response.json())
    .then(data => {
      data.results.forEach(monster => {
        const monsterButton = document.createElement("button");
        monsterButton.textContent = monster.name;
        monsterButton.className = "monster-button";
        monsterButton.onclick = () => {
          fetch(`https://www.dnd5eapi.co/api/monsters/${monster.index}`)
            .then(response => response.json())
            .then(monsterData => {
              monsterDetails.innerHTML = formatMonsterData(monsterData);
            })
            .catch(error => console.error('Error fetching monster details:', error));
        };
        monsterList.appendChild(monsterButton);
      });
    })
    .catch(error => console.error('Error fetching monster list:', error));

  function formatMonsterData(monsterData) {
    let formattedData = `
      <h2>${monsterData.name}</h2>
      <img src="https://www.dnd5eapi.co${monsterData.image}" alt="${monsterData.name}">
      <p><strong>Alignment:</strong> ${monsterData.alignment}</p>
      <p><strong>Armor Class:</strong> ${formatArmorClass(monsterData.armor_class)}</p>
      <p><strong>Hit Points:</strong> ${monsterData.hit_points}</p>
      <p><strong>Hit Dice:</strong> ${monsterData.hit_dice}</p>
      <p><strong>Speed:</strong> ${formatSpeed(monsterData.speed)}</p>
      <p><strong>Strength:</strong> ${monsterData.strength}</p>
      <p><strong>Dexterity:</strong> ${monsterData.dexterity}</p>
      <p><strong>Constitution:</strong> ${monsterData.constitution}</p>
      <p><strong>Intelligence:</strong> ${monsterData.intelligence}</p>
      <p><strong>Wisdom:</strong> ${monsterData.wisdom}</p>
      <p><strong>Charisma:</strong> ${monsterData.charisma}</p>
      <p><strong>Challenge Rating:</strong> ${monsterData.challenge_rating}</p>
      <p><strong>Proficiency Bonus:</strong> ${monsterData.proficiency_bonus}</p>
      <p><strong>XP:</strong> ${monsterData.xp}</p>
      <p><strong>Actions:</strong></p>
      <ul>
    `;
    if (monsterData.actions) {
      monsterData.actions.forEach(action => {
        formattedData += `<li>${action.name}: ${action.desc}</li>`;
      });
    }
    formattedData += `</ul>`;
    return formattedData;
  }

  function formatSpeed(speed) {
    return Object.entries(speed).map(([mode, value]) => `${mode}: ${value}`).join(", ");
  }

  function formatArmorClass(armorClass) {
    if (Array.isArray(armorClass)) {
      return armorClass.map(({ value, type }) => `${value} (${type})`).join(", ");
    } else {
      return armorClass.value + " (" + armorClass.type + ")";
    }
  }
});
