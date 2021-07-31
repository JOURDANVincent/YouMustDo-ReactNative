import Realm from 'realm';

// Returns the shared instance of the Realm app.
export const getRealmApp = () => {

	const appId = "youmustdo-cmhgo"

	const appConfig = {

		id: appId,
		timeout: 10000,
	};

	return new Realm.App(appConfig);
}	