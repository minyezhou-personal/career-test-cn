'use client';

import { useState } from 'react';
import './globals.css';

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  // 技能与工作方式
  { id: 1, text: '我擅长解决复杂的技术问题', category: '技术能力' },
  { id: 2, text: '我喜欢学习新的技术和工具', category: '学习能力' },
  { id: 3, text: '我能够清晰地向他人解释复杂概念', category: '沟通能力' },
  { id: 4, text: '我擅长领导团队完成项目', category: '领导能力' },
  { id: 5, text: '我善于规划和组织工作', category: '管理能力' },
  { id: 16, text: '我喜欢把模糊的问题拆解成可执行的步骤', category: '问题拆解' },
  { id: 17, text: '我做决策时会先收集数据/证据再下结论', category: '分析能力' },
  { id: 18, text: '我更享受从 0 到 1 搭建/创造一个东西的过程', category: '创造力' },
  { id: 19, text: '我能在多方意见不一致时推动达成共识', category: '协作推进' },
  { id: 20, text: '我愿意承担不确定性，并在变化中快速调整', category: '适应性' },

  // 兴趣与偏好
  { id: 6, text: '我对前沿科技充满热情', category: '研究兴趣' },
  { id: 7, text: '我喜欢与客户/用户交流需求', category: '业务兴趣' },
  { id: 8, text: '我享受培训和指导他人的过程', category: '教育兴趣' },
  { id: 9, text: '我对创业和商业运营感兴趣', category: '创业兴趣' },
  { id: 10, text: '我喜欢独立工作和深入钻研', category: '研究兴趣' },
  { id: 21, text: '我对把产品/方案讲清楚并说服别人很有兴趣', category: '影响力' },
  { id: 22, text: '我喜欢把复杂信息写成清晰的文档/方案/总结', category: '表达输出' },
  { id: 23, text: '我更喜欢与人打交道，而不是长期对着电脑/数据', category: '社交偏好' },
  { id: 24, text: '我对“增长/转化/运营指标”这类问题有兴趣', category: '增长兴趣' },
  { id: 25, text: '我对“做事的流程与标准化”很敏感，喜欢优化效率', category: '流程优化' },

  // 职业价值观
  { id: 11, text: '工作与生活的平衡对我很重要', category: '价值观' },
  { id: 12, text: '我追求高收入和财务自由', category: '价值观' },
  { id: 13, text: '我希望工作能产生社会影响', category: '价值观' },
  { id: 14, text: '我看重工作的稳定性', category: '价值观' },
  { id: 15, text: '我渴望在工作中不断创新', category: '价值观' },
  { id: 26, text: '我更看重“成长空间”，愿意为成长去更快节奏的环境', category: '价值观' },
  { id: 27, text: '我希望我的工作能看到明确的结果与反馈（而非长期才见效）', category: '价值观' },
  { id: 28, text: '我更愿意成为某个领域的专家，而不是做很多杂事', category: '价值观' },
  { id: 29, text: '我希望未来能拥有更高的自主权（时间/地点/选择）', category: '价值观' },
  { id: 30, text: '我能接受压力与竞争，并愿意为目标持续投入', category: '价值观' },
];

const careerPaths = {
  '技术专家': {
    description: '你适合深入钻研技术，成为某个领域的专家',
    careers: ['高级工程师', '技术架构师', '首席技术专家', '技术顾问'],
    skills: ['深度技术能力', '问题解决', '持续学习'],
  },
  '技术管理': {
    description: '你适合带领技术团队，平衡技术与管理',
    careers: ['技术经理', '工程总监', 'CTO', '研发VP'],
    skills: ['领导力', '技术视野', '团队管理', '战略规划'],
  },
  '产品技术': {
    description: '你适合连接技术与业务，打造优秀产品',
    careers: ['技术产品经理', '解决方案架构师', '售前工程师'],
    skills: ['技术理解', '商业思维', '沟通能力'],
  },
  '独立创业': {
    description: '你适合创办自己的公司或成为独立开发者',
    careers: ['创业者', '独立开发者', '自由职业者', '技术咨询师'],
    skills: ['全栈能力', '商业敏锐度', '自驱力', '风险承受'],
  },
  '教育培训': {
    description: '你适合分享知识，培养下一代技术人才',
    careers: ['技术讲师', '培训师', '大学教师', '技术博主'],
    skills: ['教学能力', '表达能力', '耐心', '知识体系化'],
  },
};

export default function Home() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [result, setResult] = useState<string>('');

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
      setStep('result');
    }
  };

  const calculateResult = (finalAnswers: { [key: number]: number }) => {
    const scores: Record<string, number> = {
      '技术专家': 0,
      '技术管理': 0,
      '产品技术': 0,
      '独立创业': 0,
      '教育培训': 0,
    };

    // 每道题对不同路径的“加权贡献”（越高越相关）
    const weights: Record<number, Partial<Record<keyof typeof careerPaths, number>>> = {
      // 技术专家
      1: { '技术专家': 1.4, '产品技术': 0.6 },
      2: { '技术专家': 1.1, '独立创业': 0.8, '产品技术': 0.6 },
      6: { '技术专家': 1.0 },
      10: { '技术专家': 1.0 },
      17: { '技术专家': 1.1, '产品技术': 0.5 },
      28: { '技术专家': 1.2 },

      // 技术管理
      4: { '技术管理': 1.2 },
      5: { '技术管理': 1.0, '产品技术': 0.4 },
      19: { '技术管理': 1.1, '产品技术': 0.6 },
      25: { '技术管理': 0.8, '产品技术': 0.6 },
      14: { '技术管理': 0.6, '教育培训': 0.4 },

      // 产品技术
      3: { '产品技术': 0.9, '技术管理': 0.5, '教育培训': 0.4 },
      7: { '产品技术': 1.1 },
      16: { '产品技术': 1.0, '技术管理': 0.6 },
      21: { '产品技术': 0.9, '独立创业': 0.6 },
      22: { '产品技术': 0.8, '技术管理': 0.4, '教育培训': 0.4 },
      24: { '产品技术': 0.9, '独立创业': 0.6 },
      27: { '产品技术': 0.5, '独立创业': 0.4 },

      // 独立创业
      9: { '独立创业': 1.2 },
      18: { '独立创业': 1.0, '产品技术': 0.6 },
      20: { '独立创业': 1.0, '技术管理': 0.4 },
      12: { '独立创业': 0.7, '技术管理': 0.5 },
      29: { '独立创业': 0.9 },
      30: { '独立创业': 0.8, '技术管理': 0.4 },
      26: { '独立创业': 0.6, '产品技术': 0.5 },

      // 教育培训
      8: { '教育培训': 1.3, '技术管理': 0.4 },
      13: { '教育培训': 0.8, '产品技术': 0.4 },
      11: { '教育培训': 0.6 },
    };

    const denom: Record<string, number> = {
      '技术专家': 0,
      '技术管理': 0,
      '产品技术': 0,
      '独立创业': 0,
      '教育培训': 0,
    };

    for (const [qidStr, score] of Object.entries(finalAnswers)) {
      const qid = Number(qidStr);
      const w = weights[qid];
      if (!w) continue;
      for (const [path, weight] of Object.entries(w)) {
        const ww = weight || 0;
        scores[path] += score * ww;
        denom[path] += ww;
      }
    }

    // 归一化：避免“某个方向权重题更多”导致结果永远偏向它
    const normalized: Record<string, number> = { ...scores };
    for (const k of Object.keys(normalized)) {
      normalized[k] = denom[k] > 0 ? normalized[k] / denom[k] : 0;
    }

    const topCareer = Object.entries(normalized).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    setResult(topCareer);
  };

  const restartTest = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setResult('');
  };

  if (step === 'intro') {
    return (
      <div className="container">
        <div className="card">
          <h1>🎯 职业发展测评</h1>
          <p className="subtitle">发现最适合你的职业方向</p>
          
          <div className="intro-content">
            <h2>测评说明</h2>
            <p className="intro-explain">
              本测评用于帮助大四/研究生在毕业季快速梳理你的能力、兴趣与价值观，并给出更适合的求职方向建议。请按第一反应作答，结果仅供参考；如果你正在纠结读博、进企业或转行，它也能提供一个清晰的起点。
            </p>
            <ul>
              <li>本测评包含 30 道题目</li>
              <li>请根据真实感受选择 1-5 分（非常不同意到非常同意）</li>
              <li>测评结果将为你推荐最适合的职业发展路径</li>
              <li>预计用时：8-10 分钟</li>
            </ul>
          </div>

          <button className="btn-primary" onClick={() => setStep('test')}>
            开始测评
          </button>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    return (
      <div className="container">
        <div className="card">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="question-counter">
            问题 {currentQuestion + 1} / {questions.length}
          </div>

          <h2 className="question-text">{questions[currentQuestion].text}</h2>

          <div className="answer-grid">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                className="answer-btn"
                onClick={() => handleAnswer(score)}
              >
                <div className="score-circle">{score}</div>
                <div className="score-label">
                  {score === 1 && '非常不同意'}
                  {score === 2 && '不同意'}
                  {score === 3 && '中立'}
                  {score === 4 && '同意'}
                  {score === 5 && '非常同意'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Result page
  const careerInfo = careerPaths[result as keyof typeof careerPaths];

  // 把答题汇总成一些更“报告式”的画像维度（0-100）
  const avg = (ids: number[]) => {
    const vals = ids
      .map((id) => answers[id])
      .filter((v) => typeof v === 'number') as number[];
    if (vals.length === 0) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const profile = {
    techDepth: Math.round((avg([1, 2, 10, 17, 28]) / 5) * 100),
    leadership: Math.round((avg([4, 5, 19, 25]) / 5) * 100),
    communication: Math.round((avg([3, 21, 22, 23]) / 5) * 100),
    businessSense: Math.round((avg([7, 9, 12, 24]) / 5) * 100),
    creativity: Math.round((avg([16, 18, 15, 20]) / 5) * 100),
    stability: Math.round((avg([11, 14]) / 5) * 100),
  };

  const reportTemplates: Record<string, {
    core: string;
    strengths: string[];
    strongFit: string[];
    nextFit: string[];
    risk: string[];
    nextSteps: string[];
  }> = {
    '技术专家': {
      core: '你更适合走“深度积累 → 解决难题 → 成为领域专家”的路径。你的优势在于对复杂问题的专注与拆解能力，越是在需要硬实力与持续迭代的岗位，你越容易拉开差距。',
      strengths: ['深度学习与技术迭代能力强', '能在复杂问题上持续投入并产出结果', '更适合用作品/项目证明实力'],
      strongFit: ['后端/客户端/全栈工程师', '数据/算法/平台工程', '架构/性能优化/基础设施方向'],
      nextFit: ['技术产品/解决方案（偏技术）', '研究/实验/原型验证类岗位'],
      risk: ['如果岗位长期以沟通拉扯、开会对齐为主，可能会让你消耗感更强', '如果没有清晰的技术成长路径，你会更容易觉得“在原地打转”'],
      nextSteps: ['把简历重心放在“难题/指标/规模”上（性能、稳定性、成本、效率）', '准备 1-2 个可讲清楚的项目故事：背景-挑战-方案-结果', '投递优先选：有技术梯队/代码评审/明确晋升标准的团队'],
    },
    '技术管理': {
      core: '你更适合走“带队推进 → 协调资源 → 对结果负责”的路径。你不是只想把事情做完，更在意把团队的节奏、协作与交付打顺，属于能把复杂项目推动落地的人。',
      strengths: ['能组织规划、拆解目标并推动执行', '在多方协作中更容易建立共识', '对流程与效率有敏感度'],
      strongFit: ['技术组长/Team Lead（成长型）', '工程项目管理/研发效能', '技术管理储备（校招可从核心开发做起）'],
      nextFit: ['产品技术/解决方案（需要跨团队推进）', '教育培训/带教方向（偏管理）'],
      risk: ['如果你缺少“硬核拿得出手的项目”，管理潜力会很难被面试官认可', '在权责不清的团队里容易背锅或被消耗'],
      nextSteps: ['用经历证明“你推动过什么结果”：进度、质量、协作、风险控制', '准备 2 个“冲突与协调”的案例（如何对齐目标、做取舍）', '早期岗位建议：核心开发/项目owner，再逐步承担带队职责'],
    },
    '产品技术': {
      core: '你更适合走“理解需求 → 设计方案 → 推动落地”的路径。你擅长在技术与业务之间翻译，把复杂问题变成可交付的产品/方案，并用沟通与结构化思考拿结果。',
      strengths: ['结构化思考强：能把问题拆成路径与优先级', '沟通表达与文档输出能力更占优势', '对用户/业务需求更敏感'],
      strongFit: ['产品经理（偏策略/需求）', '解决方案架构师/售前（偏方案）', '数据分析/运营分析（偏业务）'],
      nextFit: ['技术管理（更偏推进）', '独立创业（偏产品/增长）'],
      risk: ['如果只停留在“会说会写”，缺少可量化成果，会被认为偏虚', '在业务目标不清的团队里，容易反复改需求导致内耗'],
      nextSteps: ['准备 1 份“需求-方案-落地-结果”的完整案例（最好有数据）', '简历关键词：增长、转化、留存、效率、成本、体验、闭环', '投递优先选：业务目标清晰、能给你闭环机会的团队'],
    },
    '独立创业': {
      core: '你更适合走“高自主权 + 高不确定性”的路径。你对机会、回报与从 0 到 1 的过程更有热情，愿意承担风险并快速试错，用结果说话。',
      strengths: ['自驱力强，愿意持续投入到目标上', '对商业机会/增长更敏感', '适应性强，能在变化中快速调整'],
      strongFit: ['创业/合伙/小团队多面手', '增长/运营/商业化方向', '独立开发者/自由职业（有技能闭环）'],
      nextFit: ['产品技术（偏增长/商业）', '技术专家（做硬能力底盘）'],
      risk: ['如果缺少稳定现金流或硬技能底盘，焦虑会被放大', '过早追求“全都要”，可能导致方向分散、难以积累护城河'],
      nextSteps: ['先确定一个可变现的“硬技能”作为底盘（开发/数据/设计/内容）', '用最小成本做 1 个小项目验证：需求-交付-收费-复购', '给自己设定 30 天目标：产出作品/客户/收入中的任意一个'],
    },
    '教育培训': {
      core: '你更适合走“知识体系化 → 讲清楚 → 带人成长”的路径。你能把复杂内容组织成易懂的表达，并在陪伴他人成长中获得成就感。',
      strengths: ['表达清晰，善于把知识结构化', '耐心与同理心更强，适合带教与辅导', '价值观更偏稳定与长期积累'],
      strongFit: ['培训师/讲师/教研', '企业内训/知识管理', '高校/机构/内容型教育方向'],
      nextFit: ['技术管理（偏带教）', '产品技术（偏内容/运营/用户增长）'],
      risk: ['如果过度追求完美而缺少结果导向，可能难以快速建立影响力', '如果平台/团队不给你舞台，你会觉得“输出无处可用”'],
      nextSteps: ['准备一套可展示的“课程/分享”作品（PPT/文章/视频）', '简历强调：讲课次数、学员反馈、课程转化/完课率等指标', '优先选择：有教研体系/明确培养机制的平台或团队'],
    },
  };

  const tpl = reportTemplates[result] || reportTemplates['产品技术'];
  
  return (
    <div className="container">
      <div className="card">
        <div className="result-header">
          <div className="result-badge">✨</div>
          <h1>你的职业方向：{result}</h1>
        </div>

        <div className="result-content">
          <div className="result-section">
            <h3>📌 核心结论</h3>
            <p className="result-description">{tpl.core}</p>
          </div>

          <div className="result-section">
            <h3>🧭 你的职业画像（综合倾向）</h3>
            <div className="traits">
              <div className="trait-row">
                <div className="trait-label">技术深度</div>
                <div className="trait-bar"><div className="trait-fill" style={{ width: `${profile.techDepth}%` }} /></div>
                <div className="trait-val">{profile.techDepth}</div>
              </div>
              <div className="trait-row">
                <div className="trait-label">领导与推进</div>
                <div className="trait-bar"><div className="trait-fill" style={{ width: `${profile.leadership}%` }} /></div>
                <div className="trait-val">{profile.leadership}</div>
              </div>
              <div className="trait-row">
                <div className="trait-label">沟通表达</div>
                <div className="trait-bar"><div className="trait-fill" style={{ width: `${profile.communication}%` }} /></div>
                <div className="trait-val">{profile.communication}</div>
              </div>
              <div className="trait-row">
                <div className="trait-label">商业敏感</div>
                <div className="trait-bar"><div className="trait-fill" style={{ width: `${profile.businessSense}%` }} /></div>
                <div className="trait-val">{profile.businessSense}</div>
              </div>
              <div className="trait-row">
                <div className="trait-label">创新/适应</div>
                <div className="trait-bar"><div className="trait-fill" style={{ width: `${profile.creativity}%` }} /></div>
                <div className="trait-val">{profile.creativity}</div>
              </div>
              <div className="trait-row">
                <div className="trait-label">稳定偏好</div>
                <div className="trait-bar"><div className="trait-fill" style={{ width: `${profile.stability}%` }} /></div>
                <div className="trait-val">{profile.stability}</div>
              </div>
            </div>
            <p className="muted">说明：画像为综合倾向（0-100），用于帮助你更直观理解自己的工作偏好。</p>
          </div>

          <div className="result-section">
            <h3>✅ 你更容易做出成绩的方向</h3>
            <ul className="report-list">
              {tpl.strongFit.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h3>🟨 次适配（满足条件也会很合适）</h3>
            <ul className="report-list">
              {tpl.nextFit.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h3>⚠️ 风险提醒（避坑建议）</h3>
            <ul className="report-list">
              {tpl.risk.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="result-section">
            <h3>🚀 下一步建议（更落地）</h3>
            <ul className="report-list">
              {tpl.nextSteps.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="result-section cta">
            <h3>📩 获取你的专属链接</h3>
            <p>如果你想把结果做成更详细的“可执行版本”（岗位清单/简历关键词/7天行动清单），可以联系我获取专属链接与升级版报告。</p>
            <button className="btn-cta">联系我获取链接</button>
          </div>
        </div>

        <button className="btn-secondary" onClick={restartTest}>
          重新测评
        </button>
      </div>
    </div>
  );
}
