# ニコ見なべ

ニコニコ用ブラウザ拡張機能の詰め合わせです。WXTを使って開発しています。

## 開発

```sh
npm install
npm run dev
```

Chrome向けの開発サーバーは`npm run dev`、Firefox向けは次のコマンドで起動できます。

```sh
npm run dev:firefox
```

## ビルド

```sh
npm run build
npm run build:firefox
npm run zip
npm run typecheck
```

ビルド成果物は`.output/`に生成されます。新しい機能は`entrypoints/`にcontent scriptやbackground scriptなどのentrypointを追加して実装してください。

## 機能

- ニコニコ動画の削除動画ページから共同墓地へ移動
- ノーマル、ランダム、マニュアル、オフ（無効化）の遷移モード設定
- 拡張機能ポップアップから現在のモード確認と設定画面の表示
- ニコ百の「シロナガスクジラ」表示切替

設定画面は拡張機能のポップアップから開けます。マニュアルモードでは`sm`または`nm`と動画番号を指定します。共同墓地機能を利用しない場合は「オフ」に設定できます。

## ストア

Chrome: [Chrome ウェブストア](https://chromewebstore.google.com/detail/%E3%83%8B%E3%82%B3%E8%A6%8B%E3%81%AA%E3%81%B9/jmjabpdbhfibkhglmeifkibbefhibmgf?hl=ja)  
Firefox: [Firefox ADD-ONS]()
