const getUserSphereTypes = (knex, userId) => knex("sphereTypes")
    .distinct('sphereTypes.id')
    .pluck('name')
    .join('cases', 'cases.sphereId', 'sphereTypes.id')
    .where('cases.userId', userId);

const getUserCases = (knex, userId) => knex("cases")
    .select()
    .where('cases.userId', userId);

const getUserCountCases = (knex, userId) => knex("cases")
    .count()
    .first()
    .where('cases.userId', userId);

const getUserSumPrice= (knex, userId) => knex("casesServices")
    .sum('price as sumPrice')
    .first()
    .leftJoin('cases', 'cases.id', 'caseId')
    .where('userId', userId)
    .where('type', 1);

const getUser = (knex, userId, columns) => knex("users")
    .first(columns)
    .leftJoin('cities', 'cities.id', 'cityId')
    .where('users.id', userId);

module.exports = {
    getUser,
    getUserCountCases,
    getUserCases,
    getUserSphereTypes,
    getUserSumPrice
};