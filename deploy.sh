#!/bin/bash

echo "🚀 职业测评部署脚本"
echo "===================="
echo ""

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
else
    echo "✅ Vercel CLI 已安装"
fi

echo ""
echo "📋 检查项目文件..."

if [ ! -f "package.json" ]; then
    echo "❌ 错误：找不到 package.json"
    exit 1
fi

echo "✅ 项目文件完整"
echo ""

# 安装依赖
echo "📦 安装项目依赖..."
npm install

echo ""
echo "🏗️  本地构建测试..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo ""
echo "🚀 开始部署到 Vercel..."
echo ""

# 部署到 Vercel
vercel --prod

echo ""
echo "✨ 部署完成！"
echo ""
echo "📱 小红书营销建议："
echo "  1. 复制上面的 Vercel URL"
echo "  2. 使用 bitly.com 生成短链接"
echo "  3. 在 qrcode-monkey.com 生成二维码"
echo "  4. 在小红书发布引流内容"
echo ""
echo "💡 下一步："
echo "  - 绑定自定义域名: vercel domains add yourdomain.com"
echo "  - 查看数据分析: https://vercel.com/dashboard"
echo "  - 修改测评内容: 编辑 app/page.tsx"
echo ""
echo "🎉 祝你售卖成功！"
