document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rollButton").addEventListener("click", () => {
        const numRolls = parseInt(document.getElementById("rollingMethod").value);
        const myChar = new Character(numRolls);
        const statsDisplay = document.getElementById("statsDisplay");
        statsDisplay.innerHTML = myChar.displayStats();
        statsDisplay.classList.add("show");
    });
});

class Character {
    constructor(numRolls) {
        this.abilities = [
            { name: "STR", score: 0, modifier: 0},
            { name: "DEX", score: 0, modifier: 0},
            { name: "CON", score: 0, modifier: 0},
            { name: "INT", score: 0, modifier: 0},
            { name: "WIS", score: 0, modifier: 0},
            { name: "CHA", score: 0, modifier: 0}
        ];
        this.rollStats(numRolls);
    }

    rollStat(numRolls) {
        let rolls = [];
        for (let i = 0; i < numRolls; i++) {
            rolls.push(Math.floor(Math.random() * 6) + 1);
        }
        rolls.sort((a, b) => a -b);

        if (numRolls === 4) rolls.shift(); // drops lowest roll if using 4d6

        return rolls.reduce((sum, val) => sum + val, 0);
    }

    calculateModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    rollStats(numRolls) {
        this.abilities.forEach(ability => {
            ability.score = this.rollStat(numRolls);
            ability.modifier = this.calculateModifier(ability.score);
        });
    }

    displayStats() {
        let output = "<h2>D&D Character Stats:</h2><ul>";
        this.abilities.forEach(ability => {
            output += `<li>${ability.name}: ${ability.score} (${ability.modifier >= 0 ? "+" : ""}${ability.modifier})</li>`;
        });
        output += `</ul><p>Stat total: ${this.getStatSum()} (${this.getModSum() >= 0 ? "+" : ""}${this.getModSum()})</p>`;
        return output;
    }
    
    getStatSum() {
        return this.abilities.reduce((sum, ability) => sum + ability.score, 0);
    }

    getModSum() {
        return this.abilities.reduce((sum, ability) => sum + ability.modifier, 0);
    }

    
}
