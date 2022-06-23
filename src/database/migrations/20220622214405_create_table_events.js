/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("eve_id").primary();
    table.integer("usr_id").unsigned();
    table.foreign("usr_id").references("users.usr_id").deferrable("deferred");
    table.string("eve_title").notNullable();
    table.string("eve_description").notNullable();
    table.string("eve_date_begin").notNullable();
    table.string("eve_time_begin").notNullable();
    table.string("eve_date_end").notNullable();
    table.string("eve_time_end").notNullable();
    table.string("eve_created_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
