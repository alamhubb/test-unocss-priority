import Breakpoints from "./Breakpoints";

export default class StylesUtil {
    static generateReactiveCss(rule: [RegExp, (match: string[]) => any]): [RegExp, (match: string[]) => any] {
        //返回的应该是newReg和包裹的方法
        const ruleReg = rule[0]
        const matchFun = rule[1]
        if (!ruleReg || !matchFun) {
            return rule
        }
        //第一个参数得到了
        const ruleStr = String(ruleReg)
        const newPointRuleStr = ruleStr.replace(/^\/\^(.+)\$\/$/, (inputText, matchVal) => {
            const newPointRule = '^((.+)\\:)?(' + matchVal + ')$'
            return newPointRule
        })

        const newPointRule = new RegExp(newPointRuleStr)

        //入参和返回参数都应该是两个方法
        function newMatchFun(matchStrAry: string[]) {
            //过滤掉自定义的参数，保留原始的参数
            const originalMatchStrAry = matchStrAry.filter((item, index) => ![1, 2, 3].includes(index))
            if (matchStrAry.length < 3) {
                return matchFun(originalMatchStrAry)
            }
            const point = matchStrAry[2]
            if (!Breakpoints.points.includes(point)) {
                return matchFun(originalMatchStrAry)
            }


            const matchRes = matchFun(originalMatchStrAry)

            let resStr = matchRes

            if (typeof matchRes !== "string") {
                resStr = JSON.stringify(resStr).replace(/"/g, '')
            }

            const endResStr = `
    @media (min-width: 768px) {
      .${point}\\:${matchStrAry[3]}${resStr}
      }
    `
            return endResStr
        }

        return [newPointRule, newMatchFun]
    }
}
