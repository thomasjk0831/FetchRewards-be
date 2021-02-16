exports.seed = function (knex) {
    const users = [
        {
            username: "Mary", // id: 1

        },
        {
            username: "Joe" //id: 2
        },

    ];

    return knex("users").insert(users);
};
