export const initChat = (sock) => {

    // Query DOM
    const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    form = document.getElementById('form'),
    output = document.getElementById('output'),
    prolificform = document.getElementById('prolificform'),
    prolificid = document.getElementById('prolificid'),
    feedback = document.getElementById('feedback');

    // Listen for events- front_end
    sock.on('chat', function(data) {
        feedback.innerText = '';
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
        output.scrollIntoView(false)
    });

    sock.on('typing', function(data) {
        feedback.innerHTML = '<p><em>' + 'your teammate' + ' is typing a message...</em></p>';
    });


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

    prolificform.addEventListener('submit', function(e) {
        e.preventDefault()
        sock.emit('prolificid', {
        prolificid: prolificid.value
         });
        prolificform.remove();
    });
}

const addButton = (id, label) => {
            const buttonWrapper = document.getElementById('button-wrapper');
            const button = document.createElement('button');
            button.id = id
            button.innerHTML = label
            button.addEventListener('click', () => {
                message.value = "" + " " + id;
                });
            buttonWrapper.appendChild(button)
}

export const populateButtons = (isLearner) => {
    const buttonWrapper = document.getElementById('button-wrapper');
    buttonWrapper.innerHTML = null
    if(isLearner) {
            [['why', 'Why']].forEach(([id, label]) => {
             addButton(id,label)
            });
        }
    else{
         [['because', 'Because'], ['instead', 'Instead'], ['better', 'Better'], ['worse', 'Worse']].forEach(([id, label]) => {
            addButton(id,label)
        });
    }
}
