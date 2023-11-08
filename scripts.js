// Set up the game objects
const player = {
  health: 100,
  attackDamage: 5,
  defense: 3,
  speed: 5,
  gold: 0,
  level: 1,
  swordLevel: 1,
};

const enemy = {
  health: 50,
  attackDamage: 2,
  defense: 1,
  speed: 2,
  money: 10,
};

const upgradeSword = {
  damageIncrease: 2,
  cost: 50,
};

// Function to calculate damage dealt to enemy
function dealDamage(playerAttack) {
  const damageDealt = playerAttack - enemy.defense;
  return damageDealt;
}

// Function to calculate damage dealt to player
function takeDamage() {
  const damageTaken = enemy.attackDamage - player.defense;
  return damageTaken;
}

// Function to check if player has won
function checkWin() {
  if (enemy.health <= 0) {
    alert("You Win!");
    return true;
  } else {
    return false;
  }
}

// Function to check if player has lost
function checkLoss() {
  if (player.health <= 0) {
    alert("Game Over!");
    return true;
  } else {
    return false;
  }
}

// Function to handle player attacks
function playerAttacks() {
  const attack = parseInt(prompt(`Enter attack strength (${player.swordLevel}):`));
  const damageDealt = dealDamage(attack);
  enemy.health -= damageDealt;
  player.gold += enemy.money;
  player.level++;
  if (enemy.level > 1 && player.level % 2 === 0) {
    enemy.health += 50;
    enemy.attackDamage += 1;
    enemy.defense += 1;
  }
  updateDisplay();
}

// Function to handle enemy attacks
function enemyAttacks() {
  const damageDealt = takeDamage();
  player.health -= damageDealt;
  updateDisplay();
}

// Function to update display
function updateDisplay() {
  document.getElementById("playerHealth").innerText = `${player.health}/100`;
  document.getElementById("enemyHealth").innerText = `${enemy.health}/50`;
  document.getElementById("playerLevel").innerText = `Level ${player.level}`;
  document.getElementById("enemyLevel").innerText = `Level ${enemy.level}`;
  document.getElementById("playerGold").innerText = `Gold: ${player.gold}`;
}

// Main game loop
while (true) {
  playerAttacks();
  enemyAttacks();
  if (checkWin()) break;
  if (checkLoss()) break;
  updateDisplay();
}

// Upgrade sword function
function upgradeSword() {
  if (player.gold >= upgradeSword.cost) {
    player.attackDamage += upgradeSword.damageIncrease;
    player.swordLevel++;
    alert(`Your sword has been upgraded to level ${player.swordLevel}!`);
  } else {
    alert("Not enough gold.");
  }
}

// Check for keyboard input
document.onkeydown = event => {
  switch (event.key) {
    case "ArrowUp":
      playerAttacks();
      break;
    case "ArrowDown":
      enemyAttacks();
      break;
    case "Space":
      upgradeSword();
      break;
    default:
      break;
  }
};
