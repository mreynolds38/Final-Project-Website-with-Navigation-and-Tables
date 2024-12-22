// Animation variables
let animationId = null;
let position = { x: 0, y: 0 };
let velocity = { x: 2, y: 2 };
let isAnimating = false;

// Get references to DOM elements
const memeImage = document.getElementById('memeImage');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const testResults = document.getElementById('testResults');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    console.log('Page loaded - Initializing events');
    initializeEvents();
    runUATTests();
});

// Initialize all event listeners
function initializeEvents() {
    // Start button event listener
    startButton.addEventListener('click', handleStart);
    
    // Stop button event listener
    stopButton.addEventListener('click', handleStop);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    // Window resize event
    window.addEventListener('resize', handleResize);
    
    // Mouse hover effect on meme
    memeImage.addEventListener('mouseenter', handleMemeHover);
    memeImage.addEventListener('mouseleave', handleMemeLeave);
}

// Function to handle keyboard controls
function handleKeyPress(event) {
    switch(event.key) {
        case ' ':  // Spacebar
            isAnimating ? handleStop() : handleStart();
            break;
        case 'ArrowUp':
            velocity.y = Math.abs(velocity.y) * -1;
            break;
        case 'ArrowDown':
            velocity.y = Math.abs(velocity.y);
            break;
        case 'ArrowLeft':
            velocity.x = Math.abs(velocity.x) * -1;
            break;
        case 'ArrowRight':
            velocity.x = Math.abs(velocity.x);
            break;
    }
}

// Function to handle window resize
function handleResize() {
    // Ensure meme stays within new window bounds
    const maxX = window.innerWidth - memeImage.width;
    const maxY = window.innerHeight - memeImage.height;
    position.x = Math.min(position.x, maxX);
    position.y = Math.min(position.y, maxY);
}

// Function to handle meme hover
function handleMemeHover() {
    if (isAnimating) {
        velocity.x *= 1.5;
        velocity.y *= 1.5;
    }
}

// Function to handle meme leave
function handleMemeLeave() {
    if (isAnimating) {
        velocity.x /= 1.5;
        velocity.y /= 1.5;
    }
}

// Function to handle the Start button click
function handleStart() {
    if (!isAnimating) {
        isAnimating = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        startMoving();
        logEvent('Animation started');
    }
}

// Function to handle the Stop button click
function handleStop() {
    if (isAnimating) {
        isAnimating = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        stopMoving();
        logEvent('Animation stopped');
    }
}

// Function to move the meme image
function startMoving() {
    const maxX = window.innerWidth - memeImage.width;
    const maxY = window.innerHeight - memeImage.height;
    
    position.x += velocity.x;
    position.y += velocity.y;
    
    if (position.x >= maxX || position.x <= 0) {
        velocity.x = -velocity.x;
        logEvent('Bounced horizontally');
    }
    if (position.y >= maxY || position.y <= 0) {
        velocity.y = -velocity.y;
        logEvent('Bounced vertically');
    }
    
    position.x = Math.max(0, Math.min(position.x, maxX));
    position.y = Math.max(0, Math.min(position.y, maxY));
    
    memeImage.style.position = 'absolute';
    memeImage.style.left = position.x + 'px';
    memeImage.style.top = position.y + 'px';
    
    if (isAnimating) {
        animationId = requestAnimationFrame(startMoving);
    }
}

// Function to stop moving the meme image
function stopMoving() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Event logging function
function logEvent(message) {
    console.log(`Event: ${message} - ${new Date().toLocaleTimeString()}`);
}

// UAT Testing Functions
function runUATTests() {
    console.log('Starting User Acceptance Tests...');
    
    // Test 1: Button States
    testButtonStates();
    
    // Test 2: Event Listeners
    testEventListeners();
    
    // Test 3: Animation Control
    testAnimationControl();
}

function testButtonStates() {
    const test = {
        name: 'Button States Test',
        passed: true,
        messages: []
    };
    
    // Initial state
    if (startButton.disabled || !stopButton.disabled) {
        test.passed = false;
        test.messages.push('Initial button states incorrect');
    }
    
    // After start
    handleStart();
    if (!startButton.disabled || stopButton.disabled) {
        test.passed = false;
        test.messages.push('Button states after start incorrect');
    }
    
    // After stop
    handleStop();
    if (startButton.disabled || !stopButton.disabled) {
        test.passed = false;
        test.messages.push('Button states after stop incorrect');
    }
    
    logTestResult(test);
}

function testEventListeners() {
    const test = {
        name: 'Event Listeners Test',
        passed: true,
        messages: []
    };
    
    // Test keyboard event
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(spaceEvent);
    
    // Test resize event
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    
    logTestResult(test);
}

function testAnimationControl() {
    const test = {
        name: 'Animation Control Test',
        passed: true,
        messages: []
    };
    
    // Test animation start
    handleStart();
    if (!isAnimating) {
        test.passed = false;
        test.messages.push('Animation failed to start');
    }
    
    // Test animation stop
    handleStop();
    if (isAnimating || animationId !== null) {
        test.passed = false;
        test.messages.push('Animation failed to stop');
    }
    
    logTestResult(test);
}

function logTestResult(test) {
    console.log(`Test: ${test.name}`);
    console.log(`Status: ${test.passed ? 'PASSED' : 'FAILED'}`);
    if (test.messages.length > 0) {
        console.log('Messages:', test.messages);
    }
    console.log('-------------------');
}