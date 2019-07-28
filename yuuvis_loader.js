const AYLIENTextAPI = require('aylien_textapi');
const uuid = require('uuid/v4');
const request = require('request');
let textapi = new AYLIENTextAPI({
    application_id: "8e9d825d",
    application_key: "d515b564aa74cd8ccfeb10ffb2e8a99c"
});

let fakeThread = [{'email': 'email1', 'summaries': ['sum1', 'sum2', 'sum3']}, {'email': 'email2', 'summaries': ['sum4', 'sum5', 'sum6']}, {'email': 'email3', 'summaries': ['sum7', 'sum8', 'sum9']}];

async function summarize(email) {
    let summaries = email;
    textapi.summarize({
	'text': email,
	'title': 'placeholder'
    }, function(error, response) {
	if (error === null) {
	    console.log(response);
	    if (response.sentences.length === 0) {
		response.sentences.push(text);
	    }
	    summaries = response.sentences;
	}
    });
    return summaries;
}


function createEmailMetadata(user, threadID, emailID, email_order, cid) {
    return {
            "properties": {
		"enaio:objectTypeId": {
                    "value": "email"
		},
		"user": {
                    "value": user
		},
		"threadID": {
                    "value": threadID
		},
		"emailID": {
                    "value": emailID
		},
		"order": {
                    "value": email_order
		}
            },
            "contentStreams": [{
		"cid": `cid_${cid}`
            }]
    }
}

function createSummaryMetadata(user, threadID, emailID, summary_order, cid) {
        return {
            "properties": {
		"enaio:objectTypeId": {
                    "value": "summary"
		},
		"user": {
                    "value": user
		},
		"threadID": {
                    "value": threadID
		},
		"emailID": {
                    "value": emailID
		},
		"order": {
                    "value": summary_order
		}
            },
            "contentStreams": [{
		"cid": `cid_${cid}`
            }]
    }
}


function createImportFormdata(metadata, content){
    var formData = {}
    formData['data'] = {
	value: metadata,
	options: {
	    contentType: 'application/json'
	}
    }
    formData['cid_0']= {
	value: content,
	options: {
	    contentType: 'text/plain',
	    filename: 'stuff'
	}
    }
  return formData;
}

function yuuvis_call(body) {
    let req = {
         method: 'POST',
         uri: 'https://api.yuuvis.io/dms/objects',
         headers: {
             'Ocp-Apim-Subscription-Key': '07e8d29a9b924834932472703ba32c06'
         },
         formData: body
    };

  request.post(req, function callback(err, httpResponse, body) {
    if(err) throw err;
    else {
      console.log(httpResponse.statusCode)
      console.log(body)
  }})
}

function yuuvis_insert(thread) {
    let cid = 0;
    let formData = {};
    let batchMetadata = {"objects": []}
    const threadID = uuid();
    for (let i = 0; i < thread.length; i++) {
    	let emailID = uuid();
    	let email_order = i;
    	let email = thread[i].email;
	let emailMetadata = createEmailMetadata(1, threadID, emailID, email_order, cid);
	batchMetadata.objects.push(emailMetadata);
	formData[`cid_${cid}`]= {
	    value: email,
	    options: {
		contentType: 'text/plain',
		filename: 'stuff'
	    }
	}
	cid++;
    	for (let j = 0; j < thread[i].summaries.length; j++) {
    	    summary_order = j;
    	    let summary = thread[i].summaries[j];
	    let summaryMetadata = createSummaryMetadata(1, threadID,
							emailID, summary_order, cid);
	    batchMetadata.objects.push(summaryMetadata);
	    formData[`cid_${cid}`]= {
		value: summary,
		options: {
		    contentType: 'text/plain',
		    filename: 'stuff'
		}
	    }
	    cid++;
    	}
    }
    formData['data'] = {
	value: JSON.stringify(batchMetadata),
	options: {
	    contentType: 'application/json'
	}
    }
    console.log(formData);
    yuuvis_call(formData);
}

yuuvis_insert(fakeThread);
