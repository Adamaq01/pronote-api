const jsdom = require('jsdom');
const { getDOM, extractStart } = require('./api');

async function login(url, account, username, password)
{
    const jar = new jsdom.CookieJar();
    let dom = await getDOM({
        url: 'https://www.atrium-sud.fr/connexion/login?service=' + url,
        jar
    });

    let execution = dom.window.document.getElementsByName('execution');
    execution = execution[0].value;

    dom = await getDOM({
        url: 'https://www.atrium-sud.fr/connexion/login?service=' + url,
        jar,
        method: 'POST',
        data: {
            username,
            password,
            execution,
            _eventId: 'submit',
            geolocation: ''
        },
        asIs: true
    })

    dom = await getDOM({
        url,
        jar,
        method: 'GET',
        asIs: true,
        followRedirects: true
    });

    return extractStart(dom);
}

module.exports = login;
