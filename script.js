// Отслеживание выбранных упражнений
const selectedExercises = {
    pullups: null,
    pushups: null,
    squats: null,
    abs: null
};

function selectExercise(element) {
    const type = element.dataset.type;
    const level = element.dataset.level;
    const damage = element.dataset.damage;
    const name = element.dataset.name;
    
    // Снимаем выделение со всех упражнений этого типа
    document.querySelectorAll(`.exercise-item[data-type="${type}"]`).forEach(item => {
        item.classList.remove('selected');
    });
    
    // Выделяем выбранное упражнение
    element.classList.add('selected');
    
    // Запоминаем выбор
    selectedExercises[type] = {
        level: level,
        damage: damage,
        name: name
    };
    
    // Обновляем плашку с выбранными упражнениями
    updateSelectedExercisesPanel();
    
    // Проверяем, все ли типы упражнений выбраны
    updateStartButton();
}

function updateSelectedExercisesPanel() {
    const panel = document.getElementById('selectedExercisesPanel');
    const list = document.getElementById('selectedExercisesList');
    const totalDamageValue = document.getElementById('totalDamageValue');
    
    // Очищаем список
    list.innerHTML = '';
    
    // Подсчитываем общий урон
    let totalDamage = 0;
    let hasSelected = false;
    
    // Добавляем выбранные упражнения в список
    for (const type in selectedExercises) {
        if (selectedExercises[type]) {
            hasSelected = true;
            const exercise = selectedExercises[type];
            const damage = parseInt(exercise.damage);
            totalDamage += damage;
            
            // Создаем элемент для упражнения
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'selected-exercise-item';
            exerciseElement.innerHTML = `
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-damage">${damage} урона</div>
            `;
            
            list.appendChild(exerciseElement);
        }
    }
    
    // Обновляем общий урон
    totalDamageValue.textContent = totalDamage;
    
    // Показываем или скрываем панель
    if (hasSelected) {
        panel.classList.add('visible');
    } else {
        panel.classList.remove('visible');
    }
}

function updateStartButton() {
    const startButton = document.getElementById('startBattle');
    const allSelected = Object.values(selectedExercises).every(value => value !== null);
    
    if (allSelected) {
        startButton.classList.add('active');
        startButton.disabled = false;
    } else {
        startButton.classList.remove('active');
        startButton.disabled = true;
    }
}

// Обработчик нажатия на кнопку "Начать сражение"
document.getElementById('startBattle').addEventListener('click', function() {
    if (this.classList.contains('active')) {
        // Получаем данные о выбранных упражнениях
        const battleData = {
            selectedExercises: selectedExercises,
            totalDamage: calculateTotalDamage(),
            player: playerData,
            enemy: generateEnemy()
        };
        
        // Сохраняем данные для перехода к битве
        localStorage.setItem('battleData', JSON.stringify(battleData));
        
        // Переход к экрану битвы
        window.location.href = 'battle.html';
    }
});

function calculateTotalDamage() {
    let totalDamage = 0;
    
    for (const type in selectedExercises) {
        if (selectedExercises[type]) {
            totalDamage += parseInt(selectedExercises[type].damage);
        }
    }
    
    return totalDamage;
}

function generateEnemy() {
    const totalDamage = calculateTotalDamage();
    let enemyLevel;

    if (totalDamage <= 20) {
        enemyLevel = 1; // Слабая группа монстров
    } else if (totalDamage <= 40) {
        enemyLevel = 2; // Средняя группа монстров
    } else {
        enemyLevel = 3; // Сильная группа монстров
    }

    // Фильтруем монстров по уровню
    const filteredEnemies = enemiesData.filter(enemy => enemy.level === enemyLevel);

    // Выбираем случайного монстра из отфильтрованного списка
    const randomIndex = Math.floor(Math.random() * filteredEnemies.length);
    return filteredEnemies[randomIndex];
}

// Инициализация при загрузке страницы
function init() {
    updateStartButton();
    updateSelectedExercisesPanel();
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

document.getElementById('startBattle').addEventListener('click', function() {
    if (this.classList.contains('active')) {
        const battleData = {
            selectedExercises: selectedExercises, // Передаем выбранные упражнения
            totalDamage: calculateTotalDamage(),
            player: playerData,
            enemy: generateEnemy()
        };

        // Сохраняем данные в localStorage
        localStorage.setItem('battleData', JSON.stringify(battleData));

        // Переход на экран сражения
        window.location.href = 'battle.html';
    }
});






