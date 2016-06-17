////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Create a snapshot of a server
//
//  Will create a snapshot of a server  
//
//  @param apiToken apiToken retrieved from Keystone
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var request = require('request')

function main(params) {

    console.log('createNewSnapshot. got params '+JSON.stringify(params))

    /*if (!params.apiToken || !params.apiEndpoint ||  !params.snapshotVolumeID ) {
        return whisk.error("Missing required params")
    }*/
     if (!params.apiToken) {
        return whisk.error("Missing apiToken")
    }
     if (!params.apiEndpoint) {
        return whisk.error("Missing apiEndpoint")
    }
     if (!params.serverId ) {
        return whisk.error("Missing snapshot serverId")
    }

    if (!params.context) {
        return whisk.error("Missing context")
    }

    if (!params.context.backupName) {
        return whisk.error("Missing backup name")
    }

    if (!params.context.backupType) {
        return whisk.error("Missing backup type")
    }

    if (!params.context.rotation) {
        return whisk.error("Missing rotation")
    }

    var apiEndpoint = params.apiEndpoint
    var apiToken = params.apiToken
    var serverId = params.serverId
    var backupName = params.context.backupName
    var backupType = params.context.backupType
    var rotation = params.context.rotation


    console.log('createNewSnapshot params ' + JSON.stringify(params))

    var context = null
    if (params.context) {
        context = params.context
    }

    var headers = {
        'X-Auth-Token': apiToken,
        'content-type': 'application/json'
    };

    //May be a better way to parse this
    var post_data = {
        createBackup: {
            name: backupName,
            backup_type: backupType,
            rotation: rotation
        }
    };  

    // hardcode for now
    var options = {
        uri: apiEndpoint+'/servers/'+serverId+'/action',
        method: 'POST',
        json: post_data,
        headers: headers
    };

   
    var headers = {
        'X-Auth-Token':apiToken
    };

    console.log('Options are : '+ JSON.stringify(options))

    request(options, function(error, res, body) {

        if (error) {
            return whisk.error("Got error " + error)
        }
        console.log('Got body '+ JSON.stringify(body))
        return whisk.done({body: body})


    });

    return whisk.async()
    
}
