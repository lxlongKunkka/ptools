require('dotenv').config();
const axios = require('axios');

// 格式优化函数（对应原程序的格式处理逻辑）
function optimizeMarkdown(text) {
    // 统一公式格式：\(xxx\) → $xxx$，\[xxx\] → $$xxx$$
    text = text.replace(/\\\(([^)]+)\\\)/g, '$1$');
    text = text.replace(/\\\[([^\]]+)\\\]/g, '$$$1$$');
    
    // 确保代码块格式正确（去除多余空格）
    text = text.replace(/```\s*(\w+)/g, '```$1');
    
    // 清理多余空行（最多保留2个连续空行）
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // 统一标题格式（确保二级标题，避免一级标题）
    text = text.replace(/^#\s(.+)$/gm, '## $1');
    
    return text;
}

// 核心翻译函数
async function translateText(sourceText, model = 'o4-mini') {
    // 验证API密钥
    if (!process.env.YUNWU_API_KEY) {
        throw new Error('未设置YUNWU_API_KEY环境变量');
    }

    // 验证输入文本
    if (!sourceText || sourceText.trim() === '') {
        throw new Error('请输入需要翻译的英文题目');
    }

    // 构建系统提示（保持原有的翻译规则）
    const systemPrompt = `你是一个专业的算法题目翻译器，专门处理指定网站的题目。请将题目准确地翻译成中文，并按照以下要求进行格式化和内容替换：
## 翻译要求：
1. **角色替换规则**：
   - 面条老师 → 大维
   - 青橙老师 → 芳芳
   - 姜饼老师 → 蛐蛐
   - 雪球老师 → 高高
   - 麋鹿老师 → 新新
   - 小Z → 程程
   - 其他老师角色 → 根据性别和特征选择岐岐或麦麦
2. **内容处理**：
   - 完全去掉题干中所有"核桃"相关的内容和描述
   - 保持原题目的数学逻辑和算法要求不变
   - 保持题目的难度和复杂度不变
   - 保持题干内容不变，不要增加过多的解释
3. **公式格式**：
   - 所有数学公式必须使用LaTeX格式
   - 行内公式使用单个 $ 包裹
   - 将原有的 \\( \\) \\[ \\] 等格式统一转换为 $ 和 $$ 格式
## 输出格式：
题目背景
[根据题目描述给出一个有趣的题目背景，去掉核桃相关内容]
## 题目描述
[题目描述的翻译，替换角色并去掉核桃相关内容]
题目中的公式块要用 $$ 表达
## 输入格式
[输入格式]
## 输出格式
[输出格式]
## 样例
\`\`\`input1
[样例输入]
\`\`\`
\`\`\`output1
[样例输出]
\`\`\`
\`\`\`input2
[样例输入]
\`\`\`
\`\`\`output2
[样例输出]
\`\`\`
### 样例解释
[样例解释]
## 数据范围
[数据范围的翻译]
## 注意事项：
1. 保留所有数学公式和算法复杂度表示（如$O(n)$、$O(n^2)$等）
2. 保持原题结构和编号不变
3. 专业术语翻译准确
4. 中文表达流畅自然
5. 确保角色替换后故事逻辑连贯
6. 完全去除核桃相关的内容，但保持题目的数学本质不变`;

    try {
        // 调用yunwu.ai API（保持原有的请求参数）
        const response = await axios({
            method: 'post',
            url: 'https://yunwu.ai/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.YUNWU_API_KEY}`
            },
            data: {
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: sourceText.trim() }
                ],
                temperature: 0.1,
                max_tokens: 32767,
                timeout: 600000 // 10分钟超时
            }
        });

        // 处理返回结果并优化格式
        let translatedText = response.data.choices[0].message.content;
        translatedText = optimizeMarkdown(translatedText);

        return {
            success: true,
            originalText: sourceText.trim(),
            translatedText: translatedText,
            model: model
        };

    } catch (error) {
        console.error('翻译错误:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || '翻译失败，请稍后重试');
    }
}

// 暴露模块接口
module.exports = {
    translateText
};