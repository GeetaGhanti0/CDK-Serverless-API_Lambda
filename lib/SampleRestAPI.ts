import { CdkSampleStackStack } from "./cdk-sample-stack-stack";
import * as cdk from '@aws-cdk/core'
import * as lamda from '@aws-cdk/aws-lambda-nodejs'
import { Runtime } from '@aws-cdk/aws-lambda'
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import * as  apigateway from "@aws-cdk/aws-apigateway";
import * as path from 'path'

interface apiProps {

}

export class SampleRestAPI extends cdk.Construct{
    constructor(scope: cdk.Construct, id: string, props: apiProps) {
          super(scope, id);

        const getDocumentsFunction = new lamda.NodejsFunction(this, 'GetDocumentsFunction',  {
            runtime: Runtime.NODEJS_12_X,
            entry: path.join(__dirname, 'handler.ts'),
            bundling: {
                externalModules: [
                  'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime

                ],
              },
        })


       const sampleAPI =  new apigateway.LambdaRestApi(this, 'myapi', {
            handler: getDocumentsFunction,
          });

        new cdk.CfnOutput(this, 'DemoAPI' , {
        value: sampleAPI.url!, 
        exportName: 'DemoAPI'
        })
    
    }

   

    
}