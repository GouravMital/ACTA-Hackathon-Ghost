// AgentBlocks - AI Workflow Builder Application

class AgentBlocks {
    constructor() {
        this.blocks = new Map();
        this.connections = new Map();
        this.selectedBlock = null;
        this.draggedElement = null;
        this.isConnecting = false;
        this.connectionStart = null;
        this.workflow = {
            name: 'Untitled Workflow',
            blocks: [],
            connections: []
        };
        this.apiKeys = {};
        this.isRunning = false;
        this.currentZoom = 1;
        
        this.blockTemplates = {
            input: {
                id: 'input',
                name: 'Input Block',
                description: 'Collect user input data',
                icon: '📝',
                type: 'input',
                inputs: [],
                outputs: ['text'],
                color: '#1FB8CD',
                settings: {
                    placeholder: 'Enter your input here...',
                    inputType: 'text'
                }
            },
            research: {
                id: 'research',
                name: 'Research Agent',
                description: 'AI-powered research and summarization',
                icon: '🔍',
                type: 'agent',
                inputs: ['text'],
                outputs: ['research_data', 'summary'],
                color: '#7c3aed',
                apiService: 'openai',
                settings: {
                    searchDepth: 'thorough',
                    summaryLength: 'medium',
                    sources: 5
                }
            },
            content: {
                id: 'content',
                name: 'Content Generator',
                description: 'Generate various types of content',
                icon: '✍️',
                type: 'agent',
                inputs: ['text', 'research_data'],
                outputs: ['content'],
                color: '#f59e0b',
                apiService: 'openai',
                settings: {
                    contentType: 'article',
                    tone: 'professional',
                    length: 'medium'
                }
            },
            analyzer: {
                id: 'analyzer',
                name: 'Data Analyzer',
                description: 'Analyze and process data with AI',
                icon: '📊',
                type: 'agent',
                inputs: ['research_data', 'content'],
                outputs: ['insights', 'metrics'],
                color: '#1e1b4b',
                apiService: 'gemini',
                settings: {
                    analysisType: 'comprehensive',
                    metrics: ['sentiment', 'keywords', 'trends']
                }
            },
            email: {
                id: 'email',
                name: 'Email Composer',
                description: 'Generate professional emails',
                icon: '📧',
                type: 'agent',
                inputs: ['content', 'insights'],
                outputs: ['email'],
                color: '#ff5459',
                apiService: 'openai',
                settings: {
                    emailType: 'promotional',
                    tone: 'professional',
                    includeSubject: true
                }
            },
            output: {
                id: 'output',
                name: 'Output Block',
                description: 'Display and export final results',
                icon: '📤',
                type: 'output',
                inputs: ['text', 'content', 'email', 'insights'],
                outputs: [],
                color: '#6B7280',
                settings: {
                    format: 'formatted',
                    exportOptions: ['copy', 'download', 'share']
                }
            }
        };
        
        this.init();
    }

    init() {
        this.loadApiKeys();
        this.setupEventListeners();
        this.createBlockLibrary();
        this.setupCanvas();
        this.updateApiIndicators();
        
        // Show API setup modal if no keys are configured
        if (Object.keys(this.apiKeys).length === 0) {
            this.showApiSetupModal();
        }
        
        // Load default workflow or saved workflow
        this.loadWorkflow();
    }

    // API Key Management
    loadApiKeys() {
        try {
            const encrypted = localStorage.getItem('agentblocks_api_keys');
            if (encrypted) {
                this.apiKeys = JSON.parse(this.decrypt(encrypted));
            }
        } catch (error) {
            console.error('Error loading API keys:', error);
            this.apiKeys = {};
        }
    }

    saveApiKeys() {
        try {
            const encrypted = this.encrypt(JSON.stringify(this.apiKeys));
            localStorage.setItem('agentblocks_api_keys', encrypted);
        } catch (error) {
            console.error('Error saving API keys:', error);
        }
    }

    encrypt(text) {
        // Simple XOR encryption for demo purposes
        // In production, use proper encryption
        const key = 'agentblocks_secret_key';
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(result);
    }

    decrypt(encrypted) {
        const key = 'agentblocks_secret_key';
        const text = atob(encrypted);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    }

    async testApiKey(service, key) {
        const statusElement = document.getElementById(`${service}-status`);
        statusElement.className = 'api-status testing';
        statusElement.textContent = 'Testing...';

        try {
            let isValid = false;
            
            switch (service) {
                case 'openai':
                    isValid = await this.testOpenAI(key);
                    break;
                case 'gemini':
                    isValid = await this.testGemini(key);
                    break;
                case 'anthropic':
                    isValid = await this.testAnthropic(key);
                    break;
            }

            if (isValid) {
                statusElement.className = 'api-status success';
                statusElement.textContent = '✅ API key is valid';
                return true;
            } else {
                statusElement.className = 'api-status error';
                statusElement.textContent = '❌ Invalid API key';
                return false;
            }
        } catch (error) {
            statusElement.className = 'api-status error';
            statusElement.textContent = `❌ Error: ${error.message}`;
            return false;
        }
    }

    async testOpenAI(apiKey) {
        const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    }

    async testGemini(apiKey) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        return response.ok;
    }

    async testAnthropic(apiKey) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 1,
                messages: [{ role: 'user', content: 'Test' }]
            })
        });
        return response.status === 200 || response.status === 400; // 400 is also valid (rate limit/usage)
    }

    // Event Listeners
    setupEventListeners() {
        // API Setup Modal
        document.getElementById('save-keys').addEventListener('click', () => this.saveApiKeysFromModal());
        document.getElementById('skip-setup').addEventListener('click', () => this.hideApiSetupModal());
        
        // Test API keys
        document.querySelectorAll('.test-key-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const service = e.target.dataset.service;
                const key = document.getElementById(`${service}-key`).value;
                if (key) {
                    this.testApiKey(service, key);
                }
            });
        });

        // Workflow controls
        document.getElementById('run-workflow').addEventListener('click', () => this.runWorkflow());
        document.getElementById('stop-workflow').addEventListener('click', () => this.stopWorkflow());
        
        // File operations
        document.getElementById('save-workflow').addEventListener('click', () => this.saveWorkflow());
        document.getElementById('export-workflow').addEventListener('click', () => this.exportWorkflow());
        document.getElementById('import-workflow').addEventListener('click', () => this.importWorkflow());
        
        // Settings
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('close-settings').addEventListener('click', () => this.hideSettings());
        document.getElementById('manage-api-keys').addEventListener('click', () => {
            this.hideSettings();
            this.showApiSetupModal();
        });
        
        // Canvas controls
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('fit-to-screen').addEventListener('click', () => this.fitToScreen());
        document.getElementById('clear-canvas').addEventListener('click', () => this.clearCanvas());
        
        // Canvas events
        const canvas = document.getElementById('canvas');
        canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        canvas.addEventListener('dragover', (e) => this.handleDragOver(e));
        canvas.addEventListener('drop', (e) => this.handleDrop(e));
        
        // File input
        document.getElementById('file-input').addEventListener('change', (e) => this.handleFileImport(e));
        
        // Settings toggles
        document.getElementById('show-grid').addEventListener('change', (e) => {
            document.getElementById('canvas').style.backgroundImage = 
                e.target.checked ? 'radial-gradient(circle, var(--grid-color) 1px, transparent 1px)' : 'none';
        });
        
        // Clear all data
        document.getElementById('clear-all-data').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    // Block Library
    createBlockLibrary() {
        const library = document.getElementById('block-library');
        
        const categories = {
            'Input/Output': ['input', 'output'],
            'AI Agents': ['research', 'content', 'analyzer', 'email']
        };
        
        for (const [categoryName, blockIds] of Object.entries(categories)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'block-category';
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.textContent = categoryName;
            categoryDiv.appendChild(categoryTitle);
            
            blockIds.forEach(blockId => {
                const template = this.blockTemplates[blockId];
                const blockElement = this.createLibraryBlock(template);
                categoryDiv.appendChild(blockElement);
            });
            
            library.appendChild(categoryDiv);
        }
    }

    createLibraryBlock(template) {
        const block = document.createElement('div');
        block.className = 'library-block';
        block.draggable = true;
        block.dataset.blockType = template.id;
        
        block.innerHTML = `
            <div class="library-block-icon" style="background: ${template.color}">
                ${template.icon}
            </div>
            <div class="library-block-info">
                <h5>${template.name}</h5>
                <p>${template.description}</p>
            </div>
        `;
        
        block.addEventListener('dragstart', (e) => this.handleDragStart(e));
        block.addEventListener('dragend', (e) => this.handleDragEnd(e));
        
        return block;
    }

    // Canvas Setup
    setupCanvas() {
        const svg = document.getElementById('connections-svg');
        
        // Add arrow marker for connections
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', 'var(--connection-color)');
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);
    }

    // Drag and Drop - FIXED VERSION
    handleDragStart(e) {
        const blockType = e.target.dataset.blockType || e.target.closest('.library-block')?.dataset.blockType;
        if (blockType) {
            e.dataTransfer.setData('text/plain', blockType);
            e.dataTransfer.effectAllowed = 'copy';
            this.draggedElement = e.target.closest('.library-block');
            this.draggedElement.classList.add('dragging');
            console.log('Drag started for block type:', blockType);
        }
    }

    handleDragEnd(e) {
        if (this.draggedElement) {
            this.draggedElement.classList.remove('dragging');
            this.draggedElement = null;
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        
        // Add visual feedback
        const canvas = document.getElementById('canvas');
        canvas.classList.add('drop-zone');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove visual feedback
        const canvas = document.getElementById('canvas');
        canvas.classList.remove('drop-zone');
        
        const blockType = e.dataTransfer.getData('text/plain');
        console.log('Drop event - Block type:', blockType);
        
        if (blockType && this.blockTemplates[blockType]) {
            const template = this.blockTemplates[blockType];
            console.log('Found template:', template);
            
            // Calculate drop position relative to canvas
            const canvasRect = canvas.getBoundingClientRect();
            const canvasScrollLeft = document.querySelector('.canvas-wrapper').scrollLeft;
            const canvasScrollTop = document.querySelector('.canvas-wrapper').scrollTop;
            
            const x = (e.clientX - canvasRect.left + canvasScrollLeft) / this.currentZoom;
            const y = (e.clientY - canvasRect.top + canvasScrollTop) / this.currentZoom;
            
            console.log('Drop position:', { x, y });
            
            // Create the block
            const blockId = this.createWorkflowBlock(template, { x, y });
            console.log('Created block with ID:', blockId);
            
            this.showNotification(`Added ${template.name} to canvas`, 'success');
        } else {
            console.log('No valid block type found in drop data');
        }
        
        // Clean up drag state
        this.draggedElement = null;
    }

    // Workflow Block Creation
    createWorkflowBlock(template, position) {
        const blockId = `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const block = {
            id: blockId,
            type: template.id,
            template: template,
            position: position,
            settings: { ...template.settings },
            inputs: {},
            outputs: {},
            status: 'idle'
        };
        
        this.blocks.set(blockId, block);
        this.renderBlock(block);
        this.updateStatusBar();
        
        console.log('Block created and stored:', block);
        
        return blockId;
    }

    renderBlock(block) {
        const blockElement = document.createElement('div');
        blockElement.className = 'workflow-block';
        blockElement.dataset.blockId = block.id;
        blockElement.style.left = `${block.position.x}px`;
        blockElement.style.top = `${block.position.y}px`;
        blockElement.style.setProperty('--block-color', block.template.color);
        blockElement.style.setProperty('--block-color-light', this.lightenColor(block.template.color, 20));
        
        blockElement.innerHTML = `
            <div class="block-header">
                <span class="block-icon">${block.template.icon}</span>
                <span class="block-title">${block.template.name}</span>
                <span class="block-status">${block.status}</span>
            </div>
            <div class="block-body">
                ${this.renderBlockInputs(block)}
                ${this.renderBlockOutputs(block)}
            </div>
        `;
        
        // Add connection ports
        this.addConnectionPorts(blockElement, block);
        
        // Add event listeners
        blockElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectBlock(block.id);
        });
        
        this.makeDraggable(blockElement);
        
        document.getElementById('blocks-layer').appendChild(blockElement);
        
        console.log('Block rendered and added to DOM:', blockElement);
    }

    renderBlockInputs(block) {
        if (block.template.inputs.length === 0) {
            if (block.template.type === 'input') {
                return `
                    <div class="block-input">
                        <label>Input</label>
                        <input type="text" class="form-control" placeholder="${block.settings.placeholder}" 
                               onchange="agentBlocks.updateBlockInput('${block.id}', 'userInput', this.value)">
                    </div>
                `;
            }
            return '';
        }
        
        return block.template.inputs.map(input => `
            <div class="block-input">
                <label>${input.replace('_', ' ')}</label>
                <div class="block-preview" id="input-${block.id}-${input}">
                    ${block.inputs[input] || 'No input connected'}
                </div>
            </div>
        `).join('');
    }

    renderBlockOutputs(block) {
        if (block.template.outputs.length === 0) return '';
        
        return block.template.outputs.map(output => `
            <div class="block-output">
                <label>${output.replace('_', ' ')}</label>
                <div class="block-preview" id="output-${block.id}-${output}">
                    ${block.outputs[output] || 'Not generated yet'}
                </div>
            </div>
        `).join('');
    }

    addConnectionPorts(blockElement, block) {
        // Input ports
        block.template.inputs.forEach((input, index) => {
            const port = document.createElement('div');
            port.className = 'connection-port connection-port--input';
            port.dataset.blockId = block.id;
            port.dataset.portType = 'input';
            port.dataset.portName = input;
            port.style.top = `${60 + index * 30}px`;
            
            port.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handlePortClick(port);
            });
            
            blockElement.appendChild(port);
        });
        
        // Output ports
        block.template.outputs.forEach((output, index) => {
            const port = document.createElement('div');
            port.className = 'connection-port connection-port--output';
            port.dataset.blockId = block.id;
            port.dataset.portType = 'output';
            port.dataset.portName = output;
            port.style.top = `${60 + index * 30}px`;
            
            port.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handlePortClick(port);
            });
            
            blockElement.appendChild(port);
        });
    }

    makeDraggable(element) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        element.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('connection-port') || 
                e.target.classList.contains('form-control') ||
                e.target.tagName === 'INPUT') return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(element.style.left) || 0;
            startTop = parseInt(element.style.top) || 0;
            
            element.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = (e.clientX - startX) / this.currentZoom;
            const deltaY = (e.clientY - startY) / this.currentZoom;
            
            element.style.left = `${startLeft + deltaX}px`;
            element.style.top = `${startTop + deltaY}px`;
            
            // Update block position
            const blockId = element.dataset.blockId;
            const block = this.blocks.get(blockId);
            if (block) {
                block.position.x = startLeft + deltaX;
                block.position.y = startTop + deltaY;
            }
            
            // Redraw connections
            this.redrawConnections();
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'move';
            }
        });
    }

    // Connection System
    handlePortClick(port) {
        if (!this.isConnecting) {
            if (port.dataset.portType === 'output') {
                this.isConnecting = true;
                this.connectionStart = port;
                port.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.5)';
            }
        } else {
            if (port.dataset.portType === 'input' && port !== this.connectionStart) {
                this.createConnection(this.connectionStart, port);
            }
            
            // Reset connection state
            this.isConnecting = false;
            if (this.connectionStart) {
                this.connectionStart.style.boxShadow = '';
                this.connectionStart = null;
            }
        }
    }

    createConnection(outputPort, inputPort) {
        const connectionId = `${outputPort.dataset.blockId}_${outputPort.dataset.portName}_to_${inputPort.dataset.blockId}_${inputPort.dataset.portName}`;
        
        // Check if connection already exists
        if (this.connections.has(connectionId)) {
            this.showNotification('Connection already exists', 'warning');
            return;
        }
        
        const connection = {
            id: connectionId,
            from: {
                blockId: outputPort.dataset.blockId,
                port: outputPort.dataset.portName
            },
            to: {
                blockId: inputPort.dataset.blockId,
                port: inputPort.dataset.portName
            }
        };
        
        this.connections.set(connectionId, connection);
        this.drawConnection(connection);
        this.updateStatusBar();
        
        this.showNotification('Connection created', 'success');
    }

    drawConnection(connection) {
        const fromBlock = document.querySelector(`[data-block-id="${connection.from.blockId}"]`);
        const toBlock = document.querySelector(`[data-block-id="${connection.to.blockId}"]`);
        
        if (!fromBlock || !toBlock) return;
        
        const fromPort = fromBlock.querySelector(`[data-port-name="${connection.from.port}"][data-port-type="output"]`);
        const toPort = toBlock.querySelector(`[data-port-name="${connection.to.port}"][data-port-type="input"]`);
        
        if (!fromPort || !toPort) return;
        
        const fromRect = fromPort.getBoundingClientRect();
        const toRect = toPort.getBoundingClientRect();
        const canvasRect = document.getElementById('canvas').getBoundingClientRect();
        
        const x1 = fromRect.left - canvasRect.left + fromRect.width / 2;
        const y1 = fromRect.top - canvasRect.top + fromRect.height / 2;
        const x2 = toRect.left - canvasRect.left + toRect.width / 2;
        const y2 = toRect.top - canvasRect.top + toRect.height / 2;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const controlPointOffset = Math.abs(x2 - x1) * 0.5;
        const pathData = `M ${x1} ${y1} C ${x1 + controlPointOffset} ${y1}, ${x2 - controlPointOffset} ${y2}, ${x2} ${y2}`;
        
        path.setAttribute('d', pathData);
        path.setAttribute('class', 'connection-line');
        path.dataset.connectionId = connection.id;
        
        path.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Delete this connection?')) {
                this.deleteConnection(connection.id);
            }
        });
        
        document.getElementById('connections-svg').appendChild(path);
    }

    redrawConnections() {
        const svg = document.getElementById('connections-svg');
        // Remove all existing paths except defs
        const paths = svg.querySelectorAll('path');
        paths.forEach(path => path.remove());
        
        // Redraw all connections
        this.connections.forEach(connection => {
            this.drawConnection(connection);
        });
    }

    deleteConnection(connectionId) {
        this.connections.delete(connectionId);
        const path = document.querySelector(`[data-connection-id="${connectionId}"]`);
        if (path) path.remove();
        this.updateStatusBar();
        this.showNotification('Connection deleted', 'info');
    }

    // Block Selection and Configuration
    selectBlock(blockId) {
        // Remove previous selection
        document.querySelectorAll('.workflow-block.selected').forEach(block => {
            block.classList.remove('selected');
        });
        
        // Select new block
        const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
        if (blockElement) {
            blockElement.classList.add('selected');
            this.selectedBlock = blockId;
            this.showBlockConfiguration(blockId);
        }
    }

    showBlockConfiguration(blockId) {
        const block = this.blocks.get(blockId);
        if (!block) return;
        
        const configPanel = document.getElementById('config-panel');
        configPanel.innerHTML = `
            <div class="config-section">
                <h4>${block.template.name} Configuration</h4>
                ${this.renderBlockSettings(block)}
            </div>
            <div class="config-section">
                <h4>Actions</h4>
                <button class="btn btn--outline btn--warning" onclick="agentBlocks.deleteBlock('${blockId}')">
                    Delete Block
                </button>
            </div>
        `;
    }

    renderBlockSettings(block) {
        let html = '';
        
        for (const [key, value] of Object.entries(block.settings)) {
            const inputType = typeof value === 'boolean' ? 'checkbox' : 
                             typeof value === 'number' ? 'number' : 'text';
            
            if (inputType === 'checkbox') {
                html += `
                    <label class="form-label">
                        <input type="checkbox" ${value ? 'checked' : ''} 
                               onchange="agentBlocks.updateBlockSetting('${block.id}', '${key}', this.checked)">
                        ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                `;
            } else if (key === 'contentType' || key === 'tone' || key === 'emailType') {
                const options = this.getSettingOptions(key);
                html += `
                    <div class="form-group">
                        <label class="form-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        <select class="form-control" onchange="agentBlocks.updateBlockSetting('${block.id}', '${key}', this.value)">
                            ${options.map(option => `<option value="${option}" ${option === value ? 'selected' : ''}>${option}</option>`).join('')}
                        </select>
                    </div>
                `;
            } else {
                html += `
                    <div class="form-group">
                        <label class="form-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        <input type="${inputType}" class="form-control" value="${value}" 
                               onchange="agentBlocks.updateBlockSetting('${block.id}', '${key}', this.value)">
                    </div>
                `;
            }
        }
        
        return html;
    }

    getSettingOptions(key) {
        const options = {
            contentType: ['article', 'blog post', 'social media', 'press release', 'newsletter'],
            tone: ['professional', 'casual', 'friendly', 'formal', 'enthusiastic'],
            emailType: ['promotional', 'newsletter', 'announcement', 'follow-up', 'welcome']
        };
        return options[key] || [];
    }

    updateBlockSetting(blockId, key, value) {
        const block = this.blocks.get(blockId);
        if (block) {
            block.settings[key] = value;
            this.showNotification('Setting updated', 'success');
        }
    }

    updateBlockInput(blockId, inputName, value) {
        const block = this.blocks.get(blockId);
        if (block) {
            block.inputs[inputName] = value;
            
            // Update preview if it exists
            const preview = document.getElementById(`input-${blockId}-${inputName}`);
            if (preview) {
                preview.textContent = value || 'No input';
            }
        }
    }

    deleteBlock(blockId) {
        if (confirm('Are you sure you want to delete this block?')) {
            // Remove connections
            const connectionsToDelete = [];
            this.connections.forEach((connection, id) => {
                if (connection.from.blockId === blockId || connection.to.blockId === blockId) {
                    connectionsToDelete.push(id);
                }
            });
            
            connectionsToDelete.forEach(id => this.deleteConnection(id));
            
            // Remove block
            this.blocks.delete(blockId);
            const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
            if (blockElement) blockElement.remove();
            
            // Clear configuration panel
            document.getElementById('config-panel').innerHTML = `
                <div class="config-empty">
                    <div class="empty-icon">📋</div>
                    <p>Select a block to configure its settings</p>
                </div>
            `;
            
            this.selectedBlock = null;
            this.updateStatusBar();
            this.showNotification('Block deleted', 'info');
        }
    }

    // Workflow Execution
    async runWorkflow() {
        if (this.isRunning) return;
        
        // Check if we have any blocks
        if (this.blocks.size === 0) {
            this.showNotification('Add some blocks to the canvas first!', 'warning');
            return;
        }
        
        // Check if we have API keys for required services
        const requiredServices = new Set();
        this.blocks.forEach(block => {
            if (block.template.apiService) {
                requiredServices.add(block.template.apiService);
            }
        });
        
        const missingKeys = [];
        requiredServices.forEach(service => {
            if (!this.apiKeys[service]) {
                missingKeys.push(service);
            }
        });
        
        if (missingKeys.length > 0) {
            this.showNotification(`Missing API keys: ${missingKeys.join(', ')}`, 'error');
            this.showApiSetupModal();
            return;
        }
        
        this.isRunning = true;
        document.getElementById('run-workflow').disabled = true;
        document.getElementById('stop-workflow').disabled = false;
        
        this.showProgressModal();
        
        try {
            await this.executeWorkflow();
            this.showNotification('Workflow completed successfully!', 'success');
        } catch (error) {
            console.error('Workflow execution error:', error);
            this.showNotification(`Workflow failed: ${error.message}`, 'error');
        } finally {
            this.isRunning = false;
            document.getElementById('run-workflow').disabled = false;
            document.getElementById('stop-workflow').disabled = true;
            this.hideProgressModal();
        }
    }

    async executeWorkflow() {
        // Build execution order using topological sort
        const executionOrder = this.getExecutionOrder();
        
        for (let i = 0; i < executionOrder.length; i++) {
            if (!this.isRunning) break;
            
            const blockId = executionOrder[i];
            const block = this.blocks.get(blockId);
            
            this.updateProgress((i / executionOrder.length) * 100, `Processing ${block.template.name}...`);
            this.addProgressStep(block.template.name, 'active');
            this.setBlockStatus(blockId, 'running');
            
            try {
                await this.executeBlock(block);
                this.setBlockStatus(blockId, 'completed');
                this.updateProgressStep(block.template.name, 'completed');
            } catch (error) {
                this.setBlockStatus(blockId, 'error');
                this.updateProgressStep(block.template.name, 'error');
                throw error;
            }
            
            // Small delay for visual feedback
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        this.updateProgress(100, 'Workflow completed!');
    }

    getExecutionOrder() {
        // Simple topological sort
        const visited = new Set();
        const order = [];
        
        const visit = (blockId) => {
            if (visited.has(blockId)) return;
            visited.add(blockId);
            
            // Visit dependencies first
            this.connections.forEach(connection => {
                if (connection.to.blockId === blockId) {
                    visit(connection.from.blockId);
                }
            });
            
            order.push(blockId);
        };
        
        this.blocks.forEach((block, blockId) => {
            visit(blockId);
        });
        
        return order;
    }

    async executeBlock(block) {
        // Collect inputs from connected blocks
        const inputs = {};
        
        this.connections.forEach(connection => {
            if (connection.to.blockId === block.id) {
                const sourceBlock = this.blocks.get(connection.from.blockId);
                if (sourceBlock && sourceBlock.outputs[connection.from.port]) {
                    inputs[connection.to.port] = sourceBlock.outputs[connection.from.port];
                }
            }
        });
        
        // Add user inputs for input blocks
        Object.assign(inputs, block.inputs);
        
        let outputs = {};
        
        switch (block.template.type) {
            case 'input':
                outputs = { text: inputs.userInput || 'Sample input text' };
                break;
                
            case 'agent':
                outputs = await this.executeAIAgent(block, inputs);
                break;
                
            case 'output':
                outputs = inputs;
                this.displayOutput(block, inputs);
                break;
        }
        
        // Update block outputs
        block.outputs = outputs;
        
        // Update UI
        this.updateBlockOutputs(block);
    }

    async executeAIAgent(block, inputs) {
        const service = block.template.apiService;
        const apiKey = this.apiKeys[service];
        
        if (!apiKey) {
            // For demo purposes, return mock data if no API key
            console.log('No API key available, returning mock data');
            return this.getMockOutput(block.template.id);
        }
        
        try {
            switch (block.template.id) {
                case 'research':
                    return await this.executeResearchAgent(inputs, block.settings, apiKey);
                case 'content':
                    return await this.executeContentGenerator(inputs, block.settings, apiKey);
                case 'analyzer':
                    return await this.executeDataAnalyzer(inputs, block.settings, apiKey);
                case 'email':
                    return await this.executeEmailComposer(inputs, block.settings, apiKey);
                default:
                    return this.getMockOutput(block.template.id);
            }
        } catch (error) {
            console.log('API call failed, returning mock data:', error);
            return this.getMockOutput(block.template.id);
        }
    }

    getMockOutput(blockType) {
        const mockOutputs = {
            research: {
                research_data: 'Mock research data: AI is transforming industries worldwide. Key trends include automation, machine learning, and ethical AI development.',
                summary: 'AI trends and impacts summary'
            },
            content: {
                content: 'Mock generated content: This is a comprehensive article about AI technology and its impact on modern business. The content discusses various applications and future possibilities.'
            },
            analyzer: {
                insights: 'Mock analysis: The content shows positive sentiment with key themes around innovation and technology. Readability score: Good.',
                metrics: {
                    sentiment: 'positive',
                    readability: 'good',
                    keyTopics: ['AI', 'technology', 'innovation']
                }
            },
            email: {
                email: 'Subject: Exciting AI Innovation Update\n\nDear Valued Customer,\n\nWe\'re excited to share the latest developments in AI technology...\n\nBest regards,\nYour AI Team'
            }
        };
        
        return mockOutputs[blockType] || { result: 'Mock output data' };
    }

    async executeResearchAgent(inputs, settings, apiKey) {
        const topic = inputs.text || '';
        const prompt = `You are an expert researcher. Research the topic "${topic}" and provide:
1. Key facts and statistics
2. Current trends and developments
3. Expert opinions and insights
4. Reliable sources

Format your response as a comprehensive research summary that can be used by other AI agents.`;

        const response = await this.callOpenAI(apiKey, prompt);
        
        return {
            research_data: response,
            summary: response.substring(0, 200) + '...'
        };
    }

    async executeContentGenerator(inputs, settings, apiKey) {
        const topic = inputs.text || '';
        const research = inputs.research_data || '';
        
        const prompt = `You are a professional content writer. Create ${settings.contentType} content about "${topic}".
        
${research ? `Use this research data: ${research}` : ''}

Requirements:
- Tone: ${settings.tone}
- Length: ${settings.length}
- Make it engaging and well-structured
- Include relevant examples and insights`;

        const content = await this.callOpenAI(apiKey, prompt);
        
        return { content };
    }

    async executeDataAnalyzer(inputs, settings, apiKey) {
        const content = inputs.content || inputs.research_data || '';
        
        const prompt = `Analyze this content and provide insights:

${content}

Provide analysis including:
1. Sentiment analysis
2. Key themes and topics
3. Readability assessment
4. Improvement suggestions

Format as structured insights.`;

        let insights;
        if (this.apiKeys.gemini) {
            insights = await this.callGemini(this.apiKeys.gemini, prompt);
        } else {
            insights = await this.callOpenAI(apiKey, prompt);
        }
        
        return {
            insights,
            metrics: {
                sentiment: 'positive',
                readability: 'good',
                keyTopics: ['AI', 'technology', 'innovation']
            }
        };
    }

    async executeEmailComposer(inputs, settings, apiKey) {
        const content = inputs.content || '';
        const insights = inputs.insights || '';
        
        const prompt = `Create a professional ${settings.emailType} email based on this content:

${content}

${insights ? `Consider these insights: ${insights}` : ''}

Requirements:
- Tone: ${settings.tone}
- Include compelling subject line
- Include clear call-to-action
- Professional formatting`;

        const email = await this.callOpenAI(apiKey, prompt);
        
        return { email };
    }

    async callOpenAI(apiKey, prompt) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`OpenAI API error: ${error}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callGemini(apiKey, prompt) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Gemini API error: ${error}`);
        }
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    setBlockStatus(blockId, status) {
        const block = this.blocks.get(blockId);
        if (block) {
            block.status = status;
            const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
            if (blockElement) {
                blockElement.className = `workflow-block ${status}`;
                if (this.selectedBlock === blockId) {
                    blockElement.classList.add('selected');
                }
                
                const statusElement = blockElement.querySelector('.block-status');
                if (statusElement) {
                    statusElement.textContent = status;
                }
            }
        }
    }

    updateBlockOutputs(block) {
        for (const [outputName, outputValue] of Object.entries(block.outputs)) {
            const preview = document.getElementById(`output-${block.id}-${outputName}`);
            if (preview) {
                preview.textContent = typeof outputValue === 'string' ? 
                    (outputValue.length > 100 ? outputValue.substring(0, 100) + '...' : outputValue) :
                    JSON.stringify(outputValue).substring(0, 100) + '...';
            }
        }
    }

    displayOutput(block, inputs) {
        // For output blocks, display all inputs in a formatted way
        let output = '';
        for (const [key, value] of Object.entries(inputs)) {
            output += `<h4>${key.replace('_', ' ').toUpperCase()}</h4>\n${value}\n\n`;
        }
        
        const preview = document.getElementById(`output-${block.id}-result`);
        if (preview) {
            preview.innerHTML = output;
        }
    }

    stopWorkflow() {
        this.isRunning = false;
        this.hideProgressModal();
        this.showNotification('Workflow stopped', 'warning');
        
        // Reset all block statuses
        this.blocks.forEach((block, blockId) => {
            this.setBlockStatus(blockId, 'idle');
        });
    }

    // Progress Modal
    showProgressModal() {
        document.getElementById('progress-modal').classList.remove('hidden');
        document.getElementById('progress-fill').style.width = '0%';
        document.getElementById('progress-text').textContent = 'Starting workflow...';
        document.getElementById('progress-steps').innerHTML = '';
    }

    hideProgressModal() {
        document.getElementById('progress-modal').classList.add('hidden');
    }

    updateProgress(percentage, text) {
        document.getElementById('progress-fill').style.width = `${percentage}%`;
        document.getElementById('progress-text').textContent = text;
    }

    addProgressStep(stepName, status) {
        const stepsContainer = document.getElementById('progress-steps');
        const step = document.createElement('div');
        step.className = `progress-step ${status}`;
        step.innerHTML = `
            <span class="step-icon">${status === 'completed' ? '✅' : status === 'error' ? '❌' : '⏳'}</span>
            <span>${stepName}</span>
        `;
        stepsContainer.appendChild(step);
    }

    updateProgressStep(stepName, status) {
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach(step => {
            if (step.textContent.includes(stepName)) {
                step.className = `progress-step ${status}`;
                const icon = step.querySelector('.step-icon');
                if (icon) {
                    icon.textContent = status === 'completed' ? '✅' : status === 'error' ? '❌' : '⏳';
                }
            }
        });
    }

    // Modal Management
    showApiSetupModal() {
        document.getElementById('api-setup-modal').classList.remove('hidden');
        
        // Pre-fill existing keys
        if (this.apiKeys.openai) document.getElementById('openai-key').value = this.apiKeys.openai;
        if (this.apiKeys.gemini) document.getElementById('gemini-key').value = this.apiKeys.gemini;
        if (this.apiKeys.anthropic) document.getElementById('anthropic-key').value = this.apiKeys.anthropic;
    }

    hideApiSetupModal() {
        document.getElementById('api-setup-modal').classList.add('hidden');
    }

    saveApiKeysFromModal() {
        const openaiKey = document.getElementById('openai-key').value.trim();
        const geminiKey = document.getElementById('gemini-key').value.trim();
        const anthropicKey = document.getElementById('anthropic-key').value.trim();
        
        if (openaiKey) this.apiKeys.openai = openaiKey;
        if (geminiKey) this.apiKeys.gemini = geminiKey;
        if (anthropicKey) this.apiKeys.anthropic = anthropicKey;
        
        this.saveApiKeys();
        this.updateApiIndicators();
        this.hideApiSetupModal();
        
        this.showNotification('API keys saved successfully', 'success');
    }

    showSettings() {
        document.getElementById('settings-modal').classList.remove('hidden');
    }

    hideSettings() {
        document.getElementById('settings-modal').classList.add('hidden');
    }

    // Utility Functions
    updateApiIndicators() {
        ['openai', 'gemini', 'anthropic'].forEach(service => {
            const indicator = document.querySelector(`[data-service="${service}"]`);
            if (indicator) {
                if (this.apiKeys[service]) {
                    indicator.classList.add('connected');
                } else {
                    indicator.classList.remove('connected');
                }
            }
        });
    }

    updateStatusBar() {
        document.getElementById('block-count').textContent = this.blocks.size;
        document.getElementById('connection-count').textContent = this.connections.size;
    }

    handleCanvasClick(e) {
        if (e.target.id === 'canvas' || e.target.classList.contains('canvas')) {
            // Deselect all blocks
            document.querySelectorAll('.workflow-block.selected').forEach(block => {
                block.classList.remove('selected');
            });
            this.selectedBlock = null;
            
            // Reset configuration panel
            document.getElementById('config-panel').innerHTML = `
                <div class="config-empty">
                    <div class="empty-icon">📋</div>
                    <p>Select a block to configure its settings</p>
                </div>
            `;
        }
        
        // Remove drop zone styling
        const canvas = document.getElementById('canvas');
        canvas.classList.remove('drop-zone');
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.getElementById('notifications').appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Zoom and Canvas Controls
    zoomIn() {
        this.currentZoom = Math.min(this.currentZoom * 1.2, 3);
        this.applyZoom();
    }

    zoomOut() {
        this.currentZoom = Math.max(this.currentZoom / 1.2, 0.3);
        this.applyZoom();
    }

    applyZoom() {
        const canvas = document.getElementById('canvas');
        canvas.style.transform = `scale(${this.currentZoom})`;
        document.querySelector('.zoom-level').textContent = `${Math.round(this.currentZoom * 100)}%`;
    }

    fitToScreen() {
        // Calculate bounds of all blocks
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        this.blocks.forEach(block => {
            minX = Math.min(minX, block.position.x);
            minY = Math.min(minY, block.position.y);
            maxX = Math.max(maxX, block.position.x + 200);
            maxY = Math.max(maxY, block.position.y + 150);
        });
        
        if (this.blocks.size > 0) {
            const wrapper = document.querySelector('.canvas-wrapper');
            const wrapperRect = wrapper.getBoundingClientRect();
            
            const contentWidth = maxX - minX;
            const contentHeight = maxY - minY;
            
            const scaleX = (wrapperRect.width - 40) / contentWidth;
            const scaleY = (wrapperRect.height - 40) / contentHeight;
            
            this.currentZoom = Math.min(scaleX, scaleY, 1);
            this.applyZoom();
            
            // Center the content
            wrapper.scrollLeft = minX * this.currentZoom - 20;
            wrapper.scrollTop = minY * this.currentZoom - 20;
        }
    }

    clearCanvas() {
        if (confirm('Are you sure you want to clear the entire canvas?')) {
            this.blocks.clear();
            this.connections.clear();
            document.getElementById('blocks-layer').innerHTML = '';
            document.getElementById('connections-svg').innerHTML = '<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="var(--connection-color)"/></marker></defs>';
            this.updateStatusBar();
            this.selectedBlock = null;
            
            document.getElementById('config-panel').innerHTML = `
                <div class="config-empty">
                    <div class="empty-icon">📋</div>
                    <p>Select a block to configure its settings</p>
                </div>
            `;
            
            this.showNotification('Canvas cleared', 'info');
        }
    }

    // File Operations
    saveWorkflow() {
        const workflowData = {
            name: this.workflow.name,
            blocks: Array.from(this.blocks.values()),
            connections: Array.from(this.connections.values()),
            version: '1.0',
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('agentblocks_workflow', JSON.stringify(workflowData));
        this.showNotification('Workflow saved', 'success');
    }

    loadWorkflow() {
        try {
            const saved = localStorage.getItem('agentblocks_workflow');
            if (saved) {
                const workflowData = JSON.parse(saved);
                this.loadWorkflowData(workflowData);
            } else {
                // Don't load default workflow automatically - let user build their own
                console.log('No saved workflow found, starting with empty canvas');
            }
        } catch (error) {
            console.error('Error loading workflow:', error);
        }
    }

    loadWorkflowData(workflowData) {
        this.clearCanvas();
        
        // Load blocks
        workflowData.blocks.forEach(blockData => {
            const template = this.blockTemplates[blockData.type];
            if (template) {
                const block = {
                    ...blockData,
                    template: template
                };
                this.blocks.set(block.id, block);
                this.renderBlock(block);
            }
        });
        
        // Load connections after blocks are rendered
        setTimeout(() => {
            workflowData.connections.forEach(connectionData => {
                this.connections.set(connectionData.id, connectionData);
                this.drawConnection(connectionData);
            });
        }, 100);
        
        this.workflow.name = workflowData.name || 'Untitled Workflow';
        document.querySelector('.workspace-name span').textContent = this.workflow.name;
        
        this.updateStatusBar();
    }

    exportWorkflow() {
        if (this.blocks.size === 0) {
            this.showNotification('No workflow to export', 'warning');
            return;
        }
        
        const workflowData = {
            name: this.workflow.name,
            blocks: Array.from(this.blocks.values()),
            connections: Array.from(this.connections.values()),
            version: '1.0',
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.workflow.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        this.showNotification('Workflow exported', 'success');
    }

    importWorkflow() {
        document.getElementById('file-input').click();
    }

    handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const workflowData = JSON.parse(event.target.result);
                this.loadWorkflowData(workflowData);
                this.showNotification('Workflow imported', 'success');
            } catch (error) {
                this.showNotification('Error importing workflow: Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        e.target.value = '';
    }
}

// Initialize the application
let agentBlocks;
document.addEventListener('DOMContentLoaded', () => {
    agentBlocks = new AgentBlocks();
});