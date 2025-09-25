export const calculatedUserRank = (totalItems) => {
    switch (true) {
        case totalItems >= 20:
            return 'Master'
        case totalItems >= 15:
            return 'Legend'
        case totalItems >= 10:
            return 'Proffesional'
        case totalItems >= 5:
            return 'Advanced'
    
        default:
            return 'Beginner'
    }
}