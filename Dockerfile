# 使用するNode.jsのバージョンを指定
FROM node:20.9.0-alpine

# アプリケーションディレクトリを作成
WORKDIR /app

# アプリケーションの依存関係ファイルをコピー
COPY package*.json ./

# アプリケーションの依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# TypeScriptのコンパイル
RUN npm run build

# アプリケーションがリッスンするポート番号を指定
EXPOSE 3000

# アプリケーションの起動
CMD [ "node", "dist/index.js" ]