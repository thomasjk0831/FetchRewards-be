exports.seed = function (knex) {
    const transactions = [
        {
            payer: "DANNON",
            points: 1000,
            timestamp: "2020-11-02T14:00:00Z",
            user_id: 1
        },
        {
            payer: "MILLER COORS",
            points: 10000,
            timestamp: "2020-11-02T14:00:00Z",
            user_id: 1
        },
        {
            payer: "UNILEVER",
            points: 200,
            timestamp: "2020-10-31T11:00:00Z",
            user_id: 1
        },
    ]

    return knex("transactions").insert(transactions);
};
