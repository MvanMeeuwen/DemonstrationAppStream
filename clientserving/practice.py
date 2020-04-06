import boto3

cognito_client = boto3.client('cognito-idp')
ledger = boto3.resource('dynamodb').Table('ledger')

userresponse = cognito_client.list_users(
    UserPoolId='eu-west-1_Tw7W5AmAS',
    Limit=50
)

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

user_list = list(map(structure_useroutput, userresponse['Users']))
print(user_list)




