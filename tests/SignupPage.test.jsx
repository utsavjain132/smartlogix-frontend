import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../src/pages/SignupPage';
import { vi } from 'vitest';

vi.mock('../src/services/api', () => ({
  apiRequest: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('SignupPage (LAYT-04)', () => {
  it('renders the Create Account card', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it('renders the SmartLogix brand mark above the card', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );
    // Brand mark is a Link with text "🚛 SmartLogix" placed above the Card
    expect(screen.getByRole('link', { name: /smartlogix/i })).toBeInTheDocument();
  });

  it('renders on a bg-background container (no bg-slate-50 class)', () => {
    const { container } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );
    const outerDiv = container.firstChild;
    expect(outerDiv.className).not.toContain('bg-slate-50');
    expect(outerDiv.className).toContain('bg-background');
  });
});
