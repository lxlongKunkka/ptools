const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { text } = req.body
    
    // 模拟翻译（实际项目可替换为调用OpenAI等API）
    const mockTranslation = `【翻译结果】\n${text.replace(/english/gi, '中文')}\n\n（实际项目中会调用翻译API返回准确结果）`
    
    res.json({
      success: true,
      result: mockTranslation
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router