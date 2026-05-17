import React from 'react';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn('WebGL Error caught by boundary:', error.message);
  }

  render() {
    if (this.state.hasError) {
      // Render whatever fallback the parent wants
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export default WebGLErrorBoundary;
