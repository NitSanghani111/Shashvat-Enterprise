/**
 * Content Protection Utilities
 * Prevents unauthorized copying of website content
 * @author Shashvat Enterprise
 * @date October 2025
 */

/**
 * Disable right-click context menu
 */
export const disableRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showProtectionMessage('Right-click is disabled to protect our content.');
    return false;
  });
};

/**
 * Disable text selection on specific elements
 */
export const disableTextSelection = () => {
  // Add CSS to prevent text selection
  const style = document.createElement('style');
  style.innerHTML = `
    .no-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    .protect-content {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Disable common keyboard shortcuts for copying
 */
export const disableKeyboardShortcuts = () => {
  document.addEventListener('keydown', (e) => {
    // Disable Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, F12, Ctrl+Shift+I
    if (
      (e.ctrlKey && (e.key === 'c' || e.key === 'C')) || // Copy
      (e.ctrlKey && (e.key === 'x' || e.key === 'X')) || // Cut
      (e.ctrlKey && (e.key === 'a' || e.key === 'A')) || // Select All
      (e.ctrlKey && (e.key === 'u' || e.key === 'U')) || // View Source
      (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) || // Developer Tools
      (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) || // Console
      (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) || // Inspect Element
      e.key === 'F12' || // Developer Tools
      (e.ctrlKey && e.key === 's') || // Save Page
      (e.ctrlKey && e.key === 'S')
    ) {
      e.preventDefault();
      showProtectionMessage('This action is disabled to protect our content.');
      return false;
    }
  });
};

/**
 * Disable drag and drop of images
 */
export const disableImageDrag = () => {
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
};

/**
 * Add watermark to images dynamically
 */
export const addImageWatermark = () => {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.style.pointerEvents = 'none';
    img.setAttribute('draggable', 'false');
  });
};

/**
 * Detect and prevent Print Screen
 */
export const detectPrintScreen = () => {
  // Blur content when window loses focus (possible screenshot)
  let blurTimeout;
  
  window.addEventListener('blur', () => {
    blurTimeout = setTimeout(() => {
      document.body.style.filter = 'blur(5px)';
    }, 100);
  });

  window.addEventListener('focus', () => {
    clearTimeout(blurTimeout);
    document.body.style.filter = 'none';
  });
};

/**
 * Add copyright notice to copied text
 */
export const addCopyrightToClipboard = () => {
  document.addEventListener('copy', (e) => {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      const copyrightText = `\n\n© ${new Date().getFullYear()} Shashvat Enterprise. All rights reserved.\nSource: ${window.location.href}\nUnauthorized copying is prohibited.`;
      
      const modifiedText = selection + copyrightText;
      
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', modifiedText);
        e.preventDefault();
      }
    }
  });
};

/**
 * Show protection message to user
 */
const showProtectionMessage = (message) => {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'content-protection-toast';
  toast.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #c5b173, #d4a574);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(197, 177, 115, 0.3);
      z-index: 99999;
      font-family: 'Inter', 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    ">
      <div style="display: flex; align-items: center; gap: 12px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>${message}</span>
      </div>
    </div>
  `;

  // Add animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.firstElementChild.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
};

/**
 * Disable developer tools (advanced)
 */
export const disableDevTools = () => {
  // Detect if DevTools is open
  const devtools = /./;
  devtools.toString = function() {
    this.opened = true;
  };

  const checkDevTools = setInterval(() => {
    if (devtools.opened) {
      console.clear();
      window.location.reload();
    }
  }, 1000);

  // Detect debugger
  setInterval(() => {
    debugger;
  }, 100);
};

/**
 * Initialize all content protection features
 */
export const initContentProtection = (options = {}) => {
  const defaultOptions = {
    disableRightClick: true,
    disableTextSelection: false, // Don't disable on all elements (bad UX)
    disableKeyboardShortcuts: true,
    disableImageDrag: true,
    addImageWatermark: true,
    detectPrintScreen: false, // Can be annoying for users
    addCopyrightToClipboard: true,
    disableDevTools: false, // Too aggressive, can break debugging
  };

  const config = { ...defaultOptions, ...options };

  if (config.disableRightClick) {
    disableRightClick();
  }

  if (config.disableTextSelection) {
    disableTextSelection();
  }

  if (config.disableKeyboardShortcuts) {
    disableKeyboardShortcuts();
  }

  if (config.disableImageDrag) {
    disableImageDrag();
  }

  if (config.addImageWatermark) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addImageWatermark);
    } else {
      addImageWatermark();
    }
  }

  if (config.detectPrintScreen) {
    detectPrintScreen();
  }

  if (config.addCopyrightToClipboard) {
    addCopyrightToClipboard();
  }

  if (config.disableDevTools) {
    disableDevTools();
  }

  console.log('%c⚠️ Content Protection Active', 'color: #c5b173; font-size: 16px; font-weight: bold;');
  console.log('%c© 2025 Shashvat Enterprise. All rights reserved.', 'color: #666; font-size: 12px;');
  console.log('%cUnauthorized copying, distribution, or use of this content is strictly prohibited.', 'color: #666; font-size: 12px;');
};

/**
 * Protect specific elements
 */
export const protectElement = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.classList.add('protect-content');
    el.setAttribute('oncontextmenu', 'return false');
    el.setAttribute('onselectstart', 'return false');
    el.setAttribute('ondragstart', 'return false');
  });
};

export default {
  initContentProtection,
  protectElement,
  disableRightClick,
  disableTextSelection,
  disableKeyboardShortcuts,
  disableImageDrag,
  addImageWatermark,
  detectPrintScreen,
  addCopyrightToClipboard,
  disableDevTools,
};
