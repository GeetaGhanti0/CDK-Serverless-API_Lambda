import * as cdk from '@aws-cdk/core';
import { SampleHttpApi } from './SampleHttpApi';
//import { SampleRestAPI } from './SampleRestAPI';

export class CdkSampleStackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
  
    super(scope, id, props);

    new SampleHttpApi(this, 'SampleRestAPI',{

    })

  }
}
