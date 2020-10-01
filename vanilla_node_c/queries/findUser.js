const findUser = `
    SELECT id FROM users WHERE email = ? AND password = ?;
`;

module.exports = findUser;
