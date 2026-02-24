import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '职业发展测评 - 找到最适合你的职业方向',
  description: '专业的职业发展测评工具，帮助你找到最适合的职业发展路径',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
