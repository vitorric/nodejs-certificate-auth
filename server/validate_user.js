exports.validateUser = (CLIENT_ID) => {
    const users = [{
        CLIENT_ID: 'd23d0488-2a03-4454-9004-cedfc4220c7d',
        SECRET_ID: 'b9483dbd-9cd7-4fad-9352-a20aeb8c7c9a',
        name: 'Vitor Ricardo'
    }]


    const currentUser = users.filter(x => x.CLIENT_ID === CLIENT_ID)[0];

    return !currentUser ? null : {
        name: currentUser.name
    }
}