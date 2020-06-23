const chatbot = require('../chatbot/chatbot');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({'hello' : 'Alex'});
    });
    
    app.post('/api/df_text_query', async (req, res) => {
        try {
            let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
            console.log(responses);
            res.send(responses[0].queryResult);
        } catch (err) {
            console.log(err);
        }

    });
    
    app.post('/api/df_event_query', async (req, res) => {
        try {
            let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
            res.send(responses[0].queryResult);
        } catch (err) {
            console.log(err);
        }
    });
    
}