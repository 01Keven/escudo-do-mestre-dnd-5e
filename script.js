var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


fetch("https://www.dnd5eapi.co/api", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");

searchButton.addEventListener("click", searchMonster);



function searchMonster() {
  const monsterName = monsterInput.value.toLowerCase().replace(/\s+/g, "-");
  if (monsterName) {
    monsterResult.innerHTML = "Searching...";
    axios
      .get(`https://www.dnd5eapi.co/api/monsters`)
      .then((response) => {
        const monsterData = response.data.results.find((monster) => monster.index === monsterName);
        if (monsterData) {
          axios
            .get(`https://www.dnd5eapi.co/api/monsters/${monsterData.index}`)
            .then((response) => {
              const monsterDetails = response.data;
              displayMonster(monsterDetails);
            })
            .catch((error) => {
              monsterResult.innerHTML = "Error fetching monster details.";
              console.log(error);
            });
        } else {
          monsterResult.innerHTML = `Monster '${monsterName}' not found.`;
        }
      })
      .catch((error) => {
        monsterResult.innerHTML = "Error fetching monster list.";
        console.log(error);
      });
  } else {
    monsterResult.innerHTML = "Please enter a monster name.";
  }
}

function displayMonster(monsterData) {
    let html = `<h2>${monsterData.name}</h2>`;
  
    // Image
    html += `<img src="https://www.dnd5eapi.co${monsterData.image}" alt="${monsterData.name}">`;
  
    // Index and name
    // html += `<p><strong>Index:</strong> ${monsterData.index}</p>`;
    html += `<p><strong>Name:</strong> ${monsterData.name}</p>`;
  
   // Size, type, and subtype
    html += `<span class="inline-block"><strong>Size:</strong> ${monsterData.size}</span>`;
    html += `<span class="inline-block"><strong>Type:</strong> ${monsterData.type}</span>`;
    html += `<span class="inline-block"><strong>Subtype:</strong> ${monsterData.subtype || "None"}</span>`;
  
    // Alignment
    html += `<p><strong>Alignment:</strong> ${monsterData.alignment}</p>`;
  
    // Armor Class
    if (monsterData.armor_class && monsterData.armor_class.length > 0) {
      html += `<p><strong>Armor Class:</strong> ${monsterData.armor_class[0].value} (${monsterData.armor_class[0].type})</p>`;
    } else {
      html += `<p><strong>Armor Class:</strong> None</p>`;
    }
  
    // Hit Points and Hit Dice
    html += `<p><strong>Hit Points:</strong> ${monsterData.hit_points}</p>`;
    html += `<p><strong>Hit Dice:</strong> ${monsterData.hit_dice}</p>`;
  
    // Speed
    if (monsterData.speed) {
      let speedHtml = '<p><strong>Speed:</strong> ';
      for (let key in monsterData.speed) {
        speedHtml += `${key}: ${monsterData.speed[key]}, `;
      }
      speedHtml = speedHtml.substring(0, speedHtml.length - 2);
      speedHtml += '</p>';
      html += speedHtml;
    } else {
      html += `<p><strong>Speed:</strong> None</p>`;
    }
  
    // Ability Scores
    html += `<p><strong>Strength:</strong> ${monsterData.strength}</p>`;
    html += `<p><strong>Dexterity:</strong> ${monsterData.dexterity}</p>`;
    html += `<p><strong>Constitution:</strong> ${monsterData.constitution}</p>`;
    html += `<p><strong>Intelligence:</strong> ${monsterData.intelligence}</p>`;
    html += `<p><strong>Wisdom:</strong> ${monsterData.wisdom}</p>`;
    html += `<p><strong>Charisma:</strong> ${monsterData.charisma}</p>`;
  
    // Proficiencies
    if (monsterData.proficiencies) {
        let proficienciesHtml = '<p><strong>Proficiencies:</strong> ';
        for (let proficiency of monsterData.proficiencies) {
          proficienciesHtml += `${proficiency.proficiency.name} (${proficiency.value}), `;
        }
        proficienciesHtml = proficienciesHtml.substring(0, proficienciesHtml.length - 2);
        proficienciesHtml += '</p>';
        html += proficienciesHtml;
      } else {
        html += `<p><strong>Proficiencies:</strong> None</p>`;
      }
  
    // Damage Vulnerabilities
    if (monsterData.damage_vulnerabilities) {
      html += `<p><strong>Damage Vulnerabilities:</strong> ${monsterData.damage_vulnerabilities.join(", ")}</p>`;
    } else {
      html += `<p><strong>Damage Vulnerabilities:</strong> None</p>`;
    }
  
    // Damage Resistances
    if (monsterData.damage_resistances) {
      html += `<p><strong>Damage Resistances:</strong> ${monsterData.damage_resistances.join(", ")}</p>`;
    } else {
      html += `<p><strong>Damage Resistances:</strong> None</p>`;
    }
  
    // Damage Immunities
    if (monsterData.damage_immunities) {
      html += `<p><strong>Damage Immunities:</strong> ${monsterData.damage_immunities.join(", ")}</p>`;
    } else {
      html += `<p><strong>Damage Immunities:</strong> None</p>`;
    }
  
    // Condition Immunities
    if (monsterData.condition_immunities) {
      html += `<p><strong>Condition Immunities:</strong> ${monsterData.condition_immunities.map(({ name }) => name).join(", ")}</p>`;
    } else {
      html += `<p><strong>Condition Immunities:</strong> None</p>`;
    }
  
    // Senses
    if (monsterData.senses) {
      let sensesHtml = '<p><strong>Senses:</strong> ';
      for (let key in monsterData.senses) {
        sensesHtml += `${key}: ${monsterData.senses[key]}, `;
      }
      sensesHtml = sensesHtml.substring(0, sensesHtml.length - 2);
      sensesHtml += '</p>';
      html += sensesHtml;
    } else {
      html += `<p><strong>Senses:</strong> None</p>`;
    }
  
    // Languages
    html += `<p><strong>Languages:</strong> ${monsterData.languages || "None"}</p>`;
  
    // Challenge Rating, Proficiency Bonus, and XP
    html += `<p><strong>Challenge Rating:</strong> ${monsterData.challenge_rating}</p>`;
    html += `<p><strong>Proficiency Bonus:</strong> ${monsterData.proficiency_bonus}</p>`;
    html += `<p><strong>XP:</strong> ${monsterData.xp}</p>`;
  
    // Special Abilities
    html += `<p><strong>Special Abilities:</strong></p>`;
    if (monsterData.special_abilities) {
      for (let specialAbility of monsterData.special_abilities) {
        let specialAbilityHtml = `<p><strong>${specialAbility.name}:</strong> ${specialAbility.desc}</p>`;
        html += specialAbilityHtml;
      }
    } else {
      html += `<p><strong>Special Abilities:</strong> None</p>`;
    }
  
    // Actions
    html += `<p><strong>Actions:</strong></p>`;
    if (monsterData.actions) {
      for (let action of monsterData.actions) {
        let actionHtml = `<p><strong>${action.name}:</strong> ${action.desc}</p>`;
        if (action.attack_bonus) {
          actionHtml += `<p>Attack Bonus: ${action.attack_bonus}</p>`;
        }
        if (action.damage) {
          let damageHtml = '<p>Damage: ';
          for (let damage of action.damage) {
            damageHtml += `${damage.damage_dice} ${damage.damage_type.name}, `;
          }
          damageHtml = damageHtml.substring(0, damageHtml.length - 2);
          damageHtml += '</p>';
          actionHtml += damageHtml;
        }
        html += actionHtml;
      }
    } else {
      html += `<p><strong>Actions:</strong> None</p>`;
    }
  
    // Legendary Actions
    html += `<p><strong>Legendary Actions:</strong></p>`;
    if (monsterData.legendary_actions) {
      for (let legendaryAction of monsterData.legendary_actions) {
        let legendaryActionHtml = `<p><strong>${legendaryAction.name}:</strong> ${legendaryAction.desc}</p>`;
        if (legendaryAction.attack_bonus) {
          legendaryActionHtml += `<p>Attack Bonus: ${legendaryAction.attack_bonus}</p>`;
        }
        if (legendaryAction.damage) {
          let damageHtml = '<p>Damage: ';
          for (let damage of legendaryAction.damage) {
            damageHtml += `${damage.damage_dice} ${damage.damage_type.name}, `;
          }
          damageHtml = damageHtml.substring(0, damageHtml.length - 2);
          damageHtml += '</p>';
          legendaryActionHtml += damageHtml;
        }
        html += legendaryActionHtml;
      }
    } else {
      html += `<p><strong>Legendary Actions:</strong> None</p>`;
    }
  
    monsterResult.innerHTML = html;
  }
