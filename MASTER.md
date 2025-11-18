# Neovate Code - Master Documentation

## Overview

Neovate Code is a TypeScript-based AI coding agent CLI that enhances development workflow through intelligent code assistance. It provides a command-line interface with support for multiple LLM providers and Model Context Protocol (MCP) servers.

## Architecture

### Core Structure

The codebase follows a modular architecture with clear separation of concerns:

1. **CLI Entry Point** (`src/cli.ts`): Main entry point that initializes the product with configuration
2. **Main App** (`src/index.ts`): Core application logic, handles argument parsing, session management, and UI rendering
3. **Context System** (`src/context.ts`): Central context management for dependency injection across the application
4. **Plugin System** (`src/plugin.ts`): Extensible plugin architecture for adding custom functionality
5. **UI Layer** (`src/ui/`): React-based terminal UI components using Ink framework

### Key Components

- **Tools** (`src/tools/`): Implementation of various tools (bash, edit, read, write, grep, glob, fetch, todo) that the agent can use
- **MCP Support** (`src/mcp.ts`): Model Context Protocol integration for connecting to external AI services
- **Slash Commands** (`src/slash-commands/`): Built-in commands accessible via slash notation
- **Session Management** (`src/session.ts`): Handles session persistence and resumption
- **Message Bus** (`src/messageBus.ts`): Event-driven communication between components
- **Server Mode** (`src/server/`): HTTP server mode for browser-based UI

## File Structure and Definitions

### Core Application Files

#### `src/cli.ts` (27 lines)
**Purpose**: CLI entry point that sets up and runs the Neovate application.
**Key Functions**:
- Imports and runs the main `runNeovate` function with product configuration
- Sets up package metadata and installation directory
- Handles error catching and logging

#### `src/index.ts` (417 lines)
**Purpose**: Main application logic and orchestration.
**Key Functions**:
- `parseArgs()`: Command line argument parsing with yargs-parser
- `runQuiet()`: Non-interactive mode execution
- `runInteractive()`: Interactive mode with React UI
- `runNeovate()`: Main application runner with subcommand handling
**Features**:
- Supports multiple modes: interactive, quiet, server
- Handles subcommands: config, commit, mcp, log, run, update, workspace
- Manages session initialization and resumption

### Configuration and Context

#### `src/config.ts` (372 lines)
**Purpose**: Configuration management system.
**Key Classes**:
- `ConfigManager`: Handles global and project-specific configuration
- Supports MCP server configurations, model settings, approval modes
- Manages API keys and provider settings

#### `src/context.ts` (181 lines)
**Purpose**: Application context and dependency injection.
**Key Classes**:
- `Context`: Central context for plugins and services
- Handles plugin registration and lifecycle management
- Manages background task manager and message bus

### UI System

#### `src/ui/App.tsx` (135 lines)
**Purpose**: Main React application component.
**Key Components**:
- Renders Messages, ActivityIndicator, QueueDisplay, ChatInput
- Handles modals: ApprovalModal, ForkModal
- Manages slash command JSX rendering

#### `src/ui/store.ts` (1124 lines)
**Purpose**: Global state management using Zustand.
**Key Features**:
- App status management (idle, processing, failed, etc.)
- Message and session state
- Tool approval workflows
- Input handling and history
- Background task management

#### `src/ui/ActivityIndicator.tsx` (83 lines)
**Purpose**: Shows processing status and activity indicators.
**Features**:
- Animated gradient text for processing state
- Token count display
- Retry information display
- Error state handling

#### `src/ui/StatusLine.tsx` (183 lines)
**Purpose**: Status bar showing model, context, and session info.
**Features**:
- Model and provider information
- Context usage percentage with color coding
- Session ID display
- Approval mode indicator

#### `src/ui/ModeIndicator.tsx` (52 lines)
**Purpose**: Displays current mode (plan, brainstorm, bash).
**Features**:
- Plan mode indicator with toggle hint
- Brainstorm mode indicator
- Bash mode indicator

#### `src/ui/Messages.tsx` (683 lines)
**Purpose**: Message rendering and display logic.
**Key Features**:
- Static and dynamic message separation
- Tool use and result pairing
- Bash command/output handling
- Diff viewer integration
- Todo list rendering

### Tool System

#### `src/tool.ts` (277 lines)
**Purpose**: Tool creation and management system.
**Key Classes**:
- `Tool`: Interface for all tools with parameters, execution, and approval
- `Tools`: Tool registry and invocation handler
- `createTool()`: Factory function for tool creation
**Features**:
- Dynamic tool resolution based on context
- MCP tool integration
- Approval categories (read, write, command, network)

#### Tool Implementations

##### `src/tools/read.ts` (198 lines)
**Purpose**: File reading tool with image support.
**Features**:
- Text file reading with line limits
- Image file processing (PNG, JPG, GIF, etc.)
- Security validation for path traversal
- Large file handling with truncation

##### `src/tools/bash.ts` (793 lines)
**Purpose**: Command execution tool with background support.
**Features**:
- Command validation and security checks
- Background task management
- Output truncation and streaming
- High-risk command detection
- Cross-platform support (Windows/Unix)

### Message and Communication

#### `src/message.ts` (252 lines)
**Purpose**: Message type definitions and utilities.
**Key Types**:
- `SystemMessage`, `UserMessage`, `AssistantMessage`, `ToolMessage`
- `TextPart`, `ImagePart`, `ToolUsePart`, `ReasoningPart`
- Message normalization and validation functions

#### `src/messageBus.ts` (390 lines)
**Purpose**: Inter-component communication system.
**Key Classes**:
- `MessageBus`: Event-driven message passing
- `DirectTransport`: In-memory transport for UI-Node communication
- Request/response pattern with timeout handling

### Session and History

#### `src/session.ts` (160 lines)
**Purpose**: Session management and persistence.
**Key Classes**:
- `Session`: Session data and history management
- `SessionConfigManager`: Configuration persistence
- Session ID generation and resumption logic

#### `src/history.ts` (315 lines)
**Purpose**: Message history management with compression.
**Key Classes**:
- `History`: Message storage and retrieval
- Context window management with smart compression
- Language model v2 message format conversion

### Model and Provider System

#### `src/model.ts` (1546 lines)
**Purpose**: LLM provider and model management.
**Key Features**:
- Multiple provider support (Anthropic, OpenAI, Google, etc.)
- Model configuration and limits
- API key management
- Cost and usage tracking

#### `src/mcp.ts` (568 lines)
**Purpose**: Model Context Protocol integration.
**Key Classes**:
- `MCPManager`: MCP server lifecycle management
- Server connection and tool discovery
- Error handling and retry logic

### Plugin System

#### `src/plugin.ts` (271 lines)
**Purpose**: Plugin architecture and lifecycle management.
**Key Features**:
- Plugin hook system (initialized, telemetry, etc.)
- Dynamic plugin loading
- Context injection for plugins

### Utility Modules

#### `src/utils/` directory
Contains various utility modules:
- `error.ts`: Error handling utilities
- `files.ts`: File system operations
- `git.ts`: Git integration
- `logger.ts`: Logging utilities
- `markdown.ts`: Markdown processing
- `shell-execution.ts`: Shell command execution
- `terminal.ts`: Terminal utilities
- `tokenCounter.ts`: Token counting for LLMs

### Commands

#### `src/commands/` directory
Built-in CLI commands:
- `config.ts`: Configuration management
- `commit.ts`: Git commit assistance
- `mcp.ts`: MCP server management
- `log.ts`: Session log viewing
- `run.ts`: Command execution
- `update.ts`: Application updates
- `workspace.ts`: Workspace management
- `server/`: HTTP server mode

### Slash Commands

#### `src/slash-commands/` directory
Interactive slash commands:
- `help.ts`: Help system
- `model.ts`: Model selection
- `login.ts`: API key management
- `exit.ts`: Application exit
- `clear.ts`: Session clearing
- `status.ts`: Status display
- And many more specialized commands

## Development Workflow

### Building and Testing

- **Development**: `bun ./src/cli.ts` - Run the CLI in development mode
- **Build**: `npm run build` - Full build (requires Bun 1.2.7)
- **Testing**: `npm test` or `vitest run` - Run all tests
- **Type Checking**: `npm run typecheck` - Run TypeScript type checking
- **Formatting**: `npm run format` - Check and format code with Biome

### Code Style

- **TypeScript**: Strict mode with ES2020 target
- **Formatting**: Biome with 80-character line width, single quotes
- **Testing**: Vitest framework with 30-second timeout
- **Package Manager**: pnpm 10.13.1
- **Node.js**: Version 22.11.0 (managed via Volta)

## Key Features

### Tool System
- Dynamic tool resolution based on context and permissions
- Read-only tools: read, ls, glob, grep, fetch
- Write tools: write, edit, bash (conditionally enabled)
- Todo tools: session-specific task management
- MCP tools: Extensible external tool integration

### UI Features
- React-based terminal UI using Ink
- Real-time activity indicators
- Tool approval workflows
- Message history with compression
- Mode indicators (plan, brainstorm, bash)
- Status line with context usage

### Integration Features
- Multiple LLM provider support
- Model Context Protocol (MCP) servers
- Git integration
- IDE integration via WebSocket
- Browser integration
- Background task management

## Configuration

### Environment Variables
- API keys for various providers (OPENAI_API_KEY, ANTHROPIC_API_KEY, etc.)
- NEOVATE_SELF_UPDATE: Disable auto-updates
- Model and provider configuration

### Approval Modes
- `default`: Standard approval workflow
- `autoEdit`: Auto-approve edit operations
- `yolo`: Auto-approve all operations

## Architecture Patterns

### Message Flow
1. User input → ChatInput → Store
2. Store → NodeBridge → Context → Project
3. Project → Loop → LLM → Tools
4. Tools → Results → Loop → Store
5. Store → UI updates

### Plugin System
- Plugins register hooks for different lifecycle events
- Context injection provides access to core services
- Hook types: initialized, telemetry, etc.

### Tool Approval
- Tools categorized by risk level (read, write, command, network)
- Approval modal for dangerous operations
- Configurable approval modes

## Security Features

### Command Validation
- Banned command list for security
- High-risk command pattern detection
- Command substitution prevention
- Path traversal protection

### File Access
- Working directory restrictions
- Image file size limits
- Secure file path resolution

## Performance Features

### Context Management
- Smart message compression for context limits
- Token counting and usage tracking
- Context window optimization

### Background Tasks
- Long-running command backgrounding
- Task lifecycle management
- Output streaming and buffering

## Extensibility

### MCP Integration
- External tool servers via stdio, SSE, or HTTP
- Dynamic tool discovery
- Server status monitoring

### Plugin Architecture
- Hook-based extension system
- Context and service injection
- Lifecycle management

This documentation provides a comprehensive overview of the Neovate Code codebase, its architecture, and key components. Each file serves a specific purpose in the overall system, contributing to a robust and extensible AI coding agent.