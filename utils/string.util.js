const isRegExp = (str) => {
    try {
        new RegExp(str);
        return true; // La chaîne est une expression régulière valide
    } catch (err) {
        return false; // La chaîne n'est pas une expression régulière valide
    }
};

module.exports = {
    isRegExp
}