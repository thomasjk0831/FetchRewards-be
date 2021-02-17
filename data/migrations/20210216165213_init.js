
exports.up = function (knex) {
    return (knex.schema
        .createTable("transactions", tbl => {
            tbl.increments()
            tbl.string("payer").notNullable()
            tbl.integer("points").notNullable()
            tbl.string("timestamp")
        })
    )

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('transactions')
};
