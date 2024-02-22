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
    <div id="wrp-pagecontent" class="wrp_pagecontent_hidden">
      <table id="table-pagecontent" class="table_w_100">
        
      <tr>
        <th class="border"></th>
      </tr>
      
      <tr>
        <th class="th_name">
          <h1 class="monster_name">${monsterData.name}</h1>
        </th>
      </tr>

      <img src="https://www.dnd5eapi.co${monsterData.image}" alt="${monsterData.name}">
      
      <tr>
        <td>
          <div class="mon_size_type_sub_align">
            <strong>Size:</strong> ${monsterData.size}
            <strong>Type:</strong> ${monsterData.type}
            <strong>Subtype:</strong> ${monsterData.subtype}
            <strong>Alignment:</strong> ${monsterData.alignment}
          </div>
        </td>
      </tr>
      
      <tr>
        <th class="divider"></th>
      </tr>
      
      <tr>
        <td>
            <strong>Armor Class:</strong> ${formatArmorClass(monsterData.armor_class)}
        </td>
      </tr>

      <tr>
        <td>
            <strong>Hit Points:</strong> ${monsterData.hit_points} (${monsterData.hit_dice})
        </td>
      </tr>

      <tr>
        <td>
          <strong>Speed:</strong> ${formatSpeed(monsterData.speed)}
        </td>
      </tr>

      <tr>
        <th class="divider"></th>
      </tr>

      <tr>
        <th class="atr_text">
          <strong>Str</strong>
        </th>
        <th class="atr_text">
          <strong>Dex</strong>
        </th>
        <th class="atr_text">
          <strong>Con</strong>
        </th>
        <th class="atr_text">
          <strong>Int</strong>
        </th>
        <th class="atr_text">
          <strong>Wis</strong>
        </th>
        <th class="atr_text">
          <strong>Cha</strong>
        </th>
      </tr>

      <tr>
        <td>${monsterData.strength}</td>
        <td>${monsterData.dexterity}</td>
        <td>${monsterData.constitution}</td>
        <td>${monsterData.intelligence}</td>
        <td>${monsterData.wisdom}</td>
        <td>${monsterData.charisma}</td>
      </tr>

      <tr>
        <th class="divider"></th>
      </tr>
      
      <tr>
        <td>
          <strong>Proficiencies:</strong> ${formatProficiencies(monsterData.proficiencies)}
        </td>
      </tr>
      
      <tr>
        <td>
          <strong>Special Abilities:</strong>
          <ul>
            ${monsterData.special_abilities.map(ability => `<li>${ability.name}: ${ability.desc}</li>`).join('')}
          </ul>
        </td>
      </tr>
      
      <tr>
        <td>
          <strong>Actions:</strong>
          <ul>
            ${monsterData.actions.map(action => `<li>${action.name}: ${action.desc}</li>`).join('')}
          </ul>
        </td>
      </tr>
      
      <tr>
        <td>
          <strong>Legendary Actions:</strong>
          <ul>
            ${monsterData.legendary_actions.map(action => `<li>${action.name}: ${action.desc}</li>`).join('')}
          </ul>
        </td>
      </tr>
      
      </table>
      </div>`;
    return formattedData;
  }

  function formatSpeed(speed) {
    return Object.entries(speed).map(([mode, value]) => `(${mode}) ${value}`).join(", ");
  }

  function formatArmorClass(armorClass) {
    if (Array.isArray(armorClass)) {
      return armorClass.map(({ value, type }) => `${value} (${type})`).join(", ");
    } else {
      return armorClass.value + " (" + armorClass.type + ")";
    }
  }

  function formatProficiencies(proficiencies) {
    const proficiencyGroups = {};
  
    // Agrupa proficiências pelo nome
    proficiencies.forEach(proficiency => {
      const name = proficiency.proficiency.name;
      const value = proficiency.value;
  
      if (!proficiencyGroups[name]) {
        proficiencyGroups[name] = [];
      }
  
      proficiencyGroups[name].push(value);
    });
  
    // Formata os grupos de proficiências
    return Object.entries(proficiencyGroups).map(([name, values]) => {
      const formattedName = name.startsWith('Skill:') ? name.replace('Skill: ', '') : name.replace('Saving Throw: ', '');
      const formattedValues = values.map(value => value > 0 ? `+${value}` : value);
      return `<span>${formattedName}: ${formattedValues.join(', ')}</span>`;
    }).join(' ');
  }  
  
});
