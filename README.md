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

## ストア

Chrome: [Chrome ウェブストア](https://chromewebstore.google.com/detail/%E3%83%8B%E3%82%B3%E8%A6%8B%E3%81%AA%E3%81%B9/jmjabpdbhfibkhglmeifkibbefhibmgf?hl=ja)  
Firefox: [Firefox ADD-ONS]()
