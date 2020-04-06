from chalice import Chalice, NotFoundError, Response, CORSConfig, AuthResponse, AuthRoute, CognitoUserPoolAuthorizer

import boto3

app = Chalice(app_name='clientserving')
app.debug = True

cors_config = CORSConfig(
  allow_origin="*"
)

cognito_client = boto3.client('cognito-idp')
ledger = boto3.resource('dynamodb').Table('ledger')
demo = boto3.resource('dynamodb').Table('demo-documents')

cognito_authorizer = CognitoUserPoolAuthorizer(
    'streamUserPool',
    header = 'Authorization',
    provider_arns = ['arn:aws:cognito-idp:eu-west-1:228802818628:userpool/eu-west-1_Tw7W5AmAS']
)


userresponse = cognito_client.list_users(
    UserPoolId='eu-west-1_Tw7W5AmAS',
    Limit=50
)

@app.route('/application_context', authorizer = cognito_authorizer, cors=cors_config)
def context_provider():
    ## Add tenant isolation
    auth_context = app.current_request.context.get('authorizer', {})
    customer = auth_context.get('claims', {}).get('custom:customer')
    user = auth_context.get('claims', {}).get('cognito:username')
    auth = {
        'username': user,
        'customer': customer
    }
    user_list = list(map(structure_useroutput, userresponse['Users']))
    ledger_data = ledger.scan()
    demo_data = demo.scan()
    entity_names = []
    for item in ledger_data['Items']:
        entity_names.append(item['entity_name'])
    entities_list = list(set(entity_names))
    return {'auth': auth,
            'user_list': user_list,
            'ledger': ledger_data['Items'],
            "entities_list": entities_list,
            'demo': demo_data
            }

def structure_useroutput(item):
    attributes = item['Attributes']
    content = {}
    content['username'] = item['Username']
    for attribute in attributes:
        if attribute['Name'] == 'email':
            content['email'] = attribute['Value']
        if attribute['Name'] == 'custom:access_level':
            content['access_level'] = attribute['Value']
    return content
