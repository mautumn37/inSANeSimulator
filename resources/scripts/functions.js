var chosenCards = []; //チェックボックスで選ばれたカード
var deck = [];  //山札

//選んだルールのカードのリストの表示・非表示切り替え
//obj = クリックの対象
function toggleCardLists(obj) {
  //クリックの対象のvalueに応じてクラス名を選択
  var clickedLists = "";
  if (obj.value === "tgl1") {
    clickedLists = "cl1";
  } else if (obj.value === "tgl2") {
    clickedLists = "cl2";
  } else if (obj.value === "tgl3") {
    clickedLists = "cl3";
    toggleCardLists2(obj);
  }
  //クリックで選んだルールのtr,label,inputの表示・非表示を切り替える
  var classes = document.getElementsByClassName(clickedLists);console.log(classes[0]);
  if (obj.checked) {  //クリックした時にtr,label,inputを表示
    for (i = 0; i < classes.length; i++) {
      classes[i].style.visibility = "visible";  //trを表示
      var labels = classes[i].getElementsByTagName("label");
      for (j = 0; j < labels.length; j++) { //labelを表示
        if (labels[j].textContent === "") {  //初めてlabelを表示するときに内容を追加
          labels[j].textContent = window[classes[i].getElementsByTagName("input")[j].value].name;
          var idFor = classes[i].getElementsByTagName("input")[j].value;
          classes[i].getElementsByTagName("input")[j].id = idFor;
          labels[j].htmlFor = idFor;
        } else {
          labels[j].style.display = "inline"; //2回目以降はdisplay属性をinlineに変更
          classes[i].getElementsByTagName("input")[j].style.display = "inline-block"; //display属性をinline-blockに変更
        }
      }
    }
  } else {  //クリックし直した時にtr,label,inputを非表示
    for (i = 0; i < classes.length; i++) {
      classes[i].style.visibility = "hidden";  //trを非表示
      var labels = classes[i].getElementsByTagName("label");
      for (j = 0; j < labels.length; j++) { //label,inputを非表示
        labels[j].style.display = "none"; //labelのdisplay属性をnoneに変更
        classes[i].getElementsByTagName("input")[j].style.display = "none"; //inputのdisplay属性をnoneに変更
      }
    }
  }
}

//カードが1枚以上選択されていた場合、ゲーム開始
function gameStart() {
  //カードが選択されていた場合、ゲームを進行
  if (checkSelected()) {
    switchDiv();
    createDeck();
  }
}

//選択されたカードのvalueを取得し、
//カードが1枚以上選択され、かつユーザーがダイアログでOKを選択した場合、trueを返す
function checkSelected() {
  //chosenCardsを空の配列にする
  chosenCards = [];
  for (i = 0; i < document.getElementsByName("cbs").length; i++) {
    if (document.getElementsByName("cbs")[i].checked) {
      //選択されたチェックボックスのvalueをKyoukiCardオブジェクトとしてchosenCardsに追加
      chosenCards.push(window[document.getElementsByName("cbs")[i].value]);
    }
  }
  //チェックボックスが何も選択されていなかった場合、警告ダイアログを表示
  if (chosenCards.length === 0) {
    alert("カードが選ばれていません！");
    return false;
  } else {  //chosenCards.length > 0
    var message = "以下のカードでゲームを開始します。\n";
    message += "  " + chosenCards[0].name;
    for (i = 1; i < chosenCards.length; i++) {
      if (i % 4 === 0) {
        message += ",\n  " + chosenCards[i].name;  //4項目毎に改行
      } else {
        message += ", " + chosenCards[i].name;
      }
    }
    message += "\nよろしいですか？"
    return confirm(message);
  }
}

//画面を切り替える
function switchDiv() {
  //div(id="phase1")とbutton(id="headerButton")を非表示にし、
  //div(id="phase2")を表示
  document.getElementById("phase1").hidden = true;
  document.getElementById("headerButton").hidden = true;
  document.getElementById("phase2").hidden = false;
}

//cards内の要素をランダムに入れ替えた配列を返す
//cards = (KyoukiCardの)配列
function shuffle(cards) {
  var tempArray = [];
  cards.forEach(function (d) {
    var tempObj = cloneObj(d);
    if (Math.floor(Math.random() * 2) % 2 === 0) {
      tempArray.push(tempObj);
    } else {
      tempArray.unshift(tempObj);
    }
  });
  return tempArray.slice();
}

//山札作成
function createDeck() {
  //選ばれたカードを別の配列にコピー
  var shuffleCards = chosenCards.slice();
  //カードをシャッフル
  for (i = 0; i < 10; i++)
    shuffleCards = shuffle(shuffleCards);
  //シャッフルしたカードを山札にコピー
  deck = shuffleCards.slice();
  //山札の残り枚数をspan(id="numCards")内に表示
  document.getElementById("numCards").textContent = "山札の残り枚数：" + deck.length;
}

//山札からカードを引く
function drawCard() {
  var drawnCard = deck.pop();
  //山札から引いたカードをテキストエリアに表示
  KyoukiCardForm.KyoukiCardArea.value = drawnCard.toString();
  //引いたカードの名前をログに表示
  KyoukiCardForm.logArea.value += "【" + drawnCard.name + "】を引きました。\n";
  //山札が全て無くなった場合、山札からドローできなくする
  if (deck.length === 0) {
    window.alert("山札が全て無くなり、狂気の濁流が発生しました。バッドエンド表を振ってください。")
    document.getElementById("drawButton").disabled = true;
    KyoukiCardForm.logArea.value += "山札が全て無くなり、狂気の濁流が発生しました。バッドエンド表を振ってください。";
  }
  //山札の残り枚数をspan(id="numCards")内に表示
  document.getElementById("numCards").textContent = "山札の残り枚数：" + deck.length;
  //ログのスクロールを最下部に移動
  KyoukiCardForm.logArea.scrollTop = document.getElementById("logArea").scrollHeight;
}

//「オリジナルカードを追加」機能実装予定
//「選んだ中から何枚選ぶ」機能実装予定
