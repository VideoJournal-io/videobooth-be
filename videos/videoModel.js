const db = require("../database/dbConfig.js");

module.exports = {
	find,
	findById,
	findByUserId,
	insert,
	update
};

function find() {
	return db("videos").select("*");
}

function findById(video_id) {
	return db("videos")
		.join("users", "videos.owner_id", "users.id")
		.join("prompts", "videos.prompt_id", "prompts.id")
		.where("videos.id", video_id)
		.first()
		.select(
			"videos.id as video_id",
			"videos.owner_id as owner_id",
			"users.first_name as owner_first_name",
			"users.last_name as owner_last_name",
			"videos.title as video_title",
			"videos.description as video_description",
			"videos.video_url",
			"videos.created_at",
			"prompts.question as prompt_question"
		)
}

function findByUserId(user_id) {
	return db
		.select("*")
		.from("videos")
		.where({ owner_id: user_id })
}

function insert(vidObj) {
	return db("videos").insert(vidObj, "id");
}

function update(changes) {
	clg(46, changes)
	const id = changes.id;
	return db('videos')
		.where({ id })
		.update(changes)
		.then(ct => {
			console.log(ct);
			return findById(id);
		})
}

function clg(...x) { console.log(...x) }