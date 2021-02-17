
exports.up = function (knex) {
    return (knex.schema
        .createTable("users", tbl => {
            tbl.increments()
            tbl.string("username")
        })
        .createTable("transactions", tbl => {
            tbl.increments()
            tbl.string("payer").notNullable()
            tbl.integer("points").notNullable()
            tbl.string("timestamp")
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references('users.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
    )

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('users')
};
