import { objectLike } from '@aws-cdk/assert';
import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2, APIGatewayProxyHandlerV2  } from 'aws-lambda'
import { type } from 'os';
import * as cdk from '@aws-cdk/core'
import * as AWS from 'aws-sdk'
import { SqsDestination } from '@aws-cdk/aws-lambda-destinations';


export const postSampleLambdaFunction = async (event:APIGatewayProxyEventV2, context: Context) : Promise<APIGatewayProxyStructuredResultV2> => {
   
    const documents = {
        name: 'Geeta',
        surname: 'Ghanti'
    }

    if(!event.body) {
        return {
            statusCode: 400,
            body: 'invalid request, you are missing the parameter body'
        }
    }

    const nino = typeof event.body == 'object' ? event.body : JSON.parse(event.body)
    
    await successQ.sendMessage({
         MessageBody: 'Hello',
         QueueUrl: process.env.PROCESS_QUEUE_URL || ' '
     })

    return {
        statusCode: 200,
        body: JSON.stringify(nino)
    }
}


export const sampleLamdaFunction = async (event:APIGatewayProxyEventV2, context: Context) : Promise<APIGatewayProxyStructuredResultV2> => {
    const documents = {
        name: 'Geeta',
        surname: 'Ghanti'
    }

try {
  return {
    statusCode: 200,
    body: JSON.stringify(documents)
}
 
} catch( err) {
  return {
    statusCode: 500,
    body: err.message
}
}
}
