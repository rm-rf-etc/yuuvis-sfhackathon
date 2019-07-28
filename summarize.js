
var AYLIENTextAPI = require('aylien_textapi');

var textapi = new AYLIENTextAPI({
  application_id: "8e9d825d",
  application_key: "d515b564aa74cd8ccfeb10ffb2e8a99c",
});

module.exports = async function summarize(email) {
  let summaries = email;
  textapi.summarize({
    'text': email,
    'title': 'placeholder'
  },
  function(error, response) {
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
