export const UserSchema = {

	name: "User",
	primaryKey: "_id",

	properties: {
		_id: "objectId",
		partitionKey: "string",
		lastname: "string?",
		firstname: "string?",
		email: "string", 
		password: "string",
		tasks: 'Task[]'
	},

};

export const TaskSchema = {

	name: "Task",
	primaryKey: "_id",

	properties: {
		_id: "objectId",
		partitionKey: "string",
		name: "string",
		type: "string",
		status: {type: "string", default: "open"},
		register_date: "string?",
		date: "date",
		hour: "date?"
	},

	//   relation Many To : permet de lier la table user et task
	assignee: {
		type: 'linkingObject',
		objectType: 'User',
		property: 'tasks',
	},

};

