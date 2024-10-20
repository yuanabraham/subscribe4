{
	"request": [
		{
			"enable": true,
			"name": "Google APIs",
			"ruleType": "redirect",
			"matchType": "regexp",
			"pattern": "^http(s?)://ajax\\.googleapis\\.com/(.*)",
			"exclude": "",
			"isFunction": false,
			"action": "redirect",
			"to": "https://gapis.geekzu.org/ajax/$2",
			"group": "Google Redirect"
		},
		{
			"enable": true,
			"name": "reCaptcha",
			"ruleType": "redirect",
			"matchType": "regexp",
			"pattern": "^http(s?)://(?:www\\.|recaptcha\\.|)google\\.com/recaptcha/(.*)",
			"exclude": "",
			"isFunction": false,
			"action": "redirect",
			"to": "https://recaptcha.net/recaptcha/$2",
			"group": "Google Redirect"
		}
	],
	"sendHeader": [],
	"receiveHeader": [
		{
			"enable": true,
			"name": "Content Security Policy Header Modification",
			"ruleType": "modifyReceiveHeader",
			"matchType": "all",
			"pattern": "",
			"exclude": "",
			"isFunction": true,
			"code": "let rt = detail.type;\nif (rt === 'script' || rt === 'stylesheet' || rt === 'main_frame' || rt === 'sub_frame') {\n  for (let i in val) {\n    if (val[i].name.toLowerCase() === 'content-security-policy') {\n      let s = val[i].value;\n      s = s.replace(/googleapis\\.com/g, '$& https://gapis.geekzu.org');\n      s = s.replace(/recaptcha\\.google\\.com/g, '$& https://recaptcha.net');\n      s = s.replace(/google\\.com/g, '$& https://recaptcha.net');\n      s = s.replace(/gstatic\\.com/g, '$& https://*.gstatic.cn');\n      val[i].value = s;\n    }\n  }\n}",
			"group": "Google Redirect"
		}
	]
}
