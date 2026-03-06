import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '../src/pages/Home';

describe('Home (LAYT-03)', () => {
  it('renders the hero heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/optimizing freight logistics/i)).toBeInTheDocument();
  });

  it('renders a Get Started CTA button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });

  it('does not use hardcoded teal color class on Get Started button', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // After token replacement, no element should have bg-[#00796B] or bg-[#004D40]
    const tealElements = container.querySelectorAll('[class*="#00796B"], [class*="teal-"]');
    expect(tealElements.length).toBe(0);
  });

  it('renders three feature cards', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/rule-based matchmaking/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/fair pricing system/i)).toBeInTheDocument();
  });
});
