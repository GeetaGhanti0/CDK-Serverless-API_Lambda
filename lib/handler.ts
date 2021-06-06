import { Handler} from 'aws-lambda'

interface HelloWorldEvent {
    name:String
}

interface HelloWorldResponse {
    message:String
}

export const handler: Handler <HelloWorldEvent, HelloWorldResponse> = async function(event){

    return {
        message: `hello world`
    };

};