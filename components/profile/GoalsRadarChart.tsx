import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit3, Check, Undo, ArrowLeftRight } from 'lucide-react';

interface GoalData {
  performance: number;
  recovery: number;
  muscleGain: number;
  weightLoss: number;
}

interface TooltipData {
  axis: string;
  value: number;
  hint: string;
  x: number;
  y: number;
  oppositeAxis?: string;
  oppositeValue?: number;
}

const axes = [
  { key: 'performance', label: 'Performance', hint: 'Overall athletic performance', opposite: 'recovery' },
  { key: 'recovery', label: 'Recovery', hint: 'Rest and recuperation quality', opposite: 'performance' },
  { key: 'muscleGain', label: 'Muscle Gain', hint: 'Strength and muscle building', opposite: 'weightLoss' },
  { key: 'weightLoss', label: 'Weight Loss', hint: 'Fat reduction progress', opposite: 'muscleGain' }
];

// Opposition pairs for visual grouping
const oppositionPairs = [
  { primary: 'performance', secondary: 'recovery', color: '#F97316' }, // Orange
  { primary: 'muscleGain', secondary: 'weightLoss', color: '#8B5CF6' }  // Purple
];

// Current goal profile data
const initialGoals: GoalData = {
  performance: 85,
  recovery: 70,
  muscleGain: 65,
  weightLoss: 40
};

interface GoalsRadarChartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoalsRadarChart({ isOpen, onClose }: GoalsRadarChartProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGoals, setCurrentGoals] = useState<GoalData>(initialGoals);
  const [originalGoals, setOriginalGoals] = useState<GoalData>(initialGoals);
  const [draggedAxis, setDraggedAxis] = useState<string | null>(null);
  const [highlightedPair, setHighlightedPair] = useState<string | null>(null);

  const size = 220;
  const center = size / 2;
  const maxRadius = 85;
  const levels = 5;

  // Calculate angle for each axis (starting from top, going clockwise)
  const angleStep = (2 * Math.PI) / axes.length;
  const startAngle = -Math.PI / 2; // Start from top

  // Apply opposition constraints
  const applyOppositionConstraints = (updatedGoals: GoalData, changedAxis: string, newValue: number): GoalData => {
    const axis = axes.find(a => a.key === changedAxis);
    if (!axis) return updatedGoals;

    const oppositeAxis = axis.opposite;
    const currentOpposite = updatedGoals[oppositeAxis as keyof GoalData];
    
    // Calculate the total "energy" available for this opposition pair
    // The sum of opposing values should remain roughly constant or decrease when one increases significantly
    const totalEnergy = 140; // Allow some flexibility, not a strict 100
    const remainingEnergy = Math.max(20, totalEnergy - newValue); // Ensure minimum 20 for opposite
    
    // Calculate new opposite value
    const newOppositeValue = Math.min(remainingEnergy, Math.max(20, currentOpposite));
    
    return {
      ...updatedGoals,
      [changedAxis]: newValue,
      [oppositeAxis]: Math.round(newOppositeValue)
    };
  };

  const handleEditToggle = () => {
    if (!isEditMode) {
      // Entering edit mode - save current state as original
      setOriginalGoals({ ...currentGoals });
      setIsEditMode(true);
    }
  };

  const handleSave = () => {
    setIsEditMode(false);
    setOriginalGoals({ ...currentGoals });
    setHighlightedPair(null);
    // Here you would typically save to backend/storage
    console.log('Saved goals:', currentGoals);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setCurrentGoals({ ...originalGoals });
    setHighlightedPair(null);
  };

  const handleClose = () => {
    if (isEditMode) {
      setCurrentGoals({ ...originalGoals });
      setIsEditMode(false);
      setHighlightedPair(null);
    }
    onClose();
  };

  // Generate points for the current goals
  const generatePoints = (data: GoalData): string => {
    const points = axes.map((axis, index) => {
      const value = data[axis.key as keyof GoalData];
      const angle = startAngle + index * angleStep;
      const radius = (value / 100) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  // Generate grid polygons
  const generateGridPolygon = (level: number): string => {
    const radius = (level / levels) * maxRadius;
    const points = axes.map((_, index) => {
      const angle = startAngle + index * angleStep;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  // Generate axis lines
  const generateAxisLines = () => {
    return axes.map((_, index) => {
      const angle = startAngle + index * angleStep;
      const x = center + maxRadius * Math.cos(angle);
      const y = center + maxRadius * Math.sin(angle);
      return {
        x1: center,
        y1: center,
        x2: x,
        y2: y
      };
    });
  };

  // Generate axis labels
  const generateAxisLabels = () => {
    return axes.map((axis, index) => {
      const angle = startAngle + index * angleStep;
      const labelRadius = maxRadius + 25;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      return {
        ...axis,
        x,
        y
      };
    });
  };

  // Generate opposition connection lines
  const generateOppositionLines = () => {
    return oppositionPairs.map(pair => {
      const primaryIndex = axes.findIndex(a => a.key === pair.primary);
      const secondaryIndex = axes.findIndex(a => a.key === pair.secondary);
      
      const primaryAngle = startAngle + primaryIndex * angleStep;
      const secondaryAngle = startAngle + secondaryIndex * angleStep;
      
      const primaryValue = currentGoals[pair.primary as keyof GoalData];
      const secondaryValue = currentGoals[pair.secondary as keyof GoalData];
      
      const primaryRadius = (primaryValue / 100) * maxRadius;
      const secondaryRadius = (secondaryValue / 100) * maxRadius;
      
      const x1 = center + primaryRadius * Math.cos(primaryAngle);
      const y1 = center + primaryRadius * Math.sin(primaryAngle);
      const x2 = center + secondaryRadius * Math.cos(secondaryAngle);
      const y2 = center + secondaryRadius * Math.sin(secondaryAngle);
      
      return {
        ...pair,
        x1, y1, x2, y2,
        primaryAxis: pair.primary,
        secondaryAxis: pair.secondary
      };
    });
  };

  // Handle vertex drag with opposition constraints
  const handleVertexDrag = useCallback((axisKey: string, event: React.MouseEvent<SVGCircleElement>) => {
    if (!isEditMode) return;

    const svg = (event.currentTarget as SVGElement).closest('svg');
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    setDraggedAxis(axisKey);
    
    // Highlight the opposing pair
    const pair = oppositionPairs.find(p => p.primary === axisKey || p.secondary === axisKey);
    if (pair) {
      setHighlightedPair(pair.primary);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const svgX = e.clientX - rect.left;
      const svgY = e.clientY - rect.top;
      
      // Calculate distance from center
      const dx = svgX - center;
      const dy = svgY - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Convert distance to percentage (0-100)
      const rawValue = Math.min(100, Math.max(0, (distance / maxRadius) * 100));
      const value = Math.round(rawValue);
      
      // Apply opposition constraints
      const constrainedGoals = applyOppositionConstraints(currentGoals, axisKey, value);
      setCurrentGoals(constrainedGoals);
    };

    const handleMouseUp = () => {
      setDraggedAxis(null);
      setHighlightedPair(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isEditMode, center, maxRadius, currentGoals]);

  // Calculate balance score (how centered the goals are)
  const calculateBalance = (data: GoalData): number => {
    const values = Object.values(data);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);
    // Convert to 0-100 scale where 100 is perfectly balanced (low deviation)
    return Math.max(0, 100 - (standardDeviation * 2));
  };

  // Handle vertex hover for tooltips
  const handleVertexHover = (axis: string, value: number, hint: string, event: React.MouseEvent) => {
    if (draggedAxis) return; // Don't show tooltip while dragging
    
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    const svgRect = (event.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    if (svgRect) {
      // Find opposite axis info
      const axisInfo = axes.find(a => a.label === axis);
      const oppositeKey = axisInfo?.opposite;
      const oppositeAxis = axes.find(a => a.key === oppositeKey);
      const oppositeValue = oppositeKey ? currentGoals[oppositeKey as keyof GoalData] : undefined;
      
      setTooltip({
        axis,
        value,
        hint,
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top,
        oppositeAxis: oppositeAxis?.label,
        oppositeValue
      });
    }
  };

  const axisLines = generateAxisLines();
  const axisLabels = generateAxisLabels();
  const oppositionLines = generateOppositionLines();
  const balanceScore = calculateBalance(currentGoals);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-sm rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
          style={{ backgroundColor: 'var(--bg-main)' }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ 
            scale: 0.85, 
            opacity: 0, 
            y: 30,
            transition: { 
              duration: 0.25, 
              ease: [0.4, 0, 0.2, 1],
              scale: { duration: 0.2 },
              opacity: { duration: 0.15 }
            }
          }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.3,
            delay: 0.05
          }}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--graph-grid) 1px, transparent 1px),
                linear-gradient(to bottom, var(--graph-grid) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Header */}
          <div 
            className="relative z-10 p-6 border-b"
            style={{ borderBottomColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>Goals Progress</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {isEditMode ? 'Drag vertices to balance your goals' : 'Your current fitness priorities'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Animated Edit/Save/Cancel Button */}
                <AnimatePresence mode="wait">
                  {!isEditMode ? (
                    <motion.button
                      key="edit"
                      onClick={handleEditToggle}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: 'var(--icon-secondary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                        e.currentTarget.style.color = 'var(--icon-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--icon-secondary)';
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit3 size={18} />
                      </motion.div>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="edit-actions"
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Cancel Button */}
                      <motion.button
                        onClick={handleCancel}
                        className="p-2 rounded-full transition-colors"
                        style={{ color: '#EF4444' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Undo size={16} />
                      </motion.button>

                      {/* Save Button */}
                      <motion.button
                        onClick={handleSave}
                        className="p-2 rounded-full transition-colors"
                        style={{ color: '#10B981' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Check size={16} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: 'var(--icon-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    e.currentTarget.style.color = 'var(--icon-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--icon-secondary)';
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Radar Chart */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative">
                <svg width={size} height={size} className="overflow-visible">
                  <defs>
                    {/* Gradient for opposing axes backgrounds */}
                    <radialGradient id="performanceRecoveryGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F97316" stopOpacity="0.08"/>
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.08"/>
                    </radialGradient>
                    <radialGradient id="muscleWeightGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.08"/>
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0.08"/>
                    </radialGradient>
                    
                    {/* Pulsing animation for edit mode */}
                    <filter id="editModePulse">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>

                    {/* Gradient for opposition connection lines */}
                    <linearGradient id="oppositionLineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.6"/>
                    </linearGradient>
                    <linearGradient id="oppositionLineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>

                  {/* Opposing goals background sectors */}
                  {/* Performance ↔ Recovery sector */}
                  <path
                    d={`M ${center} ${center} L ${center + maxRadius * Math.cos(startAngle)} ${center + maxRadius * Math.sin(startAngle)} A ${maxRadius} ${maxRadius} 0 0 1 ${center + maxRadius * Math.cos(startAngle + angleStep)} ${center + maxRadius * Math.sin(startAngle + angleStep)} Z`}
                    fill="url(#performanceRecoveryGradient)"
                    opacity={isEditMode && highlightedPair === 'performance' ? 0.3 : 0.1}
                    className="transition-opacity duration-300"
                  />
                  
                  {/* Muscle Gain ↔ Weight Loss sector */}
                  <path
                    d={`M ${center} ${center} L ${center + maxRadius * Math.cos(startAngle + 2 * angleStep)} ${center + maxRadius * Math.sin(startAngle + 2 * angleStep)} A ${maxRadius} ${maxRadius} 0 0 1 ${center + maxRadius * Math.cos(startAngle + 3 * angleStep)} ${center + maxRadius * Math.sin(startAngle + 3 * angleStep)} Z`}
                    fill="url(#muscleWeightGradient)"
                    opacity={isEditMode && highlightedPair === 'muscleGain' ? 0.3 : 0.1}
                    className="transition-opacity duration-300"
                  />

                  {/* Grid Lines */}
                  <g>
                    {/* Concentric polygons */}
                    {Array.from({ length: levels + 1 }, (_, i) => (
                      <polygon
                        key={i}
                        points={generateGridPolygon(i)}
                        fill="none"
                        stroke="var(--graph-grid)"
                        strokeWidth="1"
                        opacity={i === 0 ? 0 : 0.4}
                      />
                    ))}
                    
                    {/* Axis lines */}
                    {axisLines.map((line, index) => (
                      <line
                        key={index}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="var(--graph-grid)"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                    ))}
                  </g>

                  {/* Opposition Connection Lines - Only in edit mode */}
                  {isEditMode && (
                    <g>
                      {oppositionLines.map((line, index) => (
                        <motion.line
                          key={`opposition-${index}`}
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke={index === 0 ? "url(#oppositionLineGradient1)" : "url(#oppositionLineGradient2)"}
                          strokeWidth={highlightedPair === line.primaryAxis ? 3 : 2}
                          strokeDasharray={highlightedPair === line.primaryAxis ? "0" : "5,5"}
                          opacity={highlightedPair === line.primaryAxis ? 0.9 : 0.5}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: highlightedPair === line.primaryAxis ? 0.9 : 0.5 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="transition-all duration-300"
                        />
                      ))}
                      
                      {/* Opposition indicators at midpoints */}
                      {oppositionLines.map((line, index) => {
                        const midX = (line.x1 + line.x2) / 2;
                        const midY = (line.y1 + line.y2) / 2;
                        return (
                          <motion.g
                            key={`opposition-icon-${index}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: highlightedPair === line.primaryAxis ? 1.2 : 1, 
                              opacity: highlightedPair === line.primaryAxis ? 1 : 0.7 
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <circle
                              cx={midX}
                              cy={midY}
                              r="8"
                              fill="var(--bg-main)"
                              stroke={line.color}
                              strokeWidth="2"
                              opacity="0.9"
                            />
                            <ArrowLeftRight 
                              x={midX - 6} 
                              y={midY - 6} 
                              size={12} 
                              color={line.color}
                            />
                          </motion.g>
                        );
                      })}
                    </g>
                  )}

                  {/* Current Goals Profile */}
                  <g>
                    {/* Filled area */}
                    <motion.polygon
                      points={generatePoints(currentGoals)}
                      fill="#F97316"
                      fillOpacity={isEditMode ? 0.3 : 0.2}
                      stroke="none"
                      initial={false}
                      animate={{ fillOpacity: isEditMode ? 0.3 : 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Stroke outline */}
                    <motion.polygon
                      points={generatePoints(currentGoals)}
                      fill="none"
                      stroke="#F97316"
                      strokeWidth={isEditMode ? 4 : 3}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={isEditMode ? "url(#editModePulse)" : undefined}
                      initial={false}
                      animate={{ 
                        strokeWidth: isEditMode ? 4 : 3,
                        opacity: isEditMode ? 0.9 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Vertices */}
                    {axes.map((axis, axisIndex) => {
                      const value = currentGoals[axis.key as keyof GoalData];
                      const angle = startAngle + axisIndex * angleStep;
                      const radius = (value / 100) * maxRadius;
                      const x = center + radius * Math.cos(angle);
                      const y = center + radius * Math.sin(angle);
                      const isDragged = draggedAxis === axis.key;
                      
                      // Check if this axis is part of highlighted pair
                      const isInHighlightedPair = highlightedPair && oppositionPairs.some(pair => 
                        (pair.primary === highlightedPair || pair.secondary === highlightedPair) &&
                        (pair.primary === axis.key || pair.secondary === axis.key)
                      );
                      
                      return (
                        <motion.circle
                          key={`${axis.key}`}
                          cx={x}
                          cy={y}
                          r={isEditMode ? (isDragged ? 8 : 6) : 5}
                          fill={isInHighlightedPair ? "#F59E0B" : "#F97316"}
                          stroke="var(--bg-main)"
                          strokeWidth={isEditMode ? 4 : 3}
                          className={isEditMode ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}
                          onMouseDown={isEditMode ? (e) => handleVertexDrag(axis.key, e) : undefined}
                          onMouseEnter={(e) => handleVertexHover(axis.label, value, axis.hint, e)}
                          onMouseLeave={() => setTooltip(null)}
                          whileHover={{ scale: isEditMode ? 1.2 : 1.1 }}
                          animate={{ 
                            r: isEditMode ? (isDragged ? 8 : 6) : 5,
                            strokeWidth: isEditMode ? 4 : 3,
                            scale: isDragged ? 1.3 : 1,
                            fill: isInHighlightedPair ? "#F59E0B" : "#F97316"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            filter: isEditMode ? 'drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3))' : 'none'
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Center balance indicator */}
                  <g>
                    {/* Balance ring */}
                    <circle
                      cx={center}
                      cy={center}
                      r={8}
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    
                    {/* Balance dot - size based on balance score */}
                    <motion.circle
                      cx={center}
                      cy={center}
                      r={3 + (balanceScore / 100) * 3}
                      fill="#10B981"
                      opacity={0.6 + (balanceScore / 100) * 0.4}
                      animate={{ 
                        r: 3 + (balanceScore / 100) * 3,
                        opacity: 0.6 + (balanceScore / 100) * 0.4
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </g>

                  {/* Axis Labels */}
                  {axisLabels.map((label) => {
                    const isInHighlightedPair = highlightedPair && oppositionPairs.some(pair => 
                      (pair.primary === highlightedPair || pair.secondary === highlightedPair) &&
                      (pair.primary === label.key || pair.secondary === label.key)
                    );
                    
                    return (
                      <text
                        key={label.key}
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-medium"
                        style={{ 
                          fill: isInHighlightedPair ? '#F59E0B' : 'var(--text-secondary)',
                          transition: 'fill 0.3s ease'
                        }}
                      >
                        {label.label}
                      </text>
                    );
                  })}

                  {/* Tooltip */}
                  {tooltip && (
                    <g>
                      <motion.rect
                        x={tooltip.x - 60}
                        y={tooltip.y - 40}
                        width={120}
                        height={32}
                        rx={8}
                        fill="var(--tooltip-bg)"
                        stroke="var(--border)"
                        strokeWidth={1}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <text
                        x={tooltip.x}
                        y={tooltip.y - 30}
                        textAnchor="middle"
                        className="text-xs font-medium"
                        style={{ fill: 'var(--tooltip-text)' }}
                      >
                        {tooltip.axis}: {tooltip.value}%
                      </text>
                      <text
                        x={tooltip.x}
                        y={tooltip.y - 18}
                        textAnchor="middle"
                        className="text-xs"
                        style={{ fill: 'var(--text-placeholder)' }}
                      >
                        {tooltip.hint}
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </motion.div>

            {/* Balance Score */}
            <motion.div 
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Balance Score:</span>
                <span 
                  className="font-medium"
                  style={{ color: balanceScore > 70 ? '#10B981' : balanceScore > 40 ? '#F59E0B' : '#EF4444' }}
                >
                  {Math.round(balanceScore)}%
                </span>
              </div>
            </motion.div>

            {/* Edit Mode Instructions */}
            {isEditMode && (
              <motion.div 
                className="text-center text-xs p-3 rounded-xl"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-placeholder)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                💡 Drag any vertex to adjust goals. Opposing goals will auto-balance.
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}