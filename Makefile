VERSION=${shell sed -n '1p' VERSION.txt}
DESCRIPTION=${shell sed -n '2p' VERSION.txt}
WX_APPID:=wx7e41671fa25c5fdc

# 微信相关
wx-test:
	$(call uploadWeixin,test,测试版本：,3);
wx-pre:
	@$(call uploadWeixin,pre,预上线版本：,2);
wx-release:
	@$(call uploadWeixin,release,,1);
# 上传微信方法，参数说明（环境变量，描述前缀，机器人编号）
define uploadWeixin
	echo "============ 上传微信-$(1) ============" \
	&& npm run ${1} \
	&& which miniprogram-ci || npm install -g miniprogram-ci \
	&& miniprogram-ci upload \
		--pp ./dist/weixin/$(1) \
		--pkp ./private.${WX_APPID}.key \
		--appid ${WX_APPID} \
		--uv ${VERSION} \
		--ud $(2)${DESCRIPTION} \
		-r $(3) \
		--enable-es6 true
endef
