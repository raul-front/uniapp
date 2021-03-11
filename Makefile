APPID:=wx7e41671fa25c5fdc
VERSION=${shell sed -n '1p' VERSION.txt}
DESCRIPTION=${shell sed -n '2p' VERSION.txt}

# 测试版
test:
	which miniprogram-ci || npm install -g miniprogram-ci
	miniprogram-ci \
		upload \
		--pp ./dist/weixin/test \
		--pkp ./private.${APPID}.key \
		--appid ${APPID} \
		--uv ${VERSION} \
		--ud 测试版本：${DESCRIPTION} \
		-r 3 \
		--enable-es6 true

# 预上线版
pre:
	which miniprogram-ci || npm install -g miniprogram-ci
	miniprogram-ci \
		upload \
		--pp ./dist/pre/weixin/pre \
		--pkp ./private.${APPID}.key \
		--appid ${APPID} \
		--uv ${VERSION} \
		--ud 预上线版本：${DESCRIPTION} \
		-r 2 \
		--enable-es6 true

# 正式版
release:
	which miniprogram-ci || npm install -g miniprogram-ci
	miniprogram-ci \
		upload \
		--pp ./dist/weixin/build \
		--pkp ./private.${APPID}.key \
		--appid ${APPID} \
		--uv ${VERSION} \
		--ud ${DESCRIPTION} \
		-r 1 \
		--enable-es6 true

preview:
	miniprogram-ci \
		preview \
		--pp ./ \
		--pkp ./private.${APPID}.key \
		--appid ${APPID} \
		--uv ${VERSION} \
		-r 5 \
		--enable-es6 true \
		--qrcode-format image \
		--qrcode-output-dest '/tmp/x.jpg' \
