'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  FileText, 
  Search, 
  Heart, 
  Image, 
  Video, 
  Palette, 
  TrendingUp, 
  Users, 
  Database, 
  ListChecks,
  Send,
  Bot,
  Sparkles,
  Youtube,
  ChevronRight,
  Loader2,
  Copy,
  Check,
  Zap,
  Brain,
  Target,
  BarChart3
} from 'lucide-react';

type AgentRole = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  capabilities: string[];
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentRole?: string;
};

type WorkflowStep = {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  output?: string;
};

const agentRoles: AgentRole[] = [
  {
    id: 'script-writer',
    name: 'Script Writer',
    icon: <FileText className="w-5 h-5" />,
    description: 'Creates engaging, hook-driven scripts with perfect pacing and retention strategies',
    color: 'from-red-500 to-red-700',
    capabilities: ['Hook creation', 'Story structure', 'CTA placement', 'Retention optimization']
  },
  {
    id: 'research-analyst',
    name: 'Research Analyst',
    icon: <Search className="w-5 h-5" />,
    description: 'Deep dives into topics, trends, and competitor analysis',
    color: 'from-blue-500 to-blue-700',
    capabilities: ['Trend analysis', 'Competitor research', 'Data gathering', 'Source verification']
  },
  {
    id: 'health-fact-checker',
    name: 'Health Fact Checker',
    icon: <Heart className="w-5 h-5" />,
    description: 'Ensures all health-related claims are accurate and properly sourced',
    color: 'from-green-500 to-green-700',
    capabilities: ['Medical accuracy', 'Source citation', 'Claim verification', 'Safety disclaimers']
  },
  {
    id: 'image-prompt-engineer',
    name: 'Image Prompt Engineer',
    icon: <Image className="w-5 h-5" />,
    description: 'Creates optimized prompts for AI image generation tools',
    color: 'from-purple-500 to-purple-700',
    capabilities: ['Midjourney prompts', 'DALL-E optimization', 'Style consistency', 'Brand alignment']
  },
  {
    id: 'video-prompt-engineer',
    name: 'Video Prompt Engineer',
    icon: <Video className="w-5 h-5" />,
    description: 'Designs prompts for AI video generation and B-roll creation',
    color: 'from-pink-500 to-pink-700',
    capabilities: ['Runway ML prompts', 'Pika Labs optimization', 'Scene composition', 'Motion design']
  },
  {
    id: 'thumbnail-strategist',
    name: 'Thumbnail Strategist',
    icon: <Palette className="w-5 h-5" />,
    description: 'Creates high-CTR thumbnail concepts and A/B testing strategies',
    color: 'from-orange-500 to-orange-700',
    capabilities: ['CTR optimization', 'Color psychology', 'Face expressions', 'Text placement']
  },
  {
    id: 'seo-title-expert',
    name: 'SEO & Title Expert',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Optimizes titles, descriptions, tags, and keywords for maximum reach',
    color: 'from-cyan-500 to-cyan-700',
    capabilities: ['Keyword research', 'Title optimization', 'Tag strategy', 'Description SEO']
  },
  {
    id: 'audience-psychologist',
    name: 'Audience Psychologist',
    icon: <Users className="w-5 h-5" />,
    description: 'Analyzes viewer behavior and optimizes content for engagement',
    color: 'from-yellow-500 to-yellow-700',
    capabilities: ['Viewer psychology', 'Engagement triggers', 'Retention patterns', 'Community building']
  },
  {
    id: 'content-memory-manager',
    name: 'Content Memory Manager',
    icon: <Database className="w-5 h-5" />,
    description: 'Tracks all content, maintains consistency, and prevents repetition',
    color: 'from-indigo-500 to-indigo-700',
    capabilities: ['Content tracking', 'Brand consistency', 'Topic database', 'Style guidelines']
  },
  {
    id: 'workflow-planner',
    name: 'Workflow Planner',
    icon: <ListChecks className="w-5 h-5" />,
    description: 'Orchestrates the entire content creation pipeline efficiently',
    color: 'from-teal-500 to-teal-700',
    capabilities: ['Task scheduling', 'Pipeline management', 'Deadline tracking', 'Resource allocation']
  }
];

const samplePrompts = [
  "Create a complete video package about 'Morning Routines of Billionaires'",
  "Research trending topics in the fitness niche for this week",
  "Write a script for a 10-minute video about AI in healthcare",
  "Generate thumbnail concepts for a tech review video",
  "Optimize SEO for a cooking channel video about pasta recipes"
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgentResponse = async (userMessage: string) => {
    setIsProcessing(true);
    
    // Determine which agents to activate based on the message
    const messageLC = userMessage.toLowerCase();
    const activeAgents: string[] = [];
    
    if (messageLC.includes('script') || messageLC.includes('write') || messageLC.includes('video package')) {
      activeAgents.push('script-writer');
    }
    if (messageLC.includes('research') || messageLC.includes('trend') || messageLC.includes('topic')) {
      activeAgents.push('research-analyst');
    }
    if (messageLC.includes('health') || messageLC.includes('medical') || messageLC.includes('fitness')) {
      activeAgents.push('health-fact-checker');
    }
    if (messageLC.includes('image') || messageLC.includes('visual') || messageLC.includes('package')) {
      activeAgents.push('image-prompt-engineer');
    }
    if (messageLC.includes('video') || messageLC.includes('b-roll') || messageLC.includes('package')) {
      activeAgents.push('video-prompt-engineer');
    }
    if (messageLC.includes('thumbnail') || messageLC.includes('package')) {
      activeAgents.push('thumbnail-strategist');
    }
    if (messageLC.includes('seo') || messageLC.includes('title') || messageLC.includes('optimize') || messageLC.includes('package')) {
      activeAgents.push('seo-title-expert');
    }
    if (messageLC.includes('audience') || messageLC.includes('engagement') || messageLC.includes('viewer')) {
      activeAgents.push('audience-psychologist');
    }
    
    // Always include workflow planner for complex tasks
    if (activeAgents.length > 2 || messageLC.includes('package') || messageLC.includes('complete')) {
      activeAgents.push('workflow-planner');
      activeAgents.push('content-memory-manager');
    }

    // If no specific agent matched, use research and script writer
    if (activeAgents.length === 0) {
      activeAgents.push('research-analyst', 'script-writer');
    }

    // Create workflow steps
    const steps: WorkflowStep[] = activeAgents.map(agentId => ({
      id: agentId,
      name: agentRoles.find(r => r.id === agentId)?.name || agentId,
      status: 'pending' as const
    }));
    
    setWorkflow(steps);

    // Simulate each agent working
    let fullResponse = '';
    
    for (let i = 0; i < activeAgents.length; i++) {
      const agentId = activeAgents[i];
      setActiveRole(agentId);
      
      // Update workflow status
      setWorkflow(prev => prev.map((step, idx) => ({
        ...step,
        status: idx === i ? 'active' : idx < i ? 'completed' : 'pending'
      })));
      
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      
      const agentOutput = generateAgentOutput(agentId, userMessage);
      fullResponse += agentOutput + '\n\n';
    }

    // Mark all as completed
    setWorkflow(prev => prev.map(step => ({ ...step, status: 'completed' })));
    setActiveRole(null);
    
    // Add the combined response
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: fullResponse.trim(),
      timestamp: new Date(),
      agentRole: activeAgents.join(', ')
    }]);
    
    setIsProcessing(false);
  };

  const generateAgentOutput = (agentId: string, userMessage: string): string => {
    const outputs: Record<string, string> = {
      'script-writer': `## 📝 Script Writer Output

**Hook (0:00-0:15):**
"What if I told you that the world's most successful people all share ONE morning habit that 99% of us are doing wrong?"

**Introduction (0:15-1:00):**
- Pattern interrupt with surprising statistic
- Establish credibility and promise value
- Preview the transformation viewers will experience

**Main Content Structure:**
1. **The Problem** (1:00-2:30) - Why most morning routines fail
2. **The Research** (2:30-4:30) - Studies from Harvard, Stanford
3. **The Framework** (4:30-7:00) - The 5-step billionaire system
4. **Implementation** (7:00-9:00) - Practical daily schedule
5. **Results** (9:00-10:00) - Expected outcomes and timeline

**CTA Placement:**
- Soft CTA at 3:00 (Subscribe reminder)
- Mid-roll CTA at 6:00 (Like for part 2)
- End CTA at 9:45 (Comment engagement question)

**Retention Triggers:**
- Open loop at 2:00 ("But wait, there's a twist...")
- Visual change every 15 seconds
- Sound effect cues for key points`,

      'research-analyst': `## 🔍 Research Analyst Report

**Trending Topics Analysis:**
1. Morning routines - 340% search increase
2. Productivity hacks - Evergreen + trending
3. Billionaire habits - High competition, high volume

**Competitor Analysis:**
- Top video: 12M views, 8:32 duration
- Average engagement rate: 4.2%
- Gap opportunity: Specific health focus

**Key Statistics Found:**
- 92% of CEOs wake before 6 AM (Harvard Business Review)
- Cold exposure increases productivity by 23% (NIH Study)
- Meditation reduces cortisol by 32% (Stanford Research)

**Sources Verified:**
✓ Academic journals: 8 sources
✓ Industry reports: 5 sources
✓ Expert interviews: 3 sources`,

      'health-fact-checker': `## ✅ Health Fact Checker Verification

**Claims Reviewed:** 6
**Verified Accurate:** 5
**Needs Revision:** 1

**Verified Claims:**
✓ Cold showers increase norepinephrine - TRUE (NIH)
✓ Meditation reduces cortisol - TRUE (Multiple studies)
✓ Exercise improves cognitive function - TRUE (APA)
✓ Sleep affects productivity - TRUE (CDC data)
✓ Hydration impacts brain function - TRUE (Harvard)

**Revision Required:**
⚠️ "Fasting cures all diseases" → Change to "Intermittent fasting may have health benefits (consult doctor)"

**Required Disclaimers:**
- "Consult healthcare provider before starting"
- "Results may vary based on individual factors"`,

      'image-prompt-engineer': `## 🎨 Image Prompt Engineer Output

**Thumbnail Main Image:**
\`\`\`
Photorealistic portrait of confident business person, golden hour lighting, 
looking directly at camera with slight smile, wearing premium navy suit, 
blurred city skyline background, cinematic color grading, shot on Sony A7R IV, 
85mm lens, f/1.4, professional headshot style --ar 16:9 --v 6 --style raw
\`\`\`

**B-Roll Image 1 (Morning Routine):**
\`\`\`
Luxurious modern bedroom, sunrise through floor-to-ceiling windows, 
unmade premium white bedding, minimalist decor, warm golden light streaming in,
architectural interior photography, 8K resolution --ar 16:9 --v 6
\`\`\`

**B-Roll Image 2 (Success Visualization):**
\`\`\`
Aerial view of modern glass skyscraper, drone photography at sunrise,
golden light reflecting off building, clouds at eye level, cinematic,
ultra-wide angle, professional real estate photography --ar 16:9 --v 6
\`\`\``,

      'video-prompt-engineer': `## 🎬 Video Prompt Engineer Output

**Opening Sequence (Runway Gen-2):**
\`\`\`
Camera slowly pushing in on sleeping figure in luxurious bedroom,
first rays of sunlight entering through large windows,
gentle movement, cinematic quality, warm color grade
Duration: 4 seconds, Motion: Push in slow
\`\`\`

**Transition Sequence (Pika Labs):**
\`\`\`
Time-lapse of city skyline transitioning from night to day,
lights gradually turning off as sun rises, clouds moving,
professional documentary style, 8K quality
\`\`\`

**B-Roll Motion Graphic:**
\`\`\`
3D animated productivity graph rising exponentially,
clean modern aesthetic, subtle particle effects,
brand colors (red accent on dark background)
\`\`\``,

      'thumbnail-strategist': `## 🖼️ Thumbnail Strategist Concepts

**Concept A: "The Reveal"** (Predicted CTR: 8.2%)
- Split composition: dark/unsuccessful vs bright/successful
- Subject with surprised expression pointing at clock (5:00 AM)
- Bold text: "5 AM SECRET" in yellow with black outline
- Color scheme: Dark blue → Bright orange gradient

**Concept B: "The Comparison"** (Predicted CTR: 7.8%)
- Before/After split screen
- Tired person vs energized successful person
- Clock showing early morning time
- Text: "COPY THIS" with arrow pointing right

**Concept C: "The Authority"** (Predicted CTR: 9.1%)
- Close-up face with confident expression
- Subtle golden glow/halo effect
- Minimal text: "I Tried It"
- Red accent elements for YouTube brand alignment

**A/B Testing Strategy:**
1. Test A vs C first (highest predicted CTR variance)
2. Run for 48 hours minimum
3. Switch winner against B for validation`,

      'seo-title-expert': `## 📈 SEO & Title Expert Optimization

**Primary Title Options:**
1. "I Tried The 5AM Morning Routine For 30 Days (Life-Changing Results)"
2. "The Morning Routine That Made Me 10X More Productive"
3. "Billionaire Morning Routine: Why Successful People Wake Up at 5 AM"

**Recommended Title:** Option 1 (Best search + curiosity balance)

**Keywords Targeted:**
- Primary: "morning routine" (890K monthly searches)
- Secondary: "5am routine", "productivity routine"
- Long-tail: "morning routine for success"

**Optimized Description:**
\`\`\`
I tried the billionaire 5AM morning routine for 30 days and the results were incredible...

🔥 FREE Morning Routine Checklist: [link]

In this video, you'll discover:
✅ 0:00 - Why most morning routines fail
✅ 2:30 - The science behind early rising
✅ 4:30 - The exact 5-step framework
✅ 7:00 - My 30-day transformation results

#morningroutine #productivity #success
\`\`\`

**Tags (Priority Order):**
morning routine, 5am club, morning routine for success, productivity tips, billionaire habits, how to wake up early, morning motivation`,

      'audience-psychologist': `## 🧠 Audience Psychologist Analysis

**Target Viewer Profile:**
- Age: 25-44
- Interests: Self-improvement, business, productivity
- Pain point: Feeling unproductive, wanting success
- Desire: Simple, actionable transformation

**Psychological Triggers to Use:**
1. **Social proof** - "Millions of successful people..."
2. **Scarcity** - "Most people will never know this..."
3. **Authority** - Cite research and experts
4. **Transformation** - Clear before/after narrative

**Engagement Optimization:**
- Ask rhetorical questions every 90 seconds
- Use "you" instead of "people" for personal connection
- Include relatable struggles before solutions
- End with empowering, actionable message

**Comment Bait Questions:**
1. "What time do you wake up? Drop it below! 👇"
2. "Which habit will you try first?"
3. "Tag someone who needs to see this!"`,

      'content-memory-manager': `## 💾 Content Memory Manager Update

**Content Database Updated:**
✓ Topic registered: Morning Routines / Productivity
✓ Keywords tracked: 5am, billionaire, routine, productive
✓ Statistics saved: 4 new data points
✓ Sources archived: 16 references

**Content Consistency Check:**
- Brand voice: ✓ Consistent with channel style
- Visual style: ✓ Aligned with existing content
- Topic overlap: None (new topic area)

**Recommendations:**
- Create series potential: "7 Days of Billionaire Habits"
- Internal linking opportunity: Previous productivity video
- Repurpose to Shorts: 3 clip opportunities identified`,

      'workflow-planner': `## 📋 Workflow Planner Summary

**Project Status: COMPLETE** ✅

**Execution Timeline:**
| Phase | Task | Duration | Status |
|-------|------|----------|--------|
| 1 | Research & Analysis | 2 hours | ✓ |
| 2 | Script Writing | 3 hours | ✓ |
| 3 | Fact Checking | 1 hour | ✓ |
| 4 | Image/Video Prompts | 2 hours | ✓ |
| 5 | Thumbnail Design | 1 hour | ✓ |
| 6 | SEO Optimization | 1 hour | ✓ |
| 7 | Final Review | 30 min | ✓ |

**Deliverables Generated:**
1. ✓ Complete video script (10 minutes)
2. ✓ Research document with sources
3. ✓ 3 thumbnail concepts with A/B plan
4. ✓ AI image prompts (5 scenes)
5. ✓ AI video prompts (3 sequences)
6. ✓ SEO package (title, description, tags)
7. ✓ Engagement strategy

**Next Steps:**
→ Execute image generation
→ Record voiceover
→ Edit and compile
→ Schedule upload (optimal: Tuesday 2PM EST)`
    };

    return outputs[agentId] || `**${agentId}** is processing your request...`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    await simulateAgentResponse(userMessage);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center pulse-glow">
                <Youtube className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#0f0f0f]">
                <Bot className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">YT-A2Z</h1>
              <p className="text-xs text-gray-400">AI YouTube Content Agent</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>10 AI Agents Active</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Agent Roles */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-red-500" />
                Agent Roles
              </h2>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {agentRoles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      activeRole === role.id
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-gray-800 hover:border-gray-700 bg-[#222]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${role.color}`}>
                        {role.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{role.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{role.description}</p>
                      </div>
                      {activeRole === role.id && (
                        <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Progress */}
            {workflow.length > 0 && (
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  Workflow Progress
                </h2>
                <div className="space-y-2">
                  {workflow.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'active' ? 'bg-red-500 animate-pulse' :
                        'bg-gray-700'
                      }`}>
                        {step.status === 'completed' ? <Check className="w-3 h-3" /> : idx + 1}
                      </div>
                      <span className={`text-sm ${
                        step.status === 'active' ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 flex flex-col h-[calc(100vh-12rem)]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-6 pulse-glow">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Welcome to YT-A2Z</h2>
                    <p className="text-gray-400 mb-8 max-w-md">
                      Your AI-powered YouTube content creation team. I handle everything from research to scripts, thumbnails to SEO.
                    </p>
                    
                    <div className="w-full max-w-2xl">
                      <h3 className="text-sm font-semibold text-gray-400 mb-3">Try these prompts:</h3>
                      <div className="grid gap-2">
                        {samplePrompts.map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePromptClick(prompt)}
                            className="text-left p-3 rounded-lg bg-[#222] border border-gray-800 hover:border-red-500/50 hover:bg-[#282828] transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <ChevronRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                              <span className="text-sm text-gray-300">{prompt}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-[#222]">
                        <BarChart3 className="w-6 h-6 text-red-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">10</div>
                        <div className="text-xs text-gray-400">AI Agents</div>
                      </div>
                      <div className="p-4 rounded-lg bg-[#222]">
                        <FileText className="w-6 h-6 text-red-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">∞</div>
                        <div className="text-xs text-gray-400">Content Ideas</div>
                      </div>
                      <div className="p-4 rounded-lg bg-[#222]">
                        <TrendingUp className="w-6 h-6 text-red-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-xs text-gray-400">Available</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl p-4 ${
                          message.role === 'user'
                            ? 'bg-red-600 text-white'
                            : 'bg-[#222] border border-gray-800'
                        }`}
                      >
                        {message.role === 'assistant' && message.agentRole && (
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
                            <Bot className="w-4 h-4 text-red-500" />
                            <span className="text-xs text-gray-400">
                              Agents: {message.agentRole}
                            </span>
                          </div>
                        )}
                        <div className="prose prose-invert prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {message.content}
                          </pre>
                        </div>
                        {message.role === 'assistant' && (
                          <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-700">
                            <button
                              onClick={() => copyToClipboard(message.content, `msg-${idx}`)}
                              className="p-1.5 rounded hover:bg-gray-700 transition-colors"
                              title="Copy to clipboard"
                            >
                              {copiedId === `msg-${idx}` ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-[#222] border border-gray-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {activeRole ? agentRoles.find(r => r.id === activeRole)?.name : 'Processing'}...
                          </p>
                          <p className="text-xs text-gray-400">AI agents are working on your request</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-800 p-4">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your YouTube content needs..."
                    className="flex-1 bg-[#222] border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isProcessing}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 rounded-xl font-semibold hover:from-red-600 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span className="hidden sm:inline">Send</span>
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  YT-A2Z acts as your complete YouTube team - just describe what you need
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
