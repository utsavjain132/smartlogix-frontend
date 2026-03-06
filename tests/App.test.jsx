import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Check for some text that should be on the home page (the default route)
    expect(screen.getByText(/Optimizing Freight Logistics/i)).toBeInTheDocument();
  });
});
