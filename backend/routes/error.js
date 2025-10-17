const express = require('express');
const router = express.Router();

// 代码查错接口
router.post('/', async (req, res) => {
  try {
    const { code, language = 'javascript' } = req.body;

    // 校验参数
    if (!code || typeof code !== 'string' || code.trim() === '') {
      return res.status(400).json({
        success: false,
        error: '请输入待查错的代码'
      });
    }

    const trimmedCode = code.trim();
    let errors = [];
    let correctedCode = '';

    // 根据语言模拟查错（实际项目可集成ESLint、Pylint等工具）
    switch (language.toLowerCase()) {
      case 'javascript':
        // 模拟JavaScript代码查错
        if (trimmedCode.includes('function') && !trimmedCode.includes('}')) {
          // 检测到函数缺少闭合括号
          errors.push({
            message: '函数定义缺少闭合括号（}），可能导致语法错误',
            position: '代码末尾'
          });
          // 生成修正代码
          correctedCode = trimmedCode + '\n}';
        } else if (trimmedCode.includes('console.log') && !trimmedCode.includes(';')) {
          // 检测到缺少分号
          errors.push({
            message: 'console.log语句缺少分号（;），虽然JavaScript允许自动分号插入，但建议显式添加',
            position: 'console.log语句末尾'
          });
          correctedCode = trimmedCode.replace(/console\.log\(([^)]+)\)/g, 'console.log($1);');
        } else {
          errors.push({
            message: '未检测到明显语法错误，但建议检查：1. 变量是否声明 2. 函数参数是否完整 3. 条件判断是否有遗漏',
            position: '全局'
          });
          correctedCode = trimmedCode;
        }
        break;

      case 'python':
        // 模拟Python代码查错
        if (trimmedCode.includes('def') && !trimmedCode.includes(':')) {
          errors.push({
            message: '函数定义缺少冒号（:），Python函数定义必须以冒号结尾',
            position: 'def函数行末尾'
          });
          correctedCode = trimmedCode.replace(/def\s+(\w+)\(/, 'def $1(') + ':';
        } else if (trimmedCode.includes('for') && !trimmedCode.includes('in')) {
          errors.push({
            message: 'for循环缺少in关键字，Python for循环格式应为"for 变量 in 可迭代对象:"',
            position: 'for循环行'
          });
          correctedCode = trimmedCode.replace(/for\s+(\w+)/, 'for $1 in range(10)'); // 示例修正
        } else {
          errors.push({
            message: '未检测到明显语法错误，但建议检查：1. 缩进是否统一 2. 字符串引号是否闭合 3. 关键字拼写是否正确',
            position: '全局'
          });
          correctedCode = trimmedCode;
        }
        break;

      default:
        return res.status(400).json({
          success: false,
          error: `暂不支持 ${language} 语言的代码查错`
        });
    }

    // 返回查错结果
    res.json({
      success: true,
      errors: errors,
      correctedCode: correctedCode,
      language: language.toLowerCase()
    });

  } catch (error) {
    console.error('代码查错失败：', error);
    res.status(500).json({
      success: false,
      error: '代码查错失败，请稍后重试'
    });
  }
});

module.exports = router;