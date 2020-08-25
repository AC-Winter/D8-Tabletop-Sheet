function onLoad() {}

function setPage(button) {
  const page = button.value;
  const tab = document.getElementById(page + "-tab");
  if (tab) {
    for (var b of document.getEelemntsByClassName("tab-button")) {
      b.diabled = "false";
    }
    for (var t of document.getElementsByClassName("tab")) {
      t.style.display = "none";
    }
    tab.style.display = "block";
    button.disabled = "true";
  }
}

function updateRacialBonuses(selector) {
  const subrace = getSelectedOption(selector).value;
}

function updateRaceTraits(selector) {
  populateSubraces(selector);
  setCharacterSize(selector);
}

function setCharacterSize(selector) {
  const race = getSelectedOption(selector).value;
  let size;
  if (race == "human") {
    size = "Medium";
    setBioLimits(140, 210, 45, 150, 18, 120);
  } else if (race == "sylph") {
    size = "Medium";
    setBioLimits(160, 250, 40, 120, 32, 600);
  } else if (race == "giantkin") {
    size = "Large";
    setBioLimits(240, 320, 100, 180, 12, 80);
  } else if (race == "sveln") {
    size = "Small";
    setBioLimits(90, 150, 30, 60, 44, 800);
  } else if (race == "asendrii") {
    size = "Medium";
    setBioLimits(120, 180, 60, 120, 20, 160);
  } else if (race == "anarathi") {
    size = "Medium";
    setBioLimits(180, 260, 50, 75, 16, 225);
  } else if (race == "sota-ka") {
    size = "Medium";
    setBioLimits(150, 230, 50, 140, 37, 99999);
  } else {
    size = "Medium";
    setBioLimits(140, 210, 45, 150, 20, 200);
  }
  document.getElementById("character-size").value = size;
}

function setBioLimits(
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  minAge,
  maxAge
) {
  const heightInput = document.getElementById("character-height");
  const weightInput = document.getElementById("character-weight");
  const ageInput = document.getElementById("character-age");

  heightInput.min = minHeight;
  heightInput.max = maxHeight;
  weightInput.min = minWeight;
  weightInput.max = maxWeight;
  ageInput.min = minAge;
  ageInput.max = maxAge;
}

function populateSubraces(selector) {
  const subraceSelector = document.getElementById("subrace-selector");
  removeOptions(subraceSelector);

  const race = getSelectedOption(selector).value;
  let subraceLabelList;
  let subraceValueList;
  if (race == "human") {
    subraceLabelList = ["Canthan", "Elonian", "Tyrian"];
    subraceValueList = ["canthan", "elonian", "tyrian"];
  } else if (race == "sylph") {
    subraceLabelList = [
      "Llevela (Forest)",
      "Ytria (Snow)",
      "Korrina (Sand)",
      "Maelina (Sun)",
      "Urmeba (Night)"
    ];
    subraceValueList = [
      "forest-elf",
      "snow-elf",
      "sand-elf",
      "sun-elf",
      "night-elf"
    ];
  } else if (race == "giantkin") {
    subraceLabelList = ["Jotun"];
    subraceValueList = ["jotun"];
  } else if (race == "sveln") {
    subraceLabelList = [
      "Svelgnar (Gnome)",
      "Svelenjir (Halfling)",
      "Svelvaben (Dwarf)"
    ];
    subraceValueList = ["gnome", "halfling", "dwarf"];
  } else if (race == "asendrii") {
    subraceLabelList = ["Chaos", "Order", "Purity", "Corruption"];
    subraceValueList = ["chaos", "order", "purity", "corruption"];
  } else {
    subraceLabelList = [race];
    const raceValue = race.toLowerCase();
    subraceValueList = [raceValue];
  }
  for (var ix = 0; ix < subraceLabelList.length; ix++) {
    var opt = document.createElement("option");
    opt.label = subraceLabelList[ix];
    opt.value = subraceValueList[ix];
    subraceSelector.appendChild(opt);
  }
}

function updateModifiers() {
  var blockList = document.getElementsByClassName("ability-block");
  var block;
  for (block of blockList) {
    var abilityScore = block.getElementsByClassName("ability-score")[0].value;
    var abilityMod = Math.floor(Math.sqrt(abilityScore) - 6);
    block.getElementsByClassName("ability-mod")[0].value = abilityMod;
  }
  updatedWeightedAbilities();
  updateSkills();
  updateDefenses();
}

function updatedWeightedAbilities() {
  var weight = parseInt(document.getElementById("weight-total").value);

  var dexterityBlock = document.getElementsByClassName("dexterity")[0];
  var dexScore = parseInt(
    dexterityBlock.getElementsByClassName("ability-score")[0].value
  );
  var dexModWeighted = parseInt(
    Math.floor(Math.sqrt(Math.max(dexScore - weight / 2, 0)) - 6)
  );
  document.getElementById("dexterityModWeighted").value = dexModWeighted;

  var enduranceBlock = document.getElementsByClassName("endurance")[0];
  var endScore = parseInt(
    enduranceBlock.getElementsByClassName("ability-score")[0].value
  );
  var endModWeighted = parseInt(
    Math.floor(Math.sqrt(Math.max(endScore - weight, 0)) - 6)
  );
  document.getElementById("enduranceModWeighted").value = endModWeighted;

  var arcanaBlock = document.getElementsByClassName("arcana")[0];
  var acaScore = parseInt(
    arcanaBlock.getElementsByClassName("ability-score")[0].value
  );
  var acaModWeighted = parseInt(
    Math.floor(Math.sqrt(Math.max(acaScore - weight * 2, 0)) - 6)
  );
  document.getElementById("arcanaModWeighted").value = acaModWeighted;
}

function isCustomArmor() {
  if (document.getElementById("custom-armor-check").checked == true) {
    document.getElementById("armor-selector").style.display = "none";
    document.getElementById("custom-armor").style.display = "block";
    const armorValues = document.getElementsByClassName("armor-value");
    for (const armorValue of armorValues) {
      armorValue.readOnly = false;
    }
  } else {
    document.getElementById("armor-selector").style.display = "block";
    document.getElementById("custom-armor").style.display = "none";
    const armorValues = document.getElementsByClassName("armor-value");
    for (const armorValue of armorValues) {
      armorValue.readOnly = true;
    }
  }
  equipArmor();
}

function isCustomShield() {
  if (document.getElementById("custom-shield-check").checked == true) {
    document.getElementById("shield-selector").style.display = "none";
    document.getElementById("custom-shield").style.display = "block";
    const shieldValues = document.getElementsByClassName("shield-value");
    for (const shieldValue of shieldValues) {
      shieldValue.readOnly = false;
    }
  } else {
    document.getElementById("shield-selector").style.display = "block";
    document.getElementById("custom-shield").style.display = "none";
    const shieldValues = document.getElementsByClassName("shield-value");
    for (const shieldValue of shieldValues) {
      shieldValue.readOnly = true;
    }
    equipShield();
  }
}

function equipArmor() {
  var equippedArmor = document.getElementById("armor-selector");
  var armor = getSelectedOption(equippedArmor);
  var armorType = armor.parentNode.label;
  var av = parseInt(armor.getAttribute("av")) | 0;
  var dv = parseInt(armor.getAttribute("dv")) | 0;
  var wv = parseInt(armor.getAttribute("wv")) | 0;
  if (
    document.getElementById("armor-mastery-simple").checked &&
    armorType == "Simple Armor"
  ) {
    wv = parseInt(wv / 2);
  } else if (
    document.getElementById("armor-mastery-advanced").checked &&
    armorType == "Advanced Armor"
  ) {
    wv = parseInt(wv / 2);
  } else if (
    document.getElementById("armor-mastery-unique").checked &&
    armorType == "Unique Armor"
  ) {
    wv = parseInt(wv / 2);
  }
  document.getElementById("armorAv").value = av;
  document.getElementById("armorDv").value = dv;
  document.getElementById("armorWv").value = wv;
  updateDefenses();
}

function equipShield() {
  var equippedShield = document.getElementById("shield-selector");
  var shield = getSelectedOption(equippedShield);
  var shieldType = shield.parentNode.label;
  var av = parseInt(shield.getAttribute("av")) | 0;
  var wv = parseInt(shield.getAttribute("wv")) | 0;
  if (
    document.getElementById("shield-mastery-simple").checked &&
    shieldType == "Simple Armor"
  ) {
    wv = parseInt(wv / 2);
  } else if (
    document.getElementById("shield-mastery-advanced").checked &&
    shieldType == "Advanced Armor"
  ) {
    wv = parseInt(wv / 2);
  } else if (
    document.getElementById("shield-mastery-unique").checked &&
    shieldType == "Unique Armor"
  ) {
    wv = parseInt(wv / 2);
  }
  document.getElementById("shieldAv").value = av;
  document.getElementById("shieldWv").value = wv;
  occupyOffhand(wv >= 1);
  updateDefenses();
}

function occupyOffhand(bool) {
  if (bool == true) {
    const weaponSlot = document.getElementById("secondary-weapon");
    weaponSlot.getElementsByClassName("weapon-equip")[0].disabled = true;
    weaponSlot.getElementsByClassName("weapon-unequip")[0].disabled = true;
    unequipWeapon("secondary");
  } else {
    const weaponSlot = document.getElementById("secondary-weapon");
    weaponSlot.getElementsByClassName("weapon-equip")[0].disabled = false;
    weaponSlot.getElementsByClassName("weapon-unequip")[0].disabled = false;
  }
}

function updateDefenses() {
  var armorAv = parseInt(document.getElementById("armorAv").value) | 0;
  var armorDv = parseInt(document.getElementById("armorDv").value) | 0;
  var armorWv = parseInt(document.getElementById("armorWv").value) | 0;
  var shieldAv = parseInt(document.getElementById("shieldAv").value) | 0;
  var shieldWv = parseInt(document.getElementById("shieldWv").value) | 0;

  occupyOffhand(shieldWv >= 1);
  var weight = armorWv + shieldWv;
  document.getElementById("weight-total").value = weight;
  updatedWeightedAbilities();

  var dexMod =
    parseInt(document.getElementById("dexterityModWeighted").value) | 0;
  var endMod =
    parseInt(document.getElementById("enduranceModWeighted").value) | 0;
  var acaMod = parseInt(document.getElementById("arcanaModWeighted").value) | 0;
  var intMod = parseInt(document.getElementById("intelligenceMod").value) | 0;
  var strMod = parseInt(document.getElementById("strengthMod").value) | 0;
  var ftdMod = parseInt(document.getElementById("fortitudeMod").value) | 0;

  var armor = Math.max(dexMod + endMod + armorAv + shieldAv, 0);
  var armorFlat = Math.min(Math.max(endMod + armorAv, 0), armor);
  var resist = Math.max(acaMod + intMod + shieldAv, 0);
  var resistFlat = Math.min(Math.max(acaMod, 0), resist);
  var defense = Math.max(strMod + ftdMod + armorDv, 0);
  var defenseFlat = Math.min(Math.max(ftdMod + armorDv, 0), defense);
  document.getElementById("armor-total").value = armor;
  document.getElementById("armor-flat").value = armorFlat;
  document.getElementById("resist-total").value = resist;
  document.getElementById("resist-flat").value = resistFlat;
  document.getElementById("defense-total").value = defense;
  document.getElementById("defense-total-half").value = Math.floor(defense / 2);
  document.getElementById("defense-flat").value = defenseFlat;
  document.getElementById("defense-flat-half").value = Math.floor(
    defenseFlat / 2
  );
}

function updateSkills() {
  var blockList = document.getElementsByClassName("skill-block");
  var block;
  for (block of blockList) {
    var skillExperience = block.getElementsByClassName("skill-experience")[0]
      .value;
    var skillBonus =
      Math.floor(Math.sqrt(skillExperience)) +
      getParentAbilityMod(block) +
      getParentSkillMod(block);
    block.getElementsByClassName("skill-bonus")[0].value = skillBonus | 0;
  }
}

function getWeaponClass() {
  const options = document.querySelectorAll('input[name="weapon-class"]');
  let weaponClass;
  for (const option of options) {
    if (option.checked) {
      weaponClass = option.value;
      break;
    }
  }
  return document.getElementById(weaponClass + "-weapon-selector");
}

function setWeaponClass() {
  const weaponSelectors = document.getElementsByClassName("weapon-selector");
  for (const selector of weaponSelectors) {
    selector.style.display = "none";
  }
  const weaponClassSelector = getWeaponClass();
  if (weaponClassSelector) {
    weaponClassSelector.style.display = "block";
  }
  lookupWeapon();
}

function lookupWeapon() {
  const lookupBlock = document.getElementById("weapon-lookup");
  if (lookupBlock) {
    const selectedWeapon = getSelectedOption(getWeaponClass());

    const attackBonus =
      "(" +
      selectedWeapon.getAttribute("attack-bonus-1") +
      "/" +
      selectedWeapon.getAttribute("attack-bonus-2") +
      ")";
    lookupBlock.getElementsByClassName(
      "attack-bonus"
    )[0].textContent = attackBonus;
    lookupBlock.getElementsByClassName(
      "damage-die"
    )[0].textContent = selectedWeapon.getAttribute("damage-die");
    lookupBlock.getElementsByClassName(
      "damage-type"
    )[0].textContent = selectedWeapon.getAttribute("damage-type");
    lookupBlock.getElementsByClassName("critical-bonus")[0].textContent =
      "+" + selectedWeapon.getAttribute("critical-bonus");
    lookupBlock.getElementsByClassName(
      "weapon-class"
    )[0].textContent = selectedWeapon.getAttribute("weapon-type");

    var properties = selectedWeapon.getAttribute("keywords").split(", ");
    // lookupBlock.getElementByClassName("is-2h")[0].textContent = properties.includes("2H")
    // lookupBlock.getElementByClassName("versatile-die")[0].textContent = 0
  }
}

function equipWeapon(slot) {
  let equipBlock;
  if (slot == "primary") {
    equipBlock = document.getElementById("primary-weapon");
  } else if (slot == "secondary") {
    equipBlock = document.getElementById("secondary-weapon");
  }
  if (equipBlock) {
    const selectedWeapon = getSelectedOption(getWeaponClass());

    // var properties = selectedWeapon.getAttribute("keywords").split(', ');
    // const is2h = properties.includes("2H")
    // if (is2h == true) {
    //   if (slot == "primary") {
    //     occupyOffhand(true)
    //   } else if (slot == "secondary") {
    //     return
    //   }
    // } else {
    //   if (slot == "primary") {
    //     occupyOffhand(false)
    //   } else if (slot == "secondary") {
    //     break;
    //   }
    // }
    // equipBlock.getElementByClassName("is-2h")[0].checked = is2h
    // equipBlock.getElementByClassName("versatile-die")[0].textContent = 0

    equipBlock.getElementsByClassName("weapon-name")[0].textContent =
      selectedWeapon.value;
    const attackBonus =
      "(" +
      selectedWeapon.getAttribute("attack-bonus-1") +
      "/" +
      selectedWeapon.getAttribute("attack-bonus-2") +
      ")";
    equipBlock.getElementsByClassName(
      "attack-bonus"
    )[0].textContent = attackBonus;
    equipBlock.getElementsByClassName(
      "damage-die"
    )[0].textContent = selectedWeapon.getAttribute("damage-die");
    equipBlock.getElementsByClassName(
      "damage-type"
    )[0].textContent = selectedWeapon.getAttribute("damage-type");
    equipBlock.getElementsByClassName("critical-bonus")[0].textContent =
      "+" + selectedWeapon.getAttribute("critical-bonus");
    equipBlock.getElementsByClassName(
      "weapon-class"
    )[0].textContent = selectedWeapon.getAttribute("weapon-type");

    equipBlock.getElementsByClassName("weapon-attack-roll")[0].disabled = false;
    equipBlock.getElementsByClassName(
      "weapon-critical-roll"
    )[0].disabled = false;
    equipBlock.getElementsByClassName("weapon-damage-roll")[0].disabled = false;
  }
}

function unequipWeapon(slot) {
  let equipBlock;
  if (slot == "primary") {
    equipBlock = document.getElementById("primary-weapon");
  } else if (slot == "secondary") {
    equipBlock = document.getElementById("secondary-weapon");
  }
  if (equipBlock) {
    equipBlock.getElementsByClassName("weapon-name")[0].textContent = "None";
    equipBlock.getElementsByClassName("attack-bonus")[0].textContent = "(0/0)";
    equipBlock.getElementsByClassName("damage-die")[0].textContent = "d0";
    equipBlock.getElementsByClassName("damage-type")[0].textContent = "-";
    equipBlock.getElementsByClassName("critical-bonus")[0].textContent = "0";
    equipBlock.getElementsByClassName("weapon-class")[0].textContent = "-";
    equipBlock.getElementsByClassName("weapon-keywords")[0].textContent = "";

    equipBlock.getElementsByClassName("weapon-attack-roll")[0].disabled = true;
    equipBlock.getElementsByClassName(
      "weapon-critical-roll"
    )[0].disabled = true;
    equipBlock.getElementsByClassName("weapon-damage-roll")[0].disabled = true;

    // equipBlock.getElementByClassName("is-2h")[0].textContent = properties.includes("2H")
    // equipBlock.getElementByClassName("versatile-die")[0].textContent = 0
  }
}

function getSelectedOption(sel) {
  var opt;
  for (var i = 0, len = sel.options.length; i < len; i++) {
    opt = sel.options[i];
    if (opt.selected === true) {
      break;
    }
  }
  return opt;
}

function getParentAbilityMod(block) {
  var parentAbility = block.getAttribute("parent-ability");
  if (parentAbility == "Strength") {
    return parseInt(document.getElementById("strengthMod").value);
  } else if (parentAbility == "Dexterity") {
    return parseInt(document.getElementById("dexterityMod").value);
  } else if (parentAbility == "Fortitude") {
    return parseInt(document.getElementById("fortitudeMod").value);
  } else if (parentAbility == "Endurance") {
    return parseInt(document.getElementById("enduranceMod").value);
  } else if (parentAbility == "Intelligence") {
    return parseInt(document.getElementById("intelligenceMod").value);
  } else if (parentAbility == "Wisdom") {
    return parseInt(document.getElementById("wisdomMod").value);
  } else if (parentAbility == "Arcana") {
    return parseInt(document.getElementById("arcanaMod").value);
  } else if (parentAbility == "Cunning") {
    return parseInt(document.getElementById("cunningMod").value);
  } else {
    return 0;
  }
}

function getParentSkillMod(block) {
  var parentSkill = block.getAttribute("parent-skill");
  if (parentSkill !== "") {
    return parseInt(document.getElementById(parentSkill).value) | 0;
  }
  return 0;
}

function removeOptions(selectElement) {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}
