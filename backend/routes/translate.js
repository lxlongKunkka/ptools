// translate.js - 翻译功能路由模块
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// 翻译接口：处理 POST 请求，接收文本并返回翻译结果
router.post('/', async (req, res) => {
  try {
    // 1. 获取请求参数
    const { text, from = 'auto', to = 'zh' } = req.body;

    // 2. 验证输入
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: '请提供有效的文本内容（字符串格式）'
      });
    }

    // 3. 调用翻译 API（以云武AI为例，可替换为其他API）
    const apiResponse = await axios({
      method: 'POST',
      url: 'https://yunwu.ai/api/v1/translate', // 翻译API地址
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TRANSLATE_API_KEY}` // 从环境变量获取密钥
      },
      data: {
        text: text,         // 待翻译文本
        source_lang: from,  // 源语言（默认自动检测）
        target_lang: to     // 目标语言（默认中文）
      }
    });

    // 4. 处理API返回结果（根据实际API响应格式调整）
    const translatedText = apiResponse.data.result.translated_text;
    if (!translatedText) {
      throw new Error('翻译结果为空，请检查API响应格式');
    }

    // 5. 返回成功响应（保持统一格式）
    res.json({
      success: true,
      result: translatedText,
      meta: {
        from: from,
        to: to,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    // 6. 错误处理（区分不同错误类型）
    console.error('翻译接口错误:', error.message);
    
    // API调用失败
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        error: `翻译服务错误: ${error.response.data.message || '未知错误'}`,
        code: error.response.status
      });
    }
    
    // 其他错误（如参数错误、网络问题）
    res.status(500).json({
      success: false,
      error: error.message || '翻译处理失败，请稍后重试'
    });
  }
});

// 可选：添加GET请求测试接口
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: '翻译接口已就绪',
    example: 'POST /api/translate 传递 { "text": "Hello" } 即可获取翻译'
  });
});

module.exports = router;