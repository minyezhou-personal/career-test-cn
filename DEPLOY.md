# 🚀 部署指南

## 快速部署到 Vercel（5 分钟搞定）

### 步骤 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### 步骤 2: 登录 Vercel

```bash
vercel login
```

选择登录方式（GitHub/GitLab/Bitbucket/Email）

### 步骤 3: 部署项目

在项目根目录运行：

```bash
vercel
```

按照提示操作：
- **Set up and deploy?** → Yes
- **Which scope?** → 选择你的账号
- **Link to existing project?** → No
- **What's your project's name?** → career-test-cn （或自定义）
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

等待部署完成，你会得到一个 Vercel URL。

### 步骤 4: 生产部署

```bash
vercel --prod
```

这会将你的应用部署到生产环境，并给你一个正式的域名。

## 🌐 绑定自定义域名

1. 登录 [vercel.com](https://vercel.com)
2. 进入你的项目
3. 点击 "Settings" → "Domains"
4. 添加你的域名
5. 按照说明配置 DNS 记录

## 📊 查看分析数据

Vercel 自动提供：
- 访问量统计
- 性能指标
- 错误日志
- 部署历史

在项目面板中点击 "Analytics" 查看。

## 🔄 更新部署

每次修改代码后，只需运行：

```bash
vercel --prod
```

或者推送到 GitHub，如果你设置了自动部署。

## 💡 小红书引流设置

1. **简介示例**
```
🎯 专业职业测评 | 找到最适合你的方向
现在就去体验测评
```

## ⚡ 性能优化建议

已配置的优化：
- ✅ Next.js 14 自动代码分割
- ✅ Vercel Edge Network CDN
- ✅ 图片和字体优化
- ✅ 响应式设计

## 🛡️ 安全设置

在 Vercel Dashboard:
1. Environment Variables → 添加敏感配置
2. 设置 CORS 策略
3. 配置 Rate Limiting（防止滥用）

## 🎨 自定义品牌

修改 `app/globals.css` 中的颜色：

```css
/* 主色调 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 改为你的品牌色，例如： */
background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
```

## 📈 追踪转化

添加 Google Analytics 或百度统计：

在 `app/layout.tsx` 添加追踪代码。

## ❓ 常见问题

**Q: 部署失败怎么办？**
A: 检查 `package.json` 中的依赖版本，运行 `npm install` 确保本地能构建成功。

**Q: 如何修改测评题目？**
A: 编辑 `app/page.tsx` 中的 `questions` 数组。

**Q: 如何添加更多职业路径？**
A: 在 `careerPaths` 对象中添加新的路径，并修改 `calculateResult` 函数的计分逻辑。

**Q: 可以添加数据库吗？**
A: 可以，推荐使用 Vercel Postgres 或 PlanetScale。

## 🎉 完成

恭喜！你的职业测评网站已经上线了！

下一步：
- 在小红书发布引流内容
- 收集用户反馈
- 持续优化测评算法

祝你在小红书售卖成功！💰
