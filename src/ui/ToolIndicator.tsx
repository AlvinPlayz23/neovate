import { Box, Text } from 'ink';
import React from 'react';
import { SPACING, UI_COLORS } from './constants';
import { useAppStore } from './store';

interface ToolIndicatorProps {
  toolName: string;
  displayName?: string;
  description?: string;
  status?: 'pending' | 'running' | 'completed' | 'error';
  category?: 'read' | 'write' | 'command' | 'network';
  isAnimated?: boolean;
}

function getToolIcon(toolName: string): string {
  const iconMap: Record<string, string> = {
    read: '📖',
    write: '✏️',
    edit: '📝',
    bash: '💻',
    fetch: '🌐',
    glob: '🔍',
    grep: '🔎',
    ls: '📁',
    todo: '✅',
  };
  return iconMap[toolName] || '🔧';
}

function getCategoryColor(category?: string): string {
  switch (category) {
    case 'read':
      return UI_COLORS.SUCCESS; // green
    case 'write':
      return UI_COLORS.WARNING; // yellow
    case 'command':
      return UI_COLORS.ERROR; // red
    case 'network':
      return '#4A90E2'; // blue
    default:
      return UI_COLORS.TOOL; // default green
  }
}

function getStatusIndicator(status?: string): string {
  switch (status) {
    case 'pending':
      return '⏳';
    case 'running':
      return '🔄';
    case 'completed':
      return '✅';
    case 'error':
      return '❌';
    default:
      return '';
  }
}

function getStatusColor(status?: string): string {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'running':
      return 'cyan';
    case 'completed':
      return 'green';
    case 'error':
      return 'red';
    default:
      return UI_COLORS.TOOL;
  }
}

export function ToolIndicator({
  toolName,
  displayName,
  description,
  status,
  category,
  isAnimated = false,
}: ToolIndicatorProps) {
  const icon = getToolIcon(toolName);
  const categoryColor = getCategoryColor(category);
  const statusIndicator = getStatusIndicator(status);
  const statusColor = getStatusColor(status);

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      marginTop={SPACING.MESSAGE_MARGIN_TOP}
      paddingX={1}
      borderStyle={status === 'running' ? 'single' : undefined}
      borderColor={statusColor}
    >
      {/* Tool Icon */}
      <Text color={categoryColor}>
        {icon}{' '}
      </Text>

      {/* Tool Name */}
      <Text bold color={UI_COLORS.TOOL}>
        {displayName || toolName}
      </Text>

      {/* Status Indicator */}
      {status && (
        <Text color={statusColor}>
          {' '}{statusIndicator}
        </Text>
      )}

      {/* Description */}
      {description && (
        <Text color={UI_COLORS.TOOL_DESCRIPTION}>
          {' '}{description && `(${description})`}
        </Text>
      )}

      {/* Animated dots for running status */}
      {isAnimated && status === 'running' && (
        <Text color={statusColor}>
          {' '}<AnimatedDots />
        </Text>
      )}
    </Box>
  );
}

function AnimatedDots() {
  const [dots, setDots] = React.useState('.');
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '.';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return <Text>{dots}</Text>;
}

// Enhanced version for tool pairs
interface ToolPairIndicatorProps {
  toolName: string;
  displayName?: string;
  description?: string;
  category?: 'read' | 'write' | 'command' | 'network';
  hasResult: boolean;
  isRunning?: boolean;
  hasError?: boolean;
}

export function ToolPairIndicator({
  toolName,
  displayName,
  description,
  category,
  hasResult,
  isRunning = false,
  hasError = false,
}: ToolPairIndicatorProps) {
  const icon = getToolIcon(toolName);
  const categoryColor = getCategoryColor(category);

  return (
    <Box flexDirection="column" marginTop={SPACING.MESSAGE_MARGIN_TOP}>
      {/* Tool execution line */}
      <Box flexDirection="row" alignItems="center" paddingX={1}>
        <Text color={categoryColor}>
          {icon}{' '}
        </Text>
        
        <Text bold color={UI_COLORS.TOOL}>
          {displayName || toolName}
        </Text>
        
        {isRunning && (
          <Text color="cyan">
            {' '}🔄 <AnimatedDots />
          </Text>
        )}
        
        {!isRunning && hasResult && !hasError && (
          <Text color="green">
            {' '}✅
          </Text>
        )}
        
        {hasError && (
          <Text color="red">
            {' '}❌
          </Text>
        )}
        
        {description && (
          <Text color={UI_COLORS.TOOL_DESCRIPTION}>
            {' '}{description && `(${description})`}
          </Text>
        )}
      </Box>

      {/* Result indicator */}
      {hasResult && !isRunning && (
        <Box
          flexDirection="row"
          marginLeft={4}
          marginTop={SPACING.MESSAGE_MARGIN_TOP_TOOL_RESULT}
        >
          <Text color={UI_COLORS.TOOL_RESULT}>
            ↳
          </Text>
          <Text color={hasError ? UI_COLORS.ERROR : UI_COLORS.TOOL_RESULT}>
            {' '}{hasError ? 'Execution failed' : 'Completed successfully'}
          </Text>
        </Box>
      )}
    </Box>
  );
}