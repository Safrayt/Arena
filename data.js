// Данные об упражнениях
const exercisesData = {
    pullups: [
        {
            id: "pullup-easy",
            name: "Подтягивания (легко)",
            level: 1,
            damage: 5,
            description: "5 обычных подтягиваний",
            image: "images/exercises/pullup-easy.png"
        },
        {
            id: "pullup-medium",
            name: "Подтягивания (средне)",
            level: 2,
            damage: 10,
            description: "10 обычных подтягиваний",
            image: "images/exercises/pullup-medium.png"
        },
        {
            id: "pullup-hard",
            name: "Подтягивания (сложно)",
            level: 3,
            damage: 15,
            description: "15 обычных подтягиваний",
            image: "images/exercises/pullup-hard.png"
        }
    ],
    pushups: [
        {
            id: "pushup-easy",
            name: "Отжимания (легко)",
            level: 1,
            damage: 8,
            description: "10 обычных отжиманий",
            image: "images/exercises/pushup-easy.png"
        },
        {
            id: "pushup-medium",
            name: "Отжимания (средне)",
            level: 2,
            damage: 15,
            description: "20 обычных отжиманий",
            image: "images/exercises/pushup-medium.png"
        },
        {
            id: "pushup-hard",
            name: "Отжимания (сложно)",
            level: 3,
            damage: 25,
            description: "30 обычных отжиманий или 15 отжиманий на кулаках",
            image: "images/exercises/pushup-hard.png"
        }
    ],
    squats: [
        {
            id: "squat-easy",
            name: "Приседания (легко)",
            level: 1,
            damage: 10,
            description: "15 обычных приседаний",
            image: "images/exercises/squat-easy.png"
        },
        {
            id: "squat-medium",
            name: "Приседания (средне)",
            level: 2,
            damage: 18,
            description: "30 обычных приседаний",
            image: "images/exercises/squat-medium.png"
        },
        {
            id: "squat-hard",
            name: "Приседания (сложно)",
            level: 3,
            damage: 30,
            description: "50 обычных приседаний или 20 приседаний с прыжком",
            image: "images/exercises/squat-hard.png"
        }
    ],
    abs: [
        {
            id: "abs-easy",
            name: "Пресс (легко)",
            level: 1,
            damage: 7,
            description: "15 сгибаний пресса",
            image: "images/exercises/abs-easy.png"
        },
        {
            id: "abs-medium",
            name: "Пресс (средне)",
            level: 2,
            damage: 12,
            description: "25 сгибаний пресса",
            image: "images/exercises/abs-medium.png"
        },
        {
            id: "abs-hard",
            name: "Пресс (сложно)",
            level: 3,
            damage: 20,
            description: "40 сгибаний пресса или 30 сек планки",
            image: "images/exercises/abs-hard.png"
        }
    ]
};

// Данные игрока
const playerData = {
    name: "Герой",
    level: 1,
    maxHealth: 100,
    currentHealth: 100,
    experience: 0,
    nextLevelExperience: 100,
    completedBattles: 0,
    image: "images/player.png"
};

// Данные врагов
const enemiesData = [
    {
        id: "slime",
        name: "Слизень",
        health: 50,
        damage: 5,
        experienceReward: 20,
        image: "images/enemies/slime.png",
        level: 1 // Уровень монстра
    },
    {
        id: "goblin",
        name: "Фунгус",
        health: 75,
        damage: 8,
        experienceReward: 30,
        image: "images/enemies/goblin.png",
        level: 1
    },
    {
        id: "skeleton",
        name: "Скелет",
        health: 90,
        damage: 10,
        experienceReward: 40,
        image: "images/enemies/skeleton.png",
        level: 2
    },
    {
        id: "orc",
        name: "Орк",
        health: 120,
        damage: 15,
        experienceReward: 60,
        image: "images/enemies/orc.png",
        level: 2
    },
    {
        id: "dragon",
        name: "Древень",
        health: 200,
        damage: 25,
        experienceReward: 100,
        image: "images/enemies/dragon.png",
        level: 3
    }
];

// Данные для наград
const rewardsData = [
    {
        id: "health-potion",
        name: "Зелье здоровья",
        description: "Восстанавливает 25 здоровья",
        effect: {
            type: "healing",
            value: 25
        },
        rarity: "common",
        image: "images/rewards/health-potion.png"
    },
    {
        id: "strength-potion",
        name: "Зелье силы",
        description: "Увеличивает урон на 20% в следующем бою",
        effect: {
            type: "damage-boost",
            value: 0.2,
            duration: 1
        },
        rarity: "uncommon",
        image: "images/rewards/strength-potion.png"
    },
    {
        id: "experience-scroll",
        name: "Свиток опыта",
        description: "Добавляет 30 очков опыта",
        effect: {
            type: "experience",
            value: 30
        },
        rarity: "rare",
        image: "images/rewards/experience-scroll.png"
    }
];