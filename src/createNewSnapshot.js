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

    if (!params.apiToken || !params.apiEndpoint ||  !params.snapshotVolumeID ) {
        return whisk.error("Missing required params")
    }

    if (!params.context || !params.context.snapshotName || !params.context.snapshotDesc) {
        return whisk.error("Missing context which should contain snapshot name and description")
    }

    var apiEndpoint = params.apiEndpoint
    var apiToken = params.apiToken
    var snapshotVolumeID = params.snapshotVolumeID
    var snapshotName = params.context.snapshotName
    var snapshotDesc = params.context.snapshotDesc


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
        snapshot: {
            display_name: snapshotName,
            display_description: snapshotDesc,
            volume_id: snapshotVolumeID,
            force: false
        }
    };   

    // hardcode for now
    var options = {
        uri: apiEndpoint+'/os-snapshots',
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
