function getTime(timezone) {
    const options = { timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Intl.DateTimeFormat("he-IL", options).format(new Date());
}

export { getTime }