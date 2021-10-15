class Templates {

  constructor(p1, p2) {
    this._players = [p1, p2];
    this._turns = [null, null];

    this._sendToPlayers('Both players are connected! Let\'s Starts!');

    this._players.forEach((player) => {
      player.on('turn', (turn, msg) => {
        this._onTurn(turn, msg);
      });
    });
  }

  _sendToPlayer(msg) {
    this._players.emit('message', msg);
  }

  _sendToPlayers(msg) {

    this._players.forEach((player) => {
      player.emit('message', msg);
    });
  }

  _onTurn(turn) {
    this._turns = turn;
  }



}

module.exports = Templates;
