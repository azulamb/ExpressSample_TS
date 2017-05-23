# ExpressSample_TS

TypeScript利用時のExpress+Passport(Twitter)+Session(Redis)のサンプルです。

この組み合わせなのは、自分がよく使いそうだからです。

## 環境変数

以下の環境変数が必要です。

* TWITTER_CONSUMER_KEY
* TWITTER_CONSUMER_SECRET
* REDIS_HOST
	* 省略時 `127.0.0.1`
* REDIS_PORT
	* 省略時 `6379`
* PORT
	* 省略時 `3080`
* BASE_URL
	* 省略時 `http://localhost:3080/`
* COOKIE_TIME
	* ログイン持続時間。秒指定。
	* 省略時 `3600`
* SECRET_KEY
	* 省略時 `secret`
