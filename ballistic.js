(function() {

  // 良く利用するcreatejsのオブジェクトはAliasを作る。
  var Bitmap = createjs.Bitmap,
    Tween = createjs.Tween,
    Ease = createjs.Ease;

  // 描画対象となるステージ
  var stage = null;

  // preload.jsで読み込む素材を保持する配列
  var assets = {};

  // バリスティックが発動するまでの時間
  var DURATION_EXPLODE = 4000;

  var MEMBER = ["a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4"];
  var member = ["a1", "a2", "a3", "a4", "b1", "b2", "b3", "b4"];
  var me = null;
  var group_me = 0;

  // 円1の座標
  var X_CENTER_CIRCLE1 = 150;
  var Y_CENTER_CIRCLE1 = 150;
  // 円2の座標
  var X_CENTER_CIRCLE2 = 500;
  var Y_CENTER_CIRCLE2 = 150;

  // 円の基準点の座標
  var X_REG_CIRCLE = 150;
  var Y_REG_CIRCLE = 150;

  // メンバーアイコンの初期座標
  var X_INIT_MICON = 325;
  var Y_INIT_MICON = 0;
  var REGX_MICON = 20;
  var REGY_MICON = 20;

  // メンバーアイコンの変更を受け付けるためのマスク
  var mask_change_me = false;

  var randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var randomArr = function(array, num) {
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      var i = Math.random() * l | 0;
      r[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return r;
  }

  // スタートを押したとき
  $("#start").click(function() {
    if (me != null) {
      member.push(me);
      me = "";
    }

    var y = 0;
    for (var i = 0; i < member.length; i++) {
      var bm = stage.getChildByName(member[i]);
      bm.name = member[i];
      bm.x = 300;
      bm.y = y;
      y += 40;
    }

    me = $("#me").val();
    var pos = $.inArray(me, member);
    member.splice(pos, 1);

    stage.update();
    nextScene();
  });

  // onloadイベントの登録
  window.onload = function() {
    //canvasObject=document.getElementById('canvas');
    stage = new createjs.Stage("canvas");

    // preloadjsを使って画像を読み込む。
    var loadManifest = [{
      id: "cout",
      src: "./img/circle_out.png"
    }, {
      id: "cin",
      src: "./img/circle_in.png"
    }, {
      id: "a1",
      src: "./img/a1.png"
    }, {
      id: "a2",
      src: "./img/a2.png"
    }, {
      id: "a3",
      src: "./img/a3.png"
    }, {
      id: "a4",
      src: "./img/a4.png"
    }, {
      id: "b1",
      src: "./img/b1.png"
    }, {
      id: "b2",
      src: "./img/b2.png"
    }, {
      id: "b3",
      src: "./img/b3.png"
    }, {
      id: "b4",
      src: "./img/s1.png"
    }];
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", loadFile);
    loader.addEventListener("complete", startAnimation);
    loader.loadManifest(loadManifest, true);
  }

  // preload.jsでファイルを一つ読み込むたびに、呼ばれる関数。
  var loadFile = function(event) {
    console.log("event", event);
    assets[event.item.id] = event.result;
  }

  var updateMe = function(event) {
    group_me = event.target.id;
    var node_me = stage.getChildByName(me);
    node_me.x = event.stageX;
    node_me.y = event.stageY;
    stage.update();
  }

  // メンバーのマークを掃除
  var memberSweeper = function() {
    var y = Y_INIT_MICON;
    for (var i = 0; i < MEMBER.length; i++) {
      var node = stage.getChildByName(MEMBER[i]);
      node.x = X_INIT_MICON;
      node.y = y;
      y += 40;
    }
  }

  // 次の問題へ
  var nextScene = function() {
    // アニメーションが終わるまでアイコン変更を受け付けない
    mask_change_me = false;
    // メンバーアイコンのお掃除
    memberSweeper();

    group_me = 0;
    pair = randomArr(member, 2);
    var c_size = randomArr([
      ["big", "big"],
      ["big", "small"],
      ["small", "big"],
      ["small", "small"]
    ], 1)[0];

    var target1 = stage.getChildByName(pair[0]);
    target1.x = 150;
    target1.y = 150;
    //    stage.addChild(target1);

    var target2 = stage.getChildByName(pair[1]);
    target2.x = 500;
    target2.y = 150;
    //stage.addChild(target2);

    var c1out = stage.getChildByName("c1out");
    var c1in = stage.getChildByName("c1in");
    var c2out = stage.getChildByName("c2out");
    var c2in = stage.getChildByName("c2in");
    var cov1 = stage.getChildByName("cover1");
    var cov2 = stage.getChildByName("cover2");

    console.log(c_size[0]);
    if (c_size[0] == "big") {
      c1out.scaleX = 1.0;
      c1out.scaleY = 1.0;
      c1in.scaleX = 1.0;
      c1in.scaleY = 1.0;
      cov1.setTransform(0, 0, 1.0, 1.0);
    } else {
      c1out.scaleX = 0.4;
      c1out.scaleY = 0.4;
      c1in.scaleX = 0.4;
      c1in.scaleY = 0.4;
      cov1.setTransform(90, 90, 0.4, 0.4);
    }
    if (c_size[1] == "big") {
      c2out.scaleX = 1.0;
      c2out.scaleY = 1.0;
      c2in.scaleX = 1.0;
      c2in.scaleY = 1.0;
      cov2.setTransform(0, 0, 1.0, 1.0);
    } else {
      c2out.scaleX = 0.4;
      c2out.scaleY = 0.4;
      c2in.scaleX = 0.4;
      c2in.scaleY = 0.4;
      cov2.setTransform(300, 90, 0.4, 0.4);
    }

    var g = solver(pair[0], pair[1], c_size[0], c_size[1]);
    console.log(g[0], g[1]);

    Tween.get(c1out, {
        loop: true
      })
      .to({
        rotation: 360
      }, DURATION_EXPLODE, Ease.linear)
      .pause();
    Tween.get(c1in, {
        loop: true
      })
      .to({
        rotation: -360
      }, DURATION_EXPLODE, Ease.linear)
      //         .wait(DURATION_EXPLODE)
      .pause();
    Tween.get(c2out, {
        loop: true
      })
      .to({
        rotation: 360
      }, DURATION_EXPLODE, Ease.linear)
      //         .wait(duration)
      .pause();
    Tween.get(c2in, {
        loop: true
      })
      .to({
        rotation: -360
      }, DURATION_EXPLODE, Ease.linear)
      //         .wait(duration)
      .pause();
    window.setTimeout(function(){ checker(g[0], g[1], pair[0], pair[1]) }, DURATION_EXPLODE+100);
    window.setTimeout(nextScene,DURATION_EXPLODE+3000);
  }

  var solver = function(t1, t2, circle1, circle2) {
    var g1 = [];
    var g2 = [];
    // 対象のa or bが同じなら番号がcircle1 < circle2になるように入れ替える
    // 対象のa or bが異なるならcircle1がa、circle2がbになるように入れ替える
    var is_swap = false;
    if ((t1[0] == 'a' && t2[0] == 'a') || (t1[0] == 'b' && t2[0] == 'b')) {
      if (t1[1] > t2[1]) {
        circle2 = [circle1, circle1 = circle2][0];
        t2 = [t1, t1 = t2][0];
        is_swap = true;
      }
    } else {
      if (t1[0] == 'b') {
        circle2 = [circle1, circle1 = circle2][0];
        t2 = [t1, t1 = t2][0];
        is_swap = true;
      }
    }

    var isTargeted = function(n) {
      if (t1 == n || t2 == n)
        return true;
      else
        return false;
    }

    // a+aの場合
    if (t1[0] == 'a' && t2[0] == 'a') {
      // 対象でなければa1は必ず入る
      if (!isTargeted("a1")) {
        g1.push("a1");
      }
      // a1が対象ならa2は入る
      // 数小さい側が大円ならa2は入る
      if ((isTargeted("a1") || circle1 == "big") && !isTargeted("a2")) {
        g1.push("a2");
      }
      // 小さい番号の方が大円のときa3は入る
      // 小さい番号の方が小円でもa1とa2が対象の場合a3は入る
      if ((circle1 == "big" || (isTargeted("a1") && isTargeted("a2"))) && !isTargeted("a3")) {
        g1.push("a3");
      }
      // 小さい番号の方が大円ならa4は入る
      if (circle1 == "big" && !isTargeted("a4")) {
        g1.push("a4");
      }
      // b1は必ず大きい番号の方に入る
      g2.push("b1");
      // b2は番号が大きい方が大円なら入る
      if (circle2 == "big") {
        g2.push("b2");
      }
    }
    // b+bの場合
    if (t1[0] == 'b' && t2[0] == 'b') {
      // a1は必ず入る
      g1.push("a1");
      // 小さい番号の方が大円ならa2は入る
      if (circle1 == "big")
        g1.push("a2");
      // a3は必ず入る
      g2.push("a3");
      // 大きい番号の方が大円ならa4は入る
      if (circle2 == "big")
        g2.push("a4");
    }
    // a+bの場合
    if (t1[0] == 'a' && t2[0] == 'b') {
      // 対象でなければa1は必ず入る
      if (!isTargeted("a1")) {
        g1.push("a1");
      }
      // a1が対象ならa2は入る
      // a側が大円なら必ず入る
      if ((isTargeted("a1") || circle1 == "big") && !isTargeted("a2")) {
        g1.push("a2");
      }
      // a側が大円かつa1かa2が対象であればa3は入る
      if ((circle1 == "big" && (isTargeted("a1") || isTargeted("a2"))) && !isTargeted("a3")) {
        g1.push("a3");
      }
      // 対象でなければb1は必ず入る
      if ((t1[0] == 'a' || t2[0] == 'a') && !isTargeted("b1")) {
        g2.push("b1");
      }
      // b1が対象ならb2は入る
      // b側が大円ならb2は入る
      if ((isTargeted("b1") || circle2 == "big") && !isTargeted("b2")) {
        g2.push("b2");
      }
      // b側が大円かつb1かb2が対象であればb3は入る
      if ((circle2 == "big" && (isTargeted("b1") || isTargeted("b2"))) && !isTargeted("b3")) {
        g2.push("b3");
      }
    }
    if (is_swap)
      return [g2, g1];
    else
      return [g1, g2];
  }

  var checker = function(g1, g2, t1, t2) {
    console.log("group", g1, g2, t1, t2);
    var node_me = stage.getChildByName(me);

    for (var i = 0; i < g1.length; i++) {
      if (g1[i] != me)
        locate(g1[i], 150 + randomInt(-40, 40), 150 + randomInt(-40, 40));
    }
    for (var i = 0; i < g2.length; i++) {
      if (g2[i] != me)
        locate(g2[i], 500 + randomInt(-40, 40), 150 + randomInt(-40, 40));
    }

    console.log("kotaeawase", group_me, me);
    if ((group_me == 0) && (g1.indexOf(me) > -1)) {
      console.log("blowawayed", t1);
      blowAway(g1, me);
      blowAway([t1]);
    }
    if ((group_me == 0) && (g2.indexOf(me) > -1)) {
      console.log("blowawayed", t2);
      blowAway(g2, me);
      blowAway([t2]);
    }
    if ((group_me == 1) && (g1.indexOf(me) == -1)) {
      blowAway(g1);
      blowAway([me, t1]);
      if (g2.indexOf(me) > -1) {
        blowAway([t2]);
        blowAway(g2, me);
      }
    }
    if ((group_me == 2) && (g2.indexOf(me) == -1)) {
      blowAway(g2);
      blowAway([me, t2]);
      if (g1.indexOf(me) > -1) {
        blowAway([t1]);
        blowAway(g1, me);
      }
    }
  }

  var blowAway = function(g, except) {
    for (var i = 0; i < g.length; i++) {
      if (g[i] == except)
        continue;
      var node = stage.getChildByName(g[i]);
      Tween.get(node)
        .to({
          y: 0
        }, 200)
        .wait(1000)
        .to({
          y: 500
        }, 200);
    }
  }

  var locate = function(name, x, y) {
    var node = stage.getChildByName(name);
    node.x = x;
    node.y = y;
  }

  // preload.jsで全てのファイルの読み込みが完了したら、呼び出される関数。
  var startAnimation = function() {
    console.log("startAnimation is called. assets = ", assets["c1out"]);

    // Canvasでのアニメーションを動かし始める。
    createjs.Ticker.setFPS(10);
    createjs.Ticker.addEventListener("tick", function() {
      stage.update();
    });

    // カバー
    var cover1 = new createjs.Shape();
    cover1.name = "cover1";
    cover1.graphics.beginFill("yellow").drawCircle(150, 150, 150);
    cover1.addEventListener("click", updateMe);
    stage.addChild(cover1);

    var cover2 = new createjs.Shape();
    cover2.name = "cover2";
    cover2.graphics.beginFill("yellow").drawCircle(500, 150, 150);
    cover2.addEventListener("click", updateMe);
    stage.addChild(cover2);

    // 読み込んだ画像をStage上に描画する。
    var c1out = new Bitmap(assets["cout"]);
    c1out.name = "c1out";
    c1out.x = X_CENTER_CIRCLE1;
    c1out.y = Y_CENTER_CIRCLE1;
    c1out.regX = X_REG_CIRCLE;
    c1out.regY = Y_REG_CIRCLE;
    //    c1out.hitArea = cover1;
    //    c1out.addEventListener("click", updateMe);
    stage.addChild(c1out);

    var c1in = new Bitmap(assets["cin"]);
    c1in.name = "c1in";
    c1in.x = X_CENTER_CIRCLE1;
    c1in.y = Y_CENTER_CIRCLE1;
    c1in.regX = X_REG_CIRCLE;
    c1in.regY = Y_REG_CIRCLE;
    stage.addChild(c1in);

    var c2out = new Bitmap(assets["cout"]);
    c2out.name = "c2out";
    c2out.x = X_CENTER_CIRCLE2;
    c2out.y = Y_CENTER_CIRCLE2;
    c2out.regX = X_REG_CIRCLE;
    c2out.regY = Y_REG_CIRCLE;
    c2out.scaleX = 1.0;
    c2out.scaleY = 1.0;
    stage.addChild(c2out);

    var c2in = new Bitmap(assets["cin"]);
    c2in.name = "c2in";
    c2in.x = X_CENTER_CIRCLE2;
    c2in.y = Y_CENTER_CIRCLE2;
    c2in.regX = X_REG_CIRCLE;
    c2in.regY = Y_REG_CIRCLE;
    c2in.scaleX = 1.0;
    c2in.scaleY = 1.0;
    stage.addChild(c2in);

    var y = Y_INIT_MICON;
    for (var i = 0; i < member.length; i++) {
      var bm = new Bitmap(assets[member[i]]);
      bm.name = member[i];
      bm.x = X_INIT_MICON;
      bm.y = y;
      bm.regX = REGX_MICON;
      bm.regY = REGY_MICON;
      stage.addChild(bm);
      y += 40;
    }

    stage.update();

  }
})();
