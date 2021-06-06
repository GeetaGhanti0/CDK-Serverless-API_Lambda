
import * as cdk from '@aws-cdk/core'
import * as lamda from '@aws-cdk/aws-lambda-nodejs'
import { Runtime } from '@aws-cdk/aws-lambda'
import * as path from 'path'
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'
import * as apig from '@aws-cdk/aws-apigatewayv2'
import * as apigIntegration from '@aws-cdk/aws-apigatewayv2-integrations'
import * as destinations from '@aws-cdk/aws-lambda-destinations'
import * as sqs from '@aws-cdk/aws-sqs';
import * as AWS from 'aws-sdk'
const processQueUrl = process.env.PROCEE_QUEUE_URL || ''

interface SampleHttpAPIProps {
  
}

export class SampleHttpApi extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props: SampleHttpAPIProps) {
        super(scope, id)

    const successQ = new AWS.SQS({apiVersion: '2021-06-07'})
    var params = {
        QueueName: 'SQS_QUEUE_NAME'
    }

 
        const getDocumentsFunction = new lamda.NodejsFunction(this, 'sampleLamdaFunction',  {
            runtime: Runtime.NODEJS_12_X,
            entry: path.join(__dirname, 'index.ts'),
            handler: 'sampleLamdaFunction',
            bundling: {
                externalModules: ['aws-sdk']
            },
            onSuccess: successQ.getQueueUrl
                
        })

    
       

        const postSampleLambdaFunction = new lamda.NodejsFunction(this, 'postSampleLambdaFunction',  {
            runtime: Runtime.NODEJS_12_X,
            entry: path.join(__dirname, 'index.ts'),
            handler: 'postSampleLambdaFunction',
            bundling: {
                externalModules: ['aws-sdk']
            },         
        })

        // const sqsPermission = new iam.PolicyStatement();
        // sqsPermission.addResources(myQueue.queueArn, failureQueue.queueArn)
        // sqsPermission.addActions('sqs:SendMessage')

        // postSampleLambdaFunction.addToRolePolicy(sqsPermission)
    
        const httpAPi = new apig.HttpApi(this, 'HttpApi', {
            apiName: 'sample-http-api', 
            createDefaultStage: true,
            corsPreflight: {
                allowMethods: [ apig.CorsHttpMethod.GET ],
                allowOrigins: ['*'],
                
            }
        })

        const integration = new apigIntegration.LambdaProxyIntegration({
            handler: getDocumentsFunction
        })

        const postIntegration = new apigIntegration.LambdaProxyIntegration({
            handler: postSampleLambdaFunction
        })

        httpAPi.addRoutes({
            path: '/getSampleLambda', 
            methods: [
                apig.HttpMethod.GET
            ],
            integration: integration
        })

        httpAPi.addRoutes({
            path: '/postSampleLambda', 
            methods: [
                apig.HttpMethod.POST
            ],
            integration: postIntegration
        })

        new cdk.CfnOutput(this, 'SampleHttpAPI' , {
            value: httpAPi.url!, 
            exportName: 'SampleHttpAPI'
        })
    }
}












