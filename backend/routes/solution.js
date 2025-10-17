const express = require('express');
const router = express.Router();

// 题解生成接口
router.post('/', async (req, res) => {
  try {
    const { problem, type = 'detailed' } = req.body;

    // 校验参数
    if (!problem || typeof problem !== 'string' || problem.trim() === '') {
      return res.status(400).json({
        success: false,
        error: '请输入有效的题目描述'
      });
    }

    const trimmedProblem = problem.trim();
    let solution = '';

    // 根据题解类型生成不同内容（模拟，实际项目可对接AI）
    if (type === 'detailed') {
      // 详细步骤版
      solution = `# 题目：${trimmedProblem}

## 解题思路
1. 分析题目需求：明确题目要求实现的功能（如计算数组和、排序等）
2. 确定数据结构：根据需求选择合适的数据结构（如数组、哈希表）
3. 设计算法逻辑：
   - 步骤1：初始化必要的变量（如sum=0、result=[]）
   - 步骤2：遍历或处理输入数据（如循环数组元素）
   - 步骤3：实现核心逻辑（如累加元素到sum）
   - 步骤4：返回结果（如return sum）
4. 测试边界情况：验证特殊输入（如空数组、负数、超大值）

## 代码实现（JavaScript）
function solve() {
  // 假设题目是"计算数组所有元素的和"
  const arr = [1, 2, 3, 4]; // 示例输入
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // 累加每个元素
  }
  return sum; // 返回结果
}

## 复杂度分析
- 时间复杂度：O(n)（n为数组长度，只需遍历一次）
- 空间复杂度：O(1)（仅用固定变量存储结果）

## 注意事项
1. 需处理输入为空的情况（如arr.length === 0时返回0）
2. 需考虑数据类型（如是否有非数字元素）`;

    } else if (type === 'concise') {
      // 简洁思路版
      solution = `# 题目：${trimmedProblem}

## 核心思路
- 核心需求：计算输入数据的目标结果（如数组和）
- 关键步骤：遍历数据 + 累加计算
- 代码核心：
  let sum = 0;
  arr.forEach(item => sum += item);
  return sum;

## 复杂度
- 时间：O(n)，空间：O(1)

## 边界处理
- 空输入返回0
- 非数字元素需过滤或报错`;

    } else if (type === 'optimized') {
      // 优化方案版
      solution = `# 题目：${trimmedProblem}

## 方案1：暴力遍历（基础版）
- 逻辑：循环遍历所有元素累加
- 代码：
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
- 复杂度：O(n)，空间O(1)

## 方案2：数组方法（简洁版）
- 逻辑：使用reduce方法简化代码
- 代码：
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
- 优势：代码更简洁，可读性高

## 方案3：并行计算（大数据优化版）
- 逻辑：拆分数据为多段，并行计算（适合超大数组）
- 适用场景：数据量超过10万条时
- 复杂度：O(n/k)（k为拆分次数）

## 推荐方案
- 日常开发：方案2（平衡简洁性和性能）
- 大数据场景：方案3（需结合多线程）`;
    }

    // 返回结果
    res.json({
      success: true,
      solution: solution,
      type: type,
      problem: trimmedProblem
    });

  } catch (error) {
    console.error('题解生成失败：', error);
    res.status(500).json({
      success: false,
      error: '题解生成失败，请稍后重试'
    });
  }
});

module.exports = router;