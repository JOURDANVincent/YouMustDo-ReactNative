import Realm from "realm";
import {ObjectId} from 'bson';
import { UserSchema, TaskSchema } from '../schemas/Schema';
import { getRealmApp}  from './RealmApp'


export default openRealm = async ( ) => {

    const app = getRealmApp()

    try {

        console.log(`trying to connect DB with the user: ${app.currentUser.id}`)

        const config = {
            
            schema: [UserSchema, TaskSchema],
            sync: {
                user: app.currentUser,
                partitionValue: String(app.currentUser.id),
            },
        };

        const realm = await Realm.open(config)
        console.log('Connection DB OK !!!!!')
          
        return realm ;

    } catch (error) {
        console.error("Failed to open youMustD DB !!!!!", error.code, error.message);
        return error.message
    }

}
