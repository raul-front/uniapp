VERSION=${shell sed -n '1p' VERSION.txt}
DESCRIPTION=${shell sed -n '2p' VERSION.txt}
WX_APPID:=wx7e41671fa25c5fdc
EXAMPLESTARTLINE=${shell sed -n '/exampleStart/=' src/pages.json} # 示例页面配置的开始行
EXAMPLEENDLINE=${shell sed -n '/exampleEnd/=' src/pages.json} # 示例页面配置的结束行

# 清除pages.json中的示例页面
# pagesK文件夹不用删除，没有里面的页面配置时，pagesK文件不会打包进去
clear:
	@echo clear pages.json line: ${EXAMPLESTARTLINE} '~' ${EXAMPLEENDLINE}
	@sed -i'.bak' '${EXAMPLESTARTLINE},${EXAMPLEENDLINE}d' src/pages.json

# 打包后恢复pages.json文件
back:
	@rm src/pages.json
	@mv src/pages.json.bak src/pages.json


# 微信相关
wx-test:
	@$(call uploadWeixin,test,测试版本：,3);
wx-pre:
	@$(call uploadWeixin,pre,预上线版本：,2);
wx-release:
	@$(call uploadWeixin,release,,1);
# 上传微信方法，参数说明（环境变量，描述前缀，机器人编号）
define uploadWeixin
	echo "============ 上传微信-$(1) ============" \
	&& echo "Step 1/4. 清除pages.json配置" \
	&& make clear \
	&& echo "Step 2/4. 构建代码" \
	&& npm run ${1} \
	&& echo "Step 3/4. 恢复pages.json文件" \
	&& make back \
	&& echo "Step 4/4. 上传微信代码包" \
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
