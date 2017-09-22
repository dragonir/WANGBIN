'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API = {
  dealCards: function dealCards(numCards) {
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(function (response) {
      return response.json();
    }).then(function (_ref) {
      var deck_id = _ref.deck_id;
      return fetch('https://deckofcardsapi.com/api/deck/' + deck_id + '/draw/?count=' + numCards);
    }).then(function (response) {
      return response.json();
    });
  }
};

var suits = 'CLUBS DIAMONDS HEARTS SPADES'.split(' ');
var values = 'ACE 2 3 4 5 6 7 8 9 10 JACK QUEEN KING'.split(' ');
var offset = function offset(_ref2) {
  var suit = _ref2.suit;
  var value = _ref2.value;

  var sequenceNumber = 13 * suits.indexOf(suit) + values.indexOf(value);
  return -100 * sequenceNumber + '% 0%';
};

var Card = function Card(_ref3) {
  var card = _ref3.card;
  return React.createElement('div', { className: 'Card', style: { backgroundPosition: offset(card) } });
};

var renderCards = function renderCards(cards) {
  return cards.map(function (card) {
    return React.createElement(Card, { key: card.code, card: card });
  });
};

var renderPlaceholders = function renderPlaceholders(numPlaceholders) {
  return Array(numPlaceholders).fill().map(function (_, i) {
    return React.createElement('div', { key: i, className: 'PlaceholderCard' });
  });
};

var HandCards = function HandCards(_ref4) {
  var cards = _ref4.cards;
  var numPlaceholders = _ref4.numPlaceholders;
  return React.createElement(
    'div',
    { className: 'Hand_Cards' },
    cards ? renderCards(cards) : renderPlaceholders(numPlaceholders)
  );
};

var Hand = function (_React$Component) {
  _inherits(Hand, _React$Component);

  function Hand() {
    _classCallCheck(this, Hand);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.fetchCards = _this.fetchCards.bind(_this);
    _this.state = { loading: false, cards: null };
    return _this;
  }

  Hand.prototype.fetchCards = function fetchCards() {
    var _this2 = this;

    this.setState({ loading: true });
    API.dealCards(5).then(function (_ref5) {
      var cards = _ref5.cards;

      _this2.setState({ cards: cards, loading: false });
    });
  };

  Hand.prototype.render = function render() {
    var _state = this.state;
    var cards = _state.cards;
    var loading = _state.loading;

    return React.createElement(
      'div',
      { className: 'Hand' },
      React.createElement(HandCards, { cards: cards, numPlaceholders: 5 }),
      loading ? React.createElement(
        'div',
        { className: 'Loading' },
        React.createElement('img', { src: 'https://frontend.center/images/loading.svg' })
      ) : React.createElement(
        'button',
        { className: 'Button', onClick: this.fetchCards },
        cards ? 'Replace hand' : 'Get cards'
      )
    );
  };

  return Hand;
}(React.Component);

var App = function App() {
  return React.createElement(
    'div',
    { className: 'Main' },
    React.createElement(Hand, null)
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));