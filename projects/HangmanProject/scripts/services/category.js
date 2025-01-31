const categories = {
    foods: ["לחם", "פיצה", "סושי", "פלאפל", "שניצל", "מרק", "המבורגר", "קציצה", "קבב", "שווארמה", "חביתה", "ציפס", "טוסט"],
    animals: ["חמור", "פיל", "כלב", "חתול", "זברה", "חזיר", "פרה", "כבשה", "תרנגול", "גירפה", "קרנף", "אריה", "צבי", "אייל", "עז", "עכבר"],
    furnitures: ["שולחן", "כיסא", "מיט", "ספה", "ארון"],
    games: ["שחמט", "דמקה", "פוקר", "סנוקר", "כדורגל", "כדורסל", "פינג פונג", "טניס"]
};

function getRandomWord(category) {
    const words = categories[category];
    return words[Math.floor(Math.random() * words.length)];
}

export { categories, getRandomWord };