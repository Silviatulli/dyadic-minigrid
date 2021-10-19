export const initChat = (sock) => {
    // Listen for events- front_end
    sock.on('chat', function(data) {
        feedback.innerText = '';
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
        output.scrollIntoView(false)
    });

    sock.on('typing', function(data) {
        feedback.innerHTML = '<p><em>' + 'your teammate' + ' is typing a message...</em></p>';
    });

    // Query DOM
    const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    form = document.getElementById('form'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


    // Emit events
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        sock.emit('chat', {
            message: message.value
        });
        ['why','because', 'instead', 'better', 'worse'].forEach((id) => {
            const button = document.getElementById(id);
            button.addEventListener('click', () => {
                message.value = "" + " " + id;
                });
            });
    form.reset();
    });

    message.addEventListener('keypress', function() {
    sock.emit('typing', handle);
    })
}

// const writeEvent = (text) => {
//     //<ul> element
//     const parent = document.querySelector('#events');

//     //<li> element
//     const el = document.createElement('li');
//     el.innerHTML = text;
//     parent.appendChild(el);
// };
