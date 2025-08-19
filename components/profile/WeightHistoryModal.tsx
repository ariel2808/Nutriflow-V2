import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Dot, Area, AreaChart } from 'recharts';
import { X, Plus, Edit2, Trash2, Check, ChevronDown } from 'lucide-react';
import { AddWeightModal } from './AddWeightModal';

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  timestamp: number;
}

interface WeightHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeight: number;
  onWeightUpdate: (newWeight: number) => void;
}

// Mock weight history data
const initialWeightHistory: WeightEntry[] = [
  { id: '1', date: '2024-08-08', weight: 78.0, timestamp: Date.now() },
  { id: '2', date: '2024-08-01', weight: 78.2, timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 },
  { id: '3', date: '2024-07-25', weight: 77.8, timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000 },
  { id: '4', date: '2024-07-18', weight: 78.5, timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000 },
  { id: '5', date: '2024-07-11', weight: 79.1, timestamp: Date.now() - 28 * 24 * 60 * 60 * 1000 },
  { id: '6', date: '2024-07-04', weight: 79.3, timestamp: Date.now() - 35 * 24 * 60 * 60 * 1000 },
  { id: '7', date: '2024-06-27', weight: 79.8, timestamp: Date.now() - 42 * 24 * 60 * 60 * 1000 },
];

export function WeightHistoryModal({ isOpen, onClose, currentWeight, onWeightUpdate }: WeightHistoryModalProps) {
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>(initialWeightHistory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editWeight, setEditWeight] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<WeightEntry | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const startDate = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].date : new Date().toISOString().split('T')[0];

  const handleAddWeight = (weight: number, date: string) => {
    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      date: date,
      weight: weight,
      timestamp: new Date(date).getTime()
    };
    
    const updatedHistory = [...weightHistory, newEntry].sort((a, b) => b.timestamp - a.timestamp);
    setWeightHistory(updatedHistory);
    onWeightUpdate(weight);
  };

  const handleEditWeight = (id: string, weight: number) => {
    setEditingId(id);
    setEditWeight(weight.toString());
  };

  const handleSaveEdit = () => {
    if (editingId && editWeight) {
      const updatedHistory = weightHistory.map(entry =>
        entry.id === editingId ? { ...entry, weight: parseFloat(editWeight) } : entry
      );
      setWeightHistory(updatedHistory);
      
      // Update current weight if editing the latest entry
      const latestEntry = updatedHistory.sort((a, b) => b.timestamp - a.timestamp)[0];
      if (editingId === latestEntry.id) {
        onWeightUpdate(parseFloat(editWeight));
      }
      
      setEditingId(null);
      setEditWeight('');
    }
  };

  const handleDeleteWeight = (id: string) => {
    const updatedHistory = weightHistory.filter(entry => entry.id !== id);
    setWeightHistory(updatedHistory);
    
    // Update current weight if deleting the latest entry
    if (updatedHistory.length > 0) {
      const latestEntry = updatedHistory.sort((a, b) => b.timestamp - a.timestamp)[0];
      onWeightUpdate(latestEntry.weight);
    }
    
    setShowDeleteConfirm(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Prepare chart data
  const chartData = weightHistory
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(entry => ({
      ...entry,
      displayDate: formatDate(entry.date)
    }));

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={4}
        fill="#60A5FA"
        stroke="#ffffff"
        strokeWidth={2}
        onClick={() => setSelectedPoint(payload)}
        className="cursor-pointer hover:r-5 transition-all"
      />
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
      >
        {/* Backdrop - Immediate blur effect */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          onClick={onClose}
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
                <h2 className="text-xl" style={{ color: 'var(--text-primary)' }}>Weight History</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tracking since {formatFullDate(startDate)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: '#4A90E2' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Plus size={20} />
                </button>
                <button
                  onClick={onClose}
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
          <div className="relative z-10 flex flex-col max-h-[calc(90vh-120px)]">
            {/* Chart */}
            <motion.div 
              className="p-6 border-b"
              style={{ borderBottomColor: 'var(--border)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              <div className="h-32 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="displayDate" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'var(--text-placeholder)' }}
                    />
                    <YAxis hide />
                    <Area 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#60A5FA" 
                      strokeWidth={2}
                      fill="url(#weightGradient)"
                      dot={<CustomDot />}
                      animationBegin={200}
                      animationDuration={800}
                      isAnimationActive={true}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Tooltip for selected point */}
              {selectedPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="rounded-lg p-3 mb-4 border"
                  style={{
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderColor: '#4A90E2'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#4A90E2' }}>{formatFullDate(selectedPoint.date)}</p>
                      <p className="text-lg" style={{ color: '#4A90E2' }}>{selectedPoint.weight} kg</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditWeight(selectedPoint.id, selectedPoint.weight)}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#4A90E2' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(selectedPoint.id)}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#EF4444' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Show History Button */}
            {!showHistory && (
              <motion.div 
                className="p-6 border-t"
                style={{ borderTopColor: 'var(--border)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
              >
                <button
                  onClick={() => setShowHistory(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm transition-colors"
                  style={{ color: 'var(--text-placeholder)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-placeholder)';
                  }}
                >
                  <span>Show History ({weightHistory.length} entries)</span>
                  <ChevronDown size={16} />
                </button>
              </motion.div>
            )}

            {/* History List */}
            {showHistory && (
              <motion.div 
                className="flex-1 overflow-y-auto border-t"
                style={{ borderTopColor: 'var(--border)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="p-6">
                  {/* Hide History Button */}
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-sm" style={{ color: 'var(--text-secondary)' }}>Weight History</h3>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-xs transition-colors"
                      style={{ color: 'var(--text-placeholder)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-placeholder)';
                      }}
                    >
                      Hide History
                    </button>
                  </div>

                  {/* History Items */}
                  <div className="space-y-2">
                    <AnimatePresence>
                      {weightHistory
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((entry, index) => (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between py-3 px-4 rounded-xl transition-colors"
                            style={{
                              backgroundColor: 'var(--bg-main)',
                              border: '1px solid var(--border)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                            }}
                          >
                            <div className="flex-1">
                              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{formatFullDate(entry.date)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {editingId === entry.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={editWeight}
                                    onChange={(e) => setEditWeight(e.target.value)}
                                    className="w-16 px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    style={{
                                      backgroundColor: 'var(--input-bg)',
                                      border: '1px solid var(--input-border)',
                                      color: 'var(--input-text)'
                                    }}
                                  />
                                  <button
                                    onClick={handleSaveEdit}
                                    className="p-1 rounded transition-colors"
                                    style={{ color: '#10B981' }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                  >
                                    <Check size={16} />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{entry.weight} kg</p>
                                  <button
                                    onClick={() => handleEditWeight(entry.id, entry.weight)}
                                    className="p-1 rounded transition-colors"
                                    style={{ color: 'var(--icon-secondary)' }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = 'var(--icon-primary)';
                                      e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = 'var(--icon-secondary)';
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>

        {/* Delete Confirmation */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              className="absolute inset-0 z-60 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
            >
              {/* Subtle backdrop for confirmation */}
              <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
                onClick={() => setShowDeleteConfirm(null)}
              />
              <motion.div
                className="relative rounded-2xl p-6 shadow-2xl max-w-xs w-full"
                style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border)'
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ 
                  scale: 0.8, 
                  opacity: 0,
                  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                }}
              >
                <h3 className="text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Delete Measurement</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Are you sure you want to delete this weight measurement? This action cannot be undone.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-6 py-2.5 rounded-full text-sm transition-colors"
                    style={{
                      backgroundColor: 'var(--btn-secondary-bg)',
                      color: 'var(--btn-secondary-text)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteWeight(showDeleteConfirm)}
                    className="px-6 py-2.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Weight Modal */}
        <AddWeightModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddWeight={handleAddWeight}
        />
      </motion.div>
      )}
    </AnimatePresence>
  );
}