exports.seed = function (knex) {
	return knex('roles')
		.then(function () {
			return knex('roles').insert(

				// data generated by https://mockaroo.com/

				[
					{ "name": "Team Member" },
					{ "name": "Team Lead" }
				]
			);
		});
};
