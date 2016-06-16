////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Create Snapshot from Nova using os-snapshots
//
//  Creates a snapshot.
//
//  @param apiToken apiToken retrieved from Keystone
//  @param apiEndpoint location of endpoint
//  @param apiVersion version of API context to call
//  @param snapshotVolumeID ID of volume to snapshot
//  @param snapshotName name to give the stored volume snapshot
//  @param snapshotDec description to give the stored volume snapshot
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var https = require('https')

function main(params) {

    var apiToken = params.apiToken
    var apiEndpoint = params.apiEndpoint
    var apiVersion = params.apiVersion
    var snapshotVolumeID = params.snapshotVolumeID
    var snapshotName = params.snapshotName
    var snapshotDesc = params.snapshotDesc
    
    var headers = {
        'X-Auth-Token': apiToken,
        'content-type': 'application/json'
    };

    //May be a better way to parse this
    var post_data = {
        'snapshot': {
            'display_name': snapshotName,
            'display_description': snapshotDesc,
            'volume_id': snapshotVolumeID,
            'force': false
        }
    };   

    // hardcode for now
    var options = {
        host: apiEndpoint,
        path: '/compute/' + apiVersion + '/os-snapshots',
        method: 'POST',
        body: post_data,
        headers: headers
    };

    var postRequest = https.request(options, function(res) {
    
        var json = ''
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            json += chunk 
        });
        
        res.on('end', function() {
            console.log(json)            
            var j = JSON.parse(json)
            return whisk.done(j)

        });
    });

    postRequest.end();

    return whisk.async()
    
}
