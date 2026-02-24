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

    for (const [qidStr, score] of Object.entries(finalAnswers)) {
      const qid = Number(qidStr);
      const w = weights[qid];
      if (!w) continue;
      for (const [path, weight] of Object.entries(w)) {
        scores[path] += score * (weight || 0);
      }
    }

    const topCareer = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
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

  const questionInsight: Record<number, { trait: string; why: string; fit: string[] }> = {
    1: { trait: '技术攻坚型', why: '你对复杂问题的拆解与解决更有信心', fit: ['技术专家', '产品技术'] },
    2: { trait: '持续学习型', why: '你愿意快速上手新工具并持续迭代能力', fit: ['技术专家', '独立创业', '产品技术'] },
    3: { trait: '表达与协作型', why: '你能把抽象概念讲清楚，推动共识与落地', fit: ['技术管理', '产品技术', '教育培训'] },
    4: { trait: '带队推进型', why: '你更愿意承担责任、协调资源并推动项目完成', fit: ['技术管理'] },
    5: { trait: '规划组织型', why: '你擅长把事情排优先级并有条理地推进', fit: ['技术管理', '产品技术'] },
    6: { trait: '前沿探索型', why: '你更容易被新技术、新方向与研究问题吸引', fit: ['技术专家'] },
    7: { trait: '需求洞察型', why: '你愿意走进真实场景，理解客户/用户需要什么', fit: ['产品技术'] },
    8: { trait: '知识传递型', why: '你享受把经验讲给别人听并帮助对方成长', fit: ['教育培训', '技术管理'] },
    9: { trait: '商业与机会敏感型', why: '你对从 0 到 1、商业模式和增长更感兴趣', fit: ['独立创业', '产品技术'] },
    10: { trait: '深度专注型', why: '你更喜欢独立深挖与长期积累，而不是频繁切换', fit: ['技术专家'] },
    11: { trait: '平衡导向型', why: '你更重视稳定节奏与可持续的生活方式', fit: ['产品技术', '教育培训'] },
    12: { trait: '回报驱动型', why: '你对收入/回报更敏感，会关注成长与收益', fit: ['独立创业', '技术管理'] },
    13: { trait: '影响力导向型', why: '你希望做的事能产生更大的社会价值', fit: ['教育培训', '产品技术'] },
    14: { trait: '稳定安全型', why: '你更看重确定性与风险可控', fit: ['教育培训', '技术管理'] },
    15: { trait: '创新驱动型', why: '你更愿意尝试新方法并在变化中创造结果', fit: ['独立创业', '产品技术'] },

    16: { trait: '结构化思考型', why: '你擅长把不清晰的问题拆成路径和优先级', fit: ['产品技术', '技术管理'] },
    17: { trait: '证据导向型', why: '你更愿意用数据/事实支撑判断，减少拍脑袋', fit: ['技术专家', '产品技术'] },
    18: { trait: '创造与搭建型', why: '你更享受从 0 到 1 的搭建与试错过程', fit: ['独立创业', '产品技术'] },
    19: { trait: '推动落地型', why: '你能在多方拉扯中推进共识与执行', fit: ['技术管理', '产品技术'] },
    20: { trait: '高适应型', why: '你能在不确定环境下快速调整策略与节奏', fit: ['独立创业', '技术管理'] },

    21: { trait: '影响与说服型', why: '你愿意把方案讲清楚并推动别人接受', fit: ['产品技术', '独立创业'] },
    22: { trait: '文档输出型', why: '你能把复杂信息写清楚，这在职场非常稀缺', fit: ['产品技术', '技术管理', '教育培训'] },
    23: { trait: '人际互动型', why: '你更从人际互动获得能量，适合更高沟通密度的岗位', fit: ['产品技术', '教育培训'] },
    24: { trait: '增长敏感型', why: '你对转化/运营指标有兴趣，更容易做出可量化的成果', fit: ['产品技术', '独立创业'] },
    25: { trait: '流程优化型', why: '你擅长把混乱变成流程，提高团队效率', fit: ['技术管理', '产品技术'] },

    26: { trait: '成长优先型', why: '你更愿意把“成长速度”放在第一位', fit: ['独立创业', '产品技术'] },
    27: { trait: '结果反馈型', why: '你更喜欢短周期看到结果与反馈', fit: ['产品技术', '独立创业'] },
    28: { trait: '专家路线偏好', why: '你更愿意在一个方向深挖，形成不可替代性', fit: ['技术专家'] },
    29: { trait: '高自主需求', why: '你更看重自主权与自由度，适合更自主的路径', fit: ['独立创业'] },
    30: { trait: '抗压竞争型', why: '你能承受压力并持续投入，适合高目标导向的环境', fit: ['技术管理', '独立创业'] },
  };

  const topSignals = Object.entries(answers)
    .map(([qid, score]) => ({ qid: Number(qid), score }))
    .filter((x) => x.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ qid, score }) => {
      const q = questions.find((qq) => qq.id === qid);
      const meta = questionInsight[qid];
      return { qid, score, text: q?.text || '', meta };
    });
  
  return (
    <div className="container">
      <div className="card">
        <div className="result-header">
          <div className="result-badge">✨</div>
          <h1>你的职业方向：{result}</h1>
        </div>

        <div className="result-content">
          <div className="result-section">
            <h3>📊 评估结果</h3>
            <p className="result-description">{careerInfo.description}</p>
          </div>

          <div className="result-section">
            <h3>🔍 关键依据（你为什么会是这个结果）</h3>
            {topSignals.length > 0 ? (
              <div className="signals">
                {topSignals.map((s) => (
                  <div key={s.qid} className="signal-item">
                    <div className="signal-title">
                      你在「{s.text}」选择了 {s.score} 分
                    </div>
                    <div className="signal-body">
                      体现出你更偏 <b>{s.meta?.trait || '某类偏好'}</b>：{s.meta?.why || '这会影响你的岗位适配。'}
                    </div>
                    {s.meta?.fit?.includes(result) ? (
                      <div className="signal-fit">因此更匹配当前推荐的「{result}」路径。</div>
                    ) : (
                      <div className="signal-fit">这也是你可能同时适配的方向：{s.meta?.fit?.join(' / ')}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted">
                你本次选择较为中性（3 分偏多）。如果想要更明确的结果，建议按第一反应作答，或在更有把握时再测一次。
              </p>
            )}
          </div>

          <div className="result-section">
            <h3>💼 推荐职位</h3>
            <div className="career-tags">
              {careerInfo.careers.map((career, index) => (
                <span key={index} className="career-tag">{career}</span>
              ))}
            </div>
          </div>

          <div className="result-section">
            <h3>🎯 核心技能</h3>
            <div className="skills-list">
              {careerInfo.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-bullet">•</span> {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="result-section cta">
            <h3>🚀 下一步行动</h3>
            <p>想要获得详细的职业发展规划和个性化指导？</p>
            <button className="btn-cta">联系我获取完整报告</button>
          </div>
        </div>

        <button className="btn-secondary" onClick={restartTest}>
          重新测评
        </button>
      </div>
    </div>
  );
}
