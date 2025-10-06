export const calculatedUserRank = (totalItems) => {
    switch (true) {
        case totalItems >= 20:
            return { text: 'Master', color: '#FFD700' } // Dorado
        case totalItems >= 15:
            return { text: 'Legend', color: '#9B59B6' } // Púrpura
        case totalItems >= 10:
            return { text: 'Professional', color: '#1494eaff' } // Azul
        case totalItems >= 5:
            return { text: 'Advanced', color: '#0c572bff' } // Verde
        default:
            return { text: 'Beginner', color: '#95A5A6' } // Gris
    }
}