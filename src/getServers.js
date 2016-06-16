////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Get Servers from Nova
//
//  Will retrieve a list of filtered servers from Nova.  
//
//  @param apiToken apiToken retrieved from Keystone
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var request = require('request')

function main(params) {

    if (!params.apiToken || !params.host || !params.port || !params.path || !params.protocol) {
        return whisk.error("Missing required params")
    }

    console.log('Got params ' + JSON.stringify(params))

    var apiToken = params.apiToken
    var host = params.host
    var port = params.port
    var path = params.path
    var protocol = params.protocol


    var context = null
    if (params.context) {
        context = params.context
    }
   
    var headers = {
        'X-Auth-Token':apiToken
    };
 
    var apiEndpoint = protocol+'://'+host+':'+port+path
    // hardcode for now
    var options = {
        url: apiEndpoint+'/servers',
        method: 'GET',
        headers: headers
    };

    
    if (context && context.queryString) {
        options.qs = context.queryString
    }

    console.log('Options are : '+ JSON.stringify(options))


    request(options, function(error, res, body) {

        if (error) {
            return whisk.error("Got error " + error)
        }
        
        var j = JSON.parse(body)

        if (context) {
            j.context = context
        }

        // set this for downstream actions that want compute endpoint
        j.apiEndpoint = apiEndpoint
        j.apiToken = apiToken

        if (j.servers.length > 0) {
            j.snapshotVolumeID = j.servers[0].id
        }

        return whisk.done(j)


    });

    return whisk.async()
    
}
