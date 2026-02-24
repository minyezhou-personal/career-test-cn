'use client';

import { useState } from 'react';
import './globals.css';

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  // 技能评估
  { id: 1, text: '我擅长解决复杂的技术问题', category: '技术能力' },
  { id: 2, text: '我喜欢学习新的技术和工具', category: '技术能力' },
  { id: 3, text: '我能够清晰地向他人解释技术概念', category: '沟通能力' },
  { id: 4, text: '我擅长领导团队完成项目', category: '领导能力' },
  { id: 5, text: '我善于规划和组织工作', category: '管理能力' },
  
  // 兴趣评估
  { id: 6, text: '我对前沿科技充满热情', category: '研究兴趣' },
  { id: 7, text: '我喜欢与客户交流需求', category: '商业兴趣' },
  { id: 8, text: '我享受培训和指导他人的过程', category: '教育兴趣' },
  { id: 9, text: '我对创业和商业运营感兴趣', category: '创业兴趣' },
  { id: 10, text: '我喜欢独立工作和深入钻研', category: '研究兴趣' },
  
  // 职业价值观
  { id: 11, text: '工作与生活的平衡对我很重要', category: '价值观' },
  { id: 12, text: '我追求高收入和财务自由', category: '价值观' },
  { id: 13, text: '我希望工作能产生社会影响', category: '价值观' },
  { id: 14, text: '我看重工作的稳定性', category: '价值观' },
  { id: 15, text: '我渴望在工作中不断创新', category: '价值观' },
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
    const scores: { [key: string]: number } = {
      '技术专家': 0,
      '技术管理': 0,
      '产品技术': 0,
      '独立创业': 0,
      '教育培训': 0,
    };

    // 技术能力题 (1,2) -> 技术专家
    scores['技术专家'] += (finalAnswers[1] || 0) + (finalAnswers[2] || 0);
    
    // 沟通+领导 (3,4) -> 技术管理
    scores['技术管理'] += (finalAnswers[3] || 0) + (finalAnswers[4] || 0);
    scores['技术管理'] += (finalAnswers[5] || 0);
    
    // 沟通+商业 (3,7) -> 产品技术
    scores['产品技术'] += (finalAnswers[3] || 0) + (finalAnswers[7] || 0);
    
    // 创业兴趣+技术 (9,2) -> 独立创业
    scores['独立创业'] += (finalAnswers[9] || 0) + (finalAnswers[2] || 0);
    scores['独立创业'] += (finalAnswers[12] || 0) * 0.5;
    
    // 教育兴趣 (8) -> 教育培训
    scores['教育培训'] += (finalAnswers[8] || 0) * 2;
    scores['教育培训'] += (finalAnswers[3] || 0);

    const topCareer = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

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
              <li>本测评包含 15 道题目</li>
              <li>请根据真实感受选择 1-5 分（非常不同意到非常同意）</li>
              <li>测评结果将为你推荐最适合的职业发展路径</li>
              <li>预计用时：5 分钟</li>
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
    7: { trait: '需求洞察型', why: '你愿意走进真实场景，理解客户/业务需要什么', fit: ['产品技术'] },
    8: { trait: '知识传递型', why: '你享受把经验讲给别人听并帮助对方成长', fit: ['教育培训', '技术管理'] },
    9: { trait: '商业与机会敏感型', why: '你对从 0 到 1、商业模式和增长更感兴趣', fit: ['独立创业', '产品技术'] },
    10: { trait: '深度专注型', why: '你更喜欢独立深挖与长期积累，而不是频繁切换', fit: ['技术专家'] },
    11: { trait: '平衡导向型', why: '你更重视稳定节奏与可持续的生活方式', fit: ['产品技术', '教育培训'] },
    12: { trait: '回报驱动型', why: '你对收入/回报更敏感，会关注成长与收益', fit: ['独立创业', '技术管理'] },
    13: { trait: '影响力导向型', why: '你希望做的事能产生更大的社会价值', fit: ['教育培训', '产品技术'] },
    14: { trait: '稳定安全型', why: '你更看重确定性与风险可控', fit: ['教育培训', '技术管理'] },
    15: { trait: '创新驱动型', why: '你更愿意尝试新方法并在变化中创造结果', fit: ['独立创业', '产品技术'] },
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
