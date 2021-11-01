const GameEvent={
    Connect: 'connect',
    Connection:'connection',
    Disconnect:'disconnect',

    Start: 'game_start',
    End: 'game_end',
    Status: 'game_status',
    Score: 'game_score',
    Accept: 'game_accepted',
    NewUser: 'game_new_user',


    Register: 'user_register',
    Input:'user_input',
};

module.exports=Object.freeze(GameEvent);