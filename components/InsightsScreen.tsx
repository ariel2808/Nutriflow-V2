import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Cell, ReferenceLine } from 'recharts';
import { 
  Droplets, 
  Banana, 
  Beef, 
  Clock, 
  Flame, 
  Zap, 
  Moon, 
  Utensils,
  Battery,
  Target,
  TrendingUp,
  TrendingDown,
  User,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CoachTips } from './CoachTips';

type TimePeriod = '7days' | '28days';
type StatusFilter = 'critical' | 'warning' | 'good';

interface ActionCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  cta: string;
  unit: string;
  target: number;
  current: number;
  action?: () => void;
}

interface TrendCard {
  id: string;
  title: string;
  value: string;
  change: 'up' | 'down' | 'stable';
  changeText: string;
  cta: string;
  data: any[];
}

interface InsightsScreenProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

export function InsightsScreen({ onModalStateChange }: InsightsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7days');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('critical');
  const [selectedCard, setSelectedCard] = useState<ActionCard | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Generate realistic daily progression data for dual-line charts
  const generateDualLineTrendData = (cardId: string, target: number, current: number, unit: string) => {
    const currentHour = 14; // 2 PM current time
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return hours.map(hour => {
      let targetCumulative = 0;
      let currentCumulative = null;
      
      // Calculate target progression (ideal cumulative by this hour)
      targetCumulative = (hour / 24) * target;
      
      // Calculate current progression (actual cumulative by this hour)
      if (hour <= currentHour) {
        const progressRatio = current / target; // How far we are vs target
        const timeRatio = hour / currentHour; // How far through "current time" we are
        
        switch (cardId) {
          case 'hydration':
            // Linear progression - should be steady throughout day
            currentCumulative = Math.max(0, timeRatio * current);
            break;
            
          case 'protein':
            // Meal-based progression (breakfast 25%, lunch 35%, dinner 40%)
            let mealTarget = 0;
            if (hour <= 8) mealTarget = target * 0.25 * (hour / 8);
            else if (hour <= 13) mealTarget = target * 0.25 + target * 0.35 * ((hour - 8) / 5);
            else if (hour <= 20) mealTarget = target * 0.6 + target * 0.4 * ((hour - 13) / 7);
            else mealTarget = target;
            
            currentCumulative = Math.max(0, mealTarget * progressRatio);
            break;
            
          case 'energy':
            // Meal timing pattern for calories (20% breakfast, 40% lunch, 25% snack, 15% dinner)
            let calorieTarget = 0;
            if (hour <= 8) calorieTarget = target * 0.2 * (hour / 8);
            else if (hour <= 13) calorieTarget = target * 0.2 + target * 0.4 * ((hour - 8) / 5);
            else if (hour <= 18) calorieTarget = target * 0.6 + target * 0.25 * ((hour - 13) / 5);
            else calorieTarget = target * 0.85 + target * 0.15 * ((hour - 18) / 6);
            
            currentCumulative = Math.max(0, calorieTarget * progressRatio);
            break;
            
          default:
            // Generic linear progression
            currentCumulative = Math.max(0, timeRatio * current);
            break;
        }
      }
      
      return {
        hour,
        time: `${hour.toString().padStart(2, '0')}:00`,
        target: Math.round(targetCumulative * 100) / 100,
        current: currentCumulative !== null ? Math.max(0, Math.round(currentCumulative * 100) / 100) : null
      };
    });
  };

  // Daily Action Cards Data with enhanced target/current tracking
  const dailyActionCards: ActionCard[] = [
    {
      id: 'hydration',
      icon: <Droplets size={20} />,
      title: 'Hydration Gap',
      value: '0.8L behind',
      status: 'warning',
      cta: 'Drink 300ml now',
      unit: 'L',
      target: 3.0,
      current: 2.2
    },
    {
      id: 'preworkout',
      icon: <Banana size={20} />,
      title: 'Pre-Workout Fuel',
      value: 'Ready in 45min',
      status: 'good',
      cta: 'View fuel plan',
      unit: 'g',
      target: 30,
      current: 30
    },
    {
      id: 'duringworkout',
      icon: <Battery size={20} />,
      title: 'During-Workout Fuel',
      value: 'Carbs + Electrolytes',
      status: 'good',
      cta: 'Setup complete',
      unit: 'g',
      target: 60,
      current: 60
    },
    {
      id: 'protein',
      icon: <Beef size={20} />,
      title: 'Protein Distribution',
      value: '68g / 120g',
      status: 'warning',
      cta: 'Add to next meal',
      unit: 'g',
      target: 120,
      current: 68
    },
    {
      id: 'carbs',
      icon: <Zap size={20} />,
      title: 'Carb Periodization',
      value: 'Low day - on track',
      status: 'good',
      cta: 'Maintain timing',
      unit: 'g',
      target: 150,
      current: 155
    },
    {
      id: 'energy',
      icon: <Flame size={20} />,
      title: 'Energy Balance',
      value: '+180 kcal surplus',
      status: 'warning',
      cta: 'Adjust dinner size',
      unit: 'kcal',
      target: 2400,
      current: 2580
    },
    {
      id: 'recovery',
      icon: <Target size={20} />,
      title: 'Recovery Nutrition',
      value: 'Incomplete',
      status: 'critical',
      cta: 'Add post-workout',
      unit: 'score',
      target: 10,
      current: 6
    },
    {
      id: 'sleep',
      icon: <Moon size={20} />,
      title: 'Sleep Debt',
      value: '1.2h behind',
      status: 'warning',
      cta: 'Early bedtime',
      unit: 'hours',
      target: 8,
      current: 6.8
    },
  ];

  // Trends Data
  const trendsData = {
    '7days': [
      {
        id: 'hydration',
        title: 'Hydration Trend',
        value: '2.1L avg',
        change: 'down' as const,
        changeText: '↓ 15% from last week',
        cta: 'Set reminders',
        data: [
          { day: 'Mon', value: 2.8 },
          { day: 'Tue', value: 2.3 },
          { day: 'Wed', value: 1.9 },
          { day: 'Thu', value: 2.1 },
          { day: 'Fri', value: 1.8 },
          { day: 'Sat', value: 2.0 },
          { day: 'Sun', value: 2.4 },
        ]
      },
      {
        id: 'protein',
        title: 'Protein Adequacy',
        value: '71% days at goal',
        change: 'up' as const,
        changeText: '↑ 12% improvement',
        cta: 'Keep it up',
        data: [
          { day: 'Mon', value: 85 },
          { day: 'Tue', value: 92 },
          { day: 'Wed', value: 78 },
          { day: 'Thu', value: 88 },
          { day: 'Fri', value: 95 },
          { day: 'Sat', value: 82 },
          { day: 'Sun', value: 90 },
        ]
      },
      {
        id: 'carbs',
        title: 'Workout Fueling',
        value: '80% correctly fueled',
        change: 'stable' as const,
        changeText: '→ Consistent timing',
        cta: 'Optimize portions',
        data: [
          { day: 'Mon', value: 1 },
          { day: 'Tue', value: 0 },
          { day: 'Wed', value: 1 },
          { day: 'Thu', value: 1 },
          { day: 'Fri', value: 1 },
          { day: 'Sat', value: 0 },
          { day: 'Sun', value: 1 },
        ]
      },
      {
        id: 'recovery',
        title: 'Recovery Score',
        value: '7.8 / 10',
        change: 'up' as const,
        changeText: '↑ Better sleep quality',
        cta: 'Maintain habits',
        data: [
          { day: 'Mon', value: 7.2 },
          { day: 'Tue', value: 7.8 },
          { day: 'Wed', value: 7.5 },
          { day: 'Thu', value: 8.1 },
          { day: 'Fri', value: 7.9 },
          { day: 'Sat', value: 8.0 },
          { day: 'Sun', value: 7.8 },
        ]
      },
    ],
    '28days': [
      {
        id: 'consistency',
        title: 'Plan Adherence',
        value: '78% consistent',
        change: 'up' as const,
        changeText: '↑ 8% from last month',
        cta: 'Target 85%+',
        data: Array.from({ length: 28 }, (_, i) => ({
          day: i + 1,
          value: Math.floor(Math.random() * 30) + 70
        }))
      },
      {
        id: 'weight',
        title: 'Weight Trend',
        value: '72.1kg (-0.4kg)',
        change: 'down' as const,
        changeText: '↓ Within safe range',
        cta: 'Continue plan',
        data: Array.from({ length: 28 }, (_, i) => ({
          day: i + 1,
          value: 72.5 - (i * 0.02) + Math.random() * 0.3 - 0.15
        }))
      },
    ]
  };

  const getStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return {
          iconColor: '#34C759',
          borderColor: 'rgba(52, 199, 89, 0.4)',
          ctaColor: '#34C759',
          lineColor: '#34C759'
        };
      case 'warning':
        return {
          iconColor: '#FF9500',
          borderColor: 'rgba(255, 149, 0, 0.4)',
          ctaColor: '#FF9500',
          lineColor: '#FF9500'
        };
      case 'critical':
        return {
          iconColor: '#FF3B30',
          borderColor: 'rgba(255, 59, 48, 0.4)',
          ctaColor: '#FF3B30',
          lineColor: '#FF3B30'
        };
    }
  };

  const getStatusIcon = (status: 'good' | 'warning' | 'critical') => {
    const statusColor = getStatusColor(status);
    switch (status) {
      case 'good':
        return <CheckCircle size={16} style={{ color: statusColor.iconColor }} />;
      case 'warning':
        return <AlertCircle size={16} style={{ color: statusColor.iconColor }} />;
      case 'critical':
        return <XCircle size={16} style={{ color: statusColor.iconColor }} />;
    }
  };

  const getChangeIcon = (change: 'up' | 'down' | 'stable') => {
    switch (change) {
      case 'up':
        return <TrendingUp size={14} style={{ color: '#059669' }} />;
      case 'down':
        return <TrendingDown size={14} style={{ color: '#DC2626' }} />;
      case 'stable':
        return <ArrowRight size={14} style={{ color: 'var(--text-secondary)' }} />;
    }
  };

  const currentTrends = selectedPeriod === '28days' ? trendsData['28days'] : trendsData['7days'];

  // Filter cards based on selected status
  const filteredCards = dailyActionCards.filter(card => card.status === statusFilter);

  // Get section header based on filter
  const getSectionHeader = (filter: StatusFilter) => {
    switch (filter) {
      case 'critical': return 'Critical Alerts';
      case 'warning': return 'Needs Improvement';
      case 'good': return 'On Track';
    }
  };

  // Handle row click to open popup
  const handleRowClick = (card: ActionCard) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
    onModalStateChange?.(true);
  };

  // Close popup
  const closePopup = () => {
    setIsPopupOpen(false);
    onModalStateChange?.(false);
    setTimeout(() => setSelectedCard(null), 300); // Clear after animation
  };

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPopupOpen) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopupOpen]);

  // Get detailed description for each insight
  const getInsightDescription = (cardId: string): string => {
    switch (cardId) {
      case 'hydration':
        return 'Your hydration is behind target for today. Drinking water consistently throughout the day helps maintain performance and recovery. Aim to catch up gradually rather than drinking large amounts at once.';
      case 'preworkout':
        return 'Your pre-workout fueling is optimally timed. Continue consuming 30g carbs 30-60 minutes before training for sustained energy throughout your session.';
      case 'duringworkout':
        return 'During-workout fueling setup is complete. The combination of carbs and electrolytes will help maintain performance during longer training sessions (>60 minutes).';
      case 'protein':
        return 'Your protein intake is currently 57% of daily target. Focus on adding 20-25g protein to your next meal to better support muscle recovery and adaptation.';
      case 'carbs':
        return 'Carb periodization is on track for your low training day. This helps improve metabolic flexibility while ensuring adequate fuel for tomorrow\'s session.';
      case 'energy':
        return 'You\'re in a caloric surplus today. Consider reducing portion sizes at dinner or increasing activity to maintain your current body composition goals.';
      case 'recovery':
        return 'Post-workout nutrition is incomplete. Adding a recovery meal within 2 hours of training optimizes muscle protein synthesis and glycogen replenishment.';
      case 'sleep':
        return 'Sleep debt is accumulating. Prioritizing 7-9 hours of quality sleep supports recovery, hormone regulation, and next-day performance.';
      default:
        return 'Take action on this insight to optimize your nutrition and performance.';
    }
  };

  // Get actionable recommendations
  const getActionRecommendations = (cardId: string): string[] => {
    switch (cardId) {
      case 'hydration':
        return [
          'Drink 300ml water now',
          'Set hourly hydration reminders',
          'Add electrolytes if sweating heavily',
          'Monitor urine color as hydration indicator'
        ];
      case 'preworkout':
        return [
          'Continue current timing (30-60min pre)',
          'Monitor energy levels during training',
          'Adjust quantity if digestive issues occur',
          'Consider liquid carbs for early sessions'
        ];
      case 'duringworkout':
        return [
          'Consume 30-60g carbs per hour during exercise',
          'Include 200-300mg sodium per hour',
          'Start fueling 15-20 minutes into session',
          'Practice fueling strategy during training'
        ];
      case 'protein':
        return [
          'Add 20-25g protein to next meal',
          'Include complete protein sources',
          'Distribute evenly across 3-4 meals',
          'Consider post-workout protein timing'
        ];
      case 'carbs':
        return [
          'Maintain lower carb intake today',
          'Focus timing around training',
          'Increase tomorrow for high-intensity session',
          'Monitor energy and recovery'
        ];
      case 'energy':
        return [
          'Reduce dinner portion by 20%',
          'Add 10-15min walk after meals',
          'Choose lower calorie-dense foods',
          'Monitor weight trends weekly'
        ];
      case 'recovery':
        return [
          'Consume protein + carbs within 2h post-workout',
          'Aim for 3:1 or 4:1 carb:protein ratio',
          'Include anti-inflammatory foods',
          'Schedule recovery meals in advance'
        ];
      case 'sleep':
        return [
          'Set bedtime 1 hour earlier tonight',
          'Create consistent sleep routine',
          'Limit screens 1h before bed',
          'Optimize bedroom temperature (65-68°F)'
        ];
      default:
        return ['Follow the recommended action', 'Monitor progress', 'Adjust as needed'];
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="px-5 pt-12 h-full flex flex-col">
        {/* Status Bar */}
        <div 
          className="flex justify-between items-center mb-8 text-sm flex-shrink-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <span style={{ fontWeight: 500 }}>28°C</span>
            <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-8 pb-8">
          {/* Header */}
          <div>
            <h1 className="mb-1" style={{ color: 'var(--text-primary)' }}>Insights</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Take action • Track trends • Get coached
            </p>
          </div>

          {/* Layer 1: At a Glance – Compact Rows with Filter */}
          <section>
            {/* Status Filter Switcher */}
            <div className="mb-4">
              <div 
                className="flex rounded-xl p-1"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)'
                }}
              >
                <button
                  onClick={() => setStatusFilter('critical')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: statusFilter === 'critical' ? '#FF3B30' : 'transparent',
                    color: statusFilter === 'critical' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: statusFilter === 'critical' ? 600 : 500
                  }}
                >
                  <span className="text-sm">!!</span>
                  <span className="text-xs">Critical</span>
                </button>
                
                <button
                  onClick={() => setStatusFilter('warning')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: statusFilter === 'warning' ? '#FF9500' : 'transparent',
                    color: statusFilter === 'warning' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: statusFilter === 'warning' ? 600 : 500
                  }}
                >
                  <span className="text-sm">⚠️</span>
                  <span className="text-xs">Warning</span>
                </button>
                
                <button
                  onClick={() => setStatusFilter('good')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: statusFilter === 'good' ? '#34C759' : 'transparent',
                    color: statusFilter === 'good' ? '#FFFFFF' : 'var(--text-secondary)',
                    fontWeight: statusFilter === 'good' ? 600 : 500
                  }}
                >
                  <span className="text-sm">✓✓</span>
                  <span className="text-xs">Good</span>
                </button>
              </div>
              <p 
                className="text-sm mt-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Filter insights by status type
              </p>
            </div>
            
            {/* Compact Row List */}
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {filteredCards.length > 0 ? (
                  <motion.div
                    key={statusFilter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.25,
                      ease: "easeOut"
                    }}
                    className="space-y-3"
                  >
                    {filteredCards.map((card, index) => {
                      const statusColor = getStatusColor(card.status);
                      return (
                        <motion.div
                          key={card.id}
                          className="cursor-pointer flex items-center"
                          style={{
                            height: '52px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            borderRadius: '12px',
                            backgroundColor: 'transparent'
                          }}
                          whileHover={{
                            backgroundColor: 'var(--bg-card)',
                            transition: { 
                              duration: 0.15,
                              ease: [0.25, 0.46, 0.45, 0.94]
                            }
                          }}
                          whileTap={{ 
                            scale: 0.98,
                            transition: { duration: 0.1, ease: "easeOut" }
                          }}
                          onClick={() => handleRowClick(card)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: index * 0.03,
                            duration: 0.25,
                            ease: "easeOut"
                          }}
                        >
                          {/* Left: Status Icon */}
                          <div 
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3"
                            style={{ backgroundColor: statusColor.iconColor }}
                          >
                            {React.cloneElement(card.icon as React.ReactElement, { 
                              size: 14, 
                              color: '#FFFFFF'
                            })}
                          </div>
                          
                          {/* Middle: Content */}
                          <div className="flex-1 min-w-0">
                            <h4 
                              className="truncate mb-0.5"
                              style={{ 
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '1.2',
                                color: 'var(--text-primary)'
                              }}
                            >
                              {card.title}
                            </h4>
                            <p 
                              className="truncate"
                              style={{ 
                                fontSize: '12px',
                                fontWeight: 400,
                                lineHeight: '1.1',
                                color: 'var(--text-secondary)'
                              }}
                            >
                              {card.value}
                            </p>
                          </div>
                          
                          {/* Right: Chevron */}
                          <ChevronRight 
                            size={16} 
                            style={{ 
                              color: 'var(--text-placeholder)',
                              flexShrink: 0,
                              marginLeft: '12px'
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`empty-${statusFilter}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-8"
                  >
                    <div 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      No {getSectionHeader(statusFilter).toLowerCase()} items
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Layer 2: Trends – 7 & 28 Days */}
          <section>
            <div className="mb-4">
              <h2 
                className="text-lg mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Trends
              </h2>
              <p 
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                How you're progressing over time
              </p>
            </div>

            {/* Time Period Selector */}
            <div className="mb-6">
              <div 
                className="flex rounded-xl p-1"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                {(['7days', '28days'] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className="flex-1 py-2 px-3 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: selectedPeriod === period ? 'var(--bg-main)' : 'transparent',
                      color: selectedPeriod === period ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: 500,
                      boxShadow: selectedPeriod === period ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
                    }}
                  >
                    {period === '7days' ? '7 Days' : '28 Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Trends Grid */}
            <div className="space-y-4">
              {currentTrends.map((trend, index) => (
                  <motion.div
                    key={trend.id}
                    className="rounded-2xl p-5"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
                      border: '1px solid var(--border)'
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 
                          className="text-sm"
                          style={{ 
                            color: 'var(--text-secondary)',
                            fontWeight: 500
                          }}
                        >
                          {trend.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          {getChangeIcon(trend.change)}
                          <span 
                            className="text-xs"
                            style={{ color: 'var(--text-placeholder)' }}
                          >
                            {trend.changeText}
                          </span>
                        </div>
                      </div>
                      <p 
                        className="text-lg mb-1"
                        style={{ 
                          color: 'var(--text-primary)',
                          fontWeight: 600
                        }}
                      >
                        {trend.value}
                      </p>
                    </div>

                    {/* Premium Mini Chart */}
                    <div className="h-24 mb-4 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        {trend.id === 'carbs' ? (
                          <BarChart 
                            data={trend.data}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          >
                            <defs>
                              <linearGradient id={`barGradient-${trend.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--graph-data)" stopOpacity={1} />
                                <stop offset="100%" stopColor="var(--graph-data)" stopOpacity={0.6} />
                              </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="day" 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: 'var(--text-placeholder)' }}
                              height={20}
                            />
                            <YAxis hide />
                            <Bar 
                              dataKey="value" 
                              fill={`url(#barGradient-${trend.id})`}
                              radius={[2, 2, 0, 0]}
                              maxBarSize={20}
                            />
                          </BarChart>
                        ) : (
                          <AreaChart 
                            data={trend.data}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                          >
                            <defs>
                              <linearGradient id={`areaGradient-${trend.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--graph-data)" stopOpacity={0.6} />
                                <stop offset="100%" stopColor="var(--graph-data)" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="day" 
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: 'var(--text-placeholder)' }}
                              height={20}
                            />
                            <YAxis hide />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="var(--graph-data)" 
                              strokeWidth={2}
                              fill={`url(#areaGradient-${trend.id})`}
                            />
                          </AreaChart>
                        )}
                      </ResponsiveContainer>
                    </div>

                    <button 
                      className="w-full py-2 px-4 rounded-lg text-sm transition-all duration-150"
                      style={{
                        backgroundColor: 'var(--bg-main)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        fontWeight: 500
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                        e.currentTarget.style.borderColor = 'var(--btn-primary-bg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      {trend.cta}
                    </button>
                  </motion.div>
              ))}
            </div>
          </section>

          {/* Layer 3: Smart Coach Recommendations */}
          <section>
            <div className="mb-6">
              <h2 
                className="text-lg mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Coach Recommendations
              </h2>
              <p 
                className="text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                AI-powered guidance tailored to your goals
              </p>
            </div>

            <div className="mb-6">
              <CoachTips />
            </div>
          </section>
        </div>
      </div>

      {/* Center-Positioned Insight Detail Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[9990]"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={closePopup}
            />
            
            {/* Popup Container */}
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="w-full max-w-md max-h-[80vh] overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: 'var(--bg-main)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border)'
                }}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div 
                  className="flex items-center justify-between p-6 pb-4"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: getStatusColor(selectedCard.status).iconColor }}
                    >
                      {React.cloneElement(selectedCard.icon as React.ReactElement, { 
                        size: 20, 
                        color: '#FFFFFF'
                      })}
                    </div>
                    <div>
                      <h3 
                        style={{ 
                          color: 'var(--text-primary)',
                          fontWeight: 600,
                          fontSize: '18px',
                          lineHeight: '1.3'
                        }}
                      >
                        {selectedCard.title}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {selectedCard.value}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={closePopup}
                    className="p-2 rounded-full transition-colors"
                    style={{ 
                      color: 'var(--text-secondary)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                  {/* Progress Chart */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span 
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)', fontWeight: 500 }}
                      >
                        Today's Progress
                      </span>
                      <span 
                        className="text-sm"
                        style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                      >
                        {selectedCard.current}{selectedCard.unit} / {selectedCard.target}{selectedCard.unit}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative">
                      <div 
                        className="w-full h-2 rounded-full"
                        style={{ backgroundColor: 'var(--bg-card)' }}
                      >
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: getStatusColor(selectedCard.status).iconColor,
                            width: `${Math.min((selectedCard.current / selectedCard.target) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Daily Trend Chart - Dual Line (Current vs Needed) */}
                    <div className="mt-4 h-32">
                      <div className="flex justify-between items-center mb-2">
                        <span 
                          className="text-xs"
                          style={{ color: 'var(--text-secondary)', fontWeight: 500 }}
                        >
                          Daily Progression
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-3 h-0.5"
                              style={{ 
                                backgroundColor: 'var(--text-placeholder)',
                                borderStyle: 'dashed',
                                borderWidth: '0 0 1px 0',
                                borderColor: 'var(--text-placeholder)'
                              }}
                            />
                            <span 
                              className="text-xs"
                              style={{ color: 'var(--text-placeholder)' }}
                            >
                              Target
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-3 h-0.5"
                              style={{ backgroundColor: getStatusColor(selectedCard.status).lineColor }}
                            />
                            <span 
                              className="text-xs"
                              style={{ color: 'var(--text-placeholder)' }}
                            >
                              Current
                            </span>
                          </div>
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={generateDualLineTrendData(selectedCard.id, selectedCard.target, selectedCard.current, selectedCard.unit)}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id={`currentGradient-${selectedCard.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={getStatusColor(selectedCard.status).lineColor} stopOpacity={0.2} />
                              <stop offset="100%" stopColor={getStatusColor(selectedCard.status).lineColor} stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="time" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 9, fill: 'var(--text-placeholder)' }}
                            tickFormatter={(value) => value.replace(':00', '')}
                            interval={3}
                          />
                          <YAxis 
                            hide 
                            domain={[0, selectedCard.target * 1.1]}
                          />
                          
                          {/* Target Line (Dashed Gray) */}
                          <Line 
                            type="monotone" 
                            dataKey="target" 
                            stroke="var(--text-placeholder)"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={false}
                            connectNulls={true}
                          />
                          
                          {/* Current Progress Line (Solid with Area Fill) */}
                          <Area 
                            type="monotone" 
                            dataKey="current" 
                            stroke={getStatusColor(selectedCard.status).lineColor}
                            strokeWidth={3}
                            fill={`url(#currentGradient-${selectedCard.id})`}
                            dot={false}
                            connectNulls={false}
                          />
                          
                          {/* Current Progress Line (Solid) - Adding as Line for better visibility */}
                          <Line 
                            type="monotone" 
                            dataKey="current" 
                            stroke={getStatusColor(selectedCard.status).lineColor}
                            strokeWidth={3}
                            dot={false}
                            connectNulls={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 
                      className="mb-2"
                      style={{ 
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '16px'
                      }}
                    >
                      Why This Matters
                    </h4>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {getInsightDescription(selectedCard.id)}
                    </p>
                  </div>

                  {/* Action Recommendations */}
                  <div className="mb-6">
                    <h4 
                      className="mb-3"
                      style={{ 
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '16px'
                      }}
                    >
                      Recommended Actions
                    </h4>
                    <div className="space-y-2">
                      {getActionRecommendations(selectedCard.id).map((action, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg"
                          style={{ backgroundColor: 'var(--bg-card)' }}
                        >
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ 
                              backgroundColor: getStatusColor(selectedCard.status).iconColor + '20',
                              color: getStatusColor(selectedCard.status).iconColor
                            }}
                          >
                            <span 
                              className="text-xs"
                              style={{ fontWeight: 600 }}
                            >
                              {index + 1}
                            </span>
                          </div>
                          <p 
                            className="text-sm"
                            style={{ 
                              color: 'var(--text-primary)',
                              lineHeight: '1.4'
                            }}
                          >
                            {action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div 
                  className="p-6 pt-4"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <div className="flex gap-3">
                    <button
                      onClick={closePopup}
                      className="flex-1 py-3 px-4 rounded-lg text-sm transition-all duration-150"
                      style={{
                        backgroundColor: 'var(--btn-secondary-bg)',
                        color: 'var(--btn-secondary-text)',
                        border: '1px solid var(--border)',
                        fontWeight: 500
                      }}
                    >
                      Done
                    </button>
                    
                    <button
                      className="flex-1 py-3 px-4 rounded-lg text-sm transition-all duration-150"
                      style={{
                        backgroundColor: getStatusColor(selectedCard.status).iconColor,
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 600
                      }}
                      onClick={() => {
                        console.log(`Taking action on ${selectedCard.title}: ${selectedCard.cta}`);
                        // Here you would implement the actual action
                        closePopup();
                      }}
                    >
                      {selectedCard.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}