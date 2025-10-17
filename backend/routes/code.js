const express = require('express');
const router = express.Router();

// 代码生成接口
router.post('/', async (req, res) => {
  try {
    // 1. 解构请求参数，并添加边界校验（避免参数缺失）
    const { problem, language = 'javascript' } = req.body;
    
    // 若未传入题目描述，直接返回错误
    if (!problem || typeof problem !== 'string' || problem.trim() === '') {
      return res.status(400).json({
        success: false,
        error: '请传入有效的题目描述（非空字符串）'
      });
    }

    // 2. 生成对应语言的代码（修复字符串模板格式，确保生成的代码缩进整齐）
    let code = '';
    const trimmedProblem = problem.trim(); // 去除题目描述的前后空格

    switch (language.toLowerCase()) { // 支持大小写不敏感（如 "JavaScript" 或 "javascript"）
      case 'javascript':
        code = `// 解决 "${trimmedProblem}" 的 JavaScript 代码
function solution() {
  // 核心逻辑：根据题目需求实现
  // 示例：若题目是"计算两数之和"，可替换为 return a + b;
  console.log("处理题目：${trimmedProblem}");
  return "执行成功"; // 根据实际需求修改返回值
}

// 测试代码（可根据题目补充测试用例）
const testResult = solution();
console.log("测试结果：", testResult);`;
        break;

      case 'python':
        code = `# 解决 "${trimmedProblem}" 的 Python 代码
def solution():
    # 核心逻辑：根据题目需求实现
    # 示例：若题目是"计算两数之和"，可替换为 return a + b
    print("处理题目：${trimmedProblem}")
    return "执行成功"  # 根据实际需求修改返回值

# 测试代码（可根据题目补充测试用例）
test_result = solution()
print("测试结果：", test_result)`;
        break;

      // 3. 支持更多语言（可选扩展）
      case 'java':
        code = `// 解决 "${trimmedProblem}" 的 Java 代码
public class Solution {
    // 核心方法：根据题目需求实现
    public static String solution() {
        System.out.println("处理题目：${trimmedProblem}");
        return "执行成功"; // 根据实际需求修改返回值
    }

    // 测试入口
    public static void main(String[] args) {
        String testResult = solution();
        System.out.println("测试结果：" + testResult);
    }
}`;
        break;

      // 4. 未知语言的处理（避免返回空代码）
      default:
        return res.status(400).json({
          success: false,
          error: `暂不支持 ${language} 语言的代码生成，请选择 javascript/python/java`
        });
    }

    // 5. 返回成功结果（携带生成的代码）
    res.json({
      success: true,
      code: code, // 生成的代码（格式整齐，可直接复制使用）
      language: language.toLowerCase(), // 返回标准化的语言名称
      problem: trimmedProblem // 返回处理后的题目描述
    });

  } catch (error) {
    // 6. 捕获异常并返回友好错误（避免暴露服务器内部信息）
    console.error('代码生成失败：', error); // 日志记录错误详情（用于调试）
    res.status(500).json({
      success: false,
      error: '服务器内部错误，代码生成失败，请稍后重试'
    });
  }
});

module.exports = router;