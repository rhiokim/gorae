export function getColorClass(color, level) {
    const lvlClass = (level) ? `-${level}` : '';
    return `mdl-color--${color}${lvlClass}`;
}

export function getTextColorClass(color, level) {
    const lvlClass = (level) ? `-${level}` : '';
    return `mdl-color-text--${color}${lvlClass}`;
}
