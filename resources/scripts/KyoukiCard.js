var KyoukiCard = function(name, trigger, effect) {
  this.name = name;
  this.trigger = trigger;
  this.effect = effect;
};
KyoukiCard.prototype.toString=function() {
  return "狂気：" + this.name + "\n"
      + "トリガー：" + this.trigger + "\n"
      + "効果：" + this.effect;
};
KyoukiCard.prototype.alert=function() {
  alert(this.toString());
};
function cloneObj(obj) {
  return new KyoukiCard(obj.name, obj.trigger, obj.effect);
}

var chosenCards = []; //チェックボックスで選ばれたカード
var deck = [];  //山札

//cards内の要素をランダムに入れ替える
function shuffle(cards) {
  var tempArray = [];
  cards.forEach(function (d) {
    var tempObj = cloneObj(d);
    if (Math.floor(Math.random() * 100) % 2 === 0) {
      tempArray.push(tempObj);
    } else {
      tempArray.unshift(tempObj);
    }
  });
  return tempArray.slice();
  console.log(cards);
}

function createDeck() {
  //選ばれたカードを別の配列にコピー
  var shuffleCards = chosenCards.slice();
  //カードをシャッフル
  for (i = 0; i < 10; i++)
    shuffleCards = shuffle(shuffleCards);
  //シャッフルしたカードを山札にコピー
  deck = shuffleCards.slice();
}

//狂気カード
var c0 = new KyoukiCard("疑心暗鬼",
                        "同じシーンにいる自分以外のキャラクターがファンブルする",
                        "周囲の人物に対して疑惑が高まる。誰かがあなたを裏切っている！\nこの【狂気】が顕在化したシーンに登場している自分以外のPCの中から一人を選び、2点のダメージを与える。\nこの狂気を自分から明らかにすることはできない。");

var c1 = new KyoukiCard("広がる恐怖",
                        "同じシーンにいる誰か(自分も含む)がファンブルする",
                        "あなたは、何もかもが怖くなっている。\n自分の【恐怖心】の特技1つを選ぶ。その上下左右の位置にある特技も【恐怖心】として扱う\nこの狂気を自分から明らかにすることはできない。");

var c2 = new KyoukiCard("",
                        "",
                        "");

// // test
// chosenCards = [c0, c1];
// createDeck();
//
// c2 = cloneObj(deck[1]);
// console.log(deck);
// console.log(c2.toString());
