import { Handler} from 'aws-lambda'
import * as AWS from 'aws-sdk';

interface HelloWorldEvent {
    name:String
}

interface HelloWorldResponse {
    message:String
}

export const postLambdaHandler = async function(){

    const successQ = new AWS.SQS()
   await successQ.sendMessage({
        MessageBody: 'Hello',
        QueueUrl: process.env.PROCESS_QUEUE_URL || ' '
    })

};