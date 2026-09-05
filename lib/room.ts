export const getRoomId = (userId1: number, userId2: number) => {
    const [a, b] = [userId1, userId2].sort((x, y) => x - y);
    return `room_${a}_${b}`;
};