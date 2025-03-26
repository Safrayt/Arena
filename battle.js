let currentReps = 5;
const minReps = 5;
const maxReps = 30;


// Получаем данные о сражении из localStorage
const battleData = JSON.parse(localStorage.getItem('battleData'));

// Проверяем, что данные загружены
if (!battleData) {
    console.error("Данные о сражении не найдены в localStorage.");
} else {
    console.log("Данные о сражении:", battleData);
}

// Элементы интерфейса
const monsterHealthBar = document.getElementById('monsterHealthBar');
const monsterHealthText = document.getElementById('monsterHealthText');
const monsterName = document.getElementById('monsterName');
const monsterLevel = document.getElementById('monsterLevel');
const monsterImage = document.getElementById('monsterImage');
const selectedExercisesList = document.getElementById('selectedExercisesList');
const exerciseSelectionList = document.getElementById('exerciseSelectionList');
const attackButton = document.getElementById('attackButton');
const returnButton = document.getElementById('returnButton');

// Проверяем, что все элементы найдены
if (!monsterHealthBar || !monsterHealthText || !monsterName || !monsterLevel || !monsterImage || !selectedExercisesList || !exerciseSelectionList || !attackButton || !returnButton) {
    console.error("Один или несколько элементов интерфейса не найдены.");
} else {
    console.log("Все элементы интерфейса найдены.");
}

// Инициализация данных монстра
let monsterHealth = battleData.enemy.health;
const monsterMaxHealth = battleData.enemy.health;

// Инициализация данных игрока
const playerExercises = battleData.selectedExercises;

// Проверяем, что упражнения загружены
if (!playerExercises) {
    console.error("Упражнения не найдены в данных о сражении.");
} else {
    console.log("Выбранные упражнения:", playerExercises);
}

// Текущее выбранное упражнение
let selectedExercise = null;

// Обновляем интерфейс с данными монстра
function updateMonsterUI() {
    monsterHealthBar.style.width = `${(monsterHealth / monsterMaxHealth) * 100}%`;
    monsterHealthText.textContent = `${monsterHealth} / ${monsterMaxHealth}`;
    monsterName.textContent = battleData.enemy.name;
    monsterLevel.textContent = `Уровень ${battleData.enemy.level || 1}`;
    monsterImage.src = battleData.enemy.image;
}

// Обновляем список выбранных упражнений
function updateSelectedExercisesUI() {
    if (!selectedExercisesList) {
        console.error("Элемент selectedExercisesList не найден.");
        return;
    }

    selectedExercisesList.innerHTML = ''; // Очищаем список перед заполнением

    for (const type in playerExercises) {
        if (playerExercises[type]) {
            const exercise = playerExercises[type];
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'selected-exercise-item';
            exerciseElement.innerHTML = `
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-damage">${exercise.damage} урона</div>
            `;
            selectedExercisesList.appendChild(exerciseElement);
        }
    }
}

// Обновляем список упражнений для выбора
function updateExerciseSelectionUI() {
    if (!exerciseSelectionList) {
        console.error("Элемент exerciseSelectionList не найден.");
        return;
    }

    exerciseSelectionList.innerHTML = ''; // Очищаем список перед заполнением

    for (const type in playerExercises) {
        if (playerExercises[type]) {
            const exercise = playerExercises[type];
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'exercise-selection-item';
            exerciseElement.innerHTML = `
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-damage">${exercise.damage} урона</div>
            `;
            exerciseElement.addEventListener('click', () => selectExercise(exercise));
            exerciseSelectionList.appendChild(exerciseElement);
        }
    }
}

// Выбор упражнения
function selectExercise(exercise) {
    selectedExercise = exercise;
    
    // Убираем выделение у всех упражнений
    document.querySelectorAll('.exercise-selection-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Выделяем выбранное упражнение
    event.currentTarget.classList.add('selected');
    
    // Показываем счётчик повторений
    document.getElementById('repsCounter').style.display = 'block';
    document.getElementById('repsValue').textContent = currentReps;
    
    // Активируем кнопку "Атаковать"
    attackButton.disabled = false;

    updateCalculatedDamage()
}

// Атака монстра
function attackMonster() {
    if (selectedExercise) {
        // Наносим урон монстру
        monsterHealth -= parseInt(selectedExercise.damage);
        if (monsterHealth < 0) monsterHealth = 0;

        // Обновляем интерфейс
        updateMonsterUI();

        // Сбрасываем выбор упражнения
        selectedExercise = null;
        document.querySelectorAll('.exercise-selection-item').forEach(item => {
            item.classList.remove('selected');
        });
        attackButton.disabled = true;

        // Проверяем, побежден ли монстр
        if (monsterHealth === 0) {
            attackButton.style.display = 'none';
            returnButton.style.display = 'block';
        }
    }
}

// Возврат на экран выбора упражнений
returnButton.addEventListener('click', () => {
    // Скрываем сообщение о победе
    document.getElementById('victoryOverlay').classList.remove('show');
    window.location.href = 'index.html';
});

// Инициализация при загрузке страницы
function init() {
    updateMonsterUI();
    updateSelectedExercisesUI();
    updateExerciseSelectionUI(); // Обновляем список упражнений для выбора
}

// Назначаем обработчик на кнопку атаки
attackButton.addEventListener('click', attackMonster);

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', init);


// Добавляем звук удара
const attackSound = new Audio('sounds/attack.mp3'); // Укажите путь к звуковому файлу

function attackMonster() {
    if (selectedExercise) {
        // Рассчитываем урон с учётом повторений
        const baseDamage = parseInt(selectedExercise.damage);
        const damageMultiplier = currentReps / minReps; // 5 повторений = 1x, 10 = 2x и т.д.
        const totalDamage = Math.floor(baseDamage * damageMultiplier);
        
        // Наносим урон монстру
        monsterHealth -= totalDamage;
        if (monsterHealth < 0) monsterHealth = 0;

        // Обновляем интерфейс
        updateMonsterUI();

        // Добавляем анимацию удара
        const monsterImageElement = document.querySelector('.monster-image img');
        monsterImageElement.classList.add('monster-hit');

        // Убираем анимацию после завершения
        monsterImageElement.addEventListener('animationend', () => {
            monsterImageElement.classList.remove('monster-hit');
        }, { once: true });

        // Сбрасываем выбор упражнения и скрываем счётчик
        selectedExercise = null;
        document.querySelectorAll('.exercise-selection-item').forEach(item => {
            item.classList.remove('selected');
        });
        document.getElementById('repsCounter').style.display = 'none';
        attackButton.disabled = true;
        currentReps = minReps; // Сбрасываем счётчик

        // Проверяем, побежден ли монстр
        if (monsterHealth === 0) {
            attackButton.style.display = 'none';
            returnButton.style.display = 'block';
            
            const victoryOverlay = document.getElementById('victoryOverlay');
            victoryOverlay.classList.add('show');
            
            // Запускаем конфетти
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            
            // Начинаем скрывать через 4 секунды
            setTimeout(() => {
                victoryOverlay.classList.add('hide');
                
                // Полностью убираем через 1 секунду анимации
                setTimeout(() => {
                    victoryOverlay.classList.remove('show', 'hide');
                }, 1000);
            }, 3000);
        }
    }
}

function updateCalculatedDamage() {
    if (selectedExercise) {
        const baseDamage = parseInt(selectedExercise.damage);
        const damageMultiplier = currentReps / minReps;
        const totalDamage = Math.floor(baseDamage * damageMultiplier);
        document.getElementById('calculatedDamage').textContent = totalDamage;
    }
}

// Вызываем эту функцию при выборе упражнения и изменении счётчика



document.getElementById('increaseReps').addEventListener('click', () => {
    if (currentReps < maxReps) {
        currentReps++;
        document.getElementById('repsValue').textContent = currentReps;
        updateCalculatedDamage()
    }
});

document.getElementById('decreaseReps').addEventListener('click', () => {
    if (currentReps > minReps) {
        currentReps--;
        document.getElementById('repsValue').textContent = currentReps;
        updateCalculatedDamage()
    }
});





