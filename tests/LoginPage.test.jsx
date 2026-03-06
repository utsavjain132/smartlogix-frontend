import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import { vi, describe, it, expect } from 'vitest';

// Mock dependencies
vi.mock('../src/services/api', () => ({
  apiRequest: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('LoginPage', () => {
  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Verify inputs are accessible via labels
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Verify button exists
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    
    // Verify welcome text
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it('renders on bg-background container (no bg-slate-50)', () => {
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const outerDiv = container.firstChild;
    expect(outerDiv.className).not.toContain('bg-slate-50');
    expect(outerDiv.className).toContain('bg-background');
  });

  it('renders SmartLogix brand mark link above the card', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /smartlogix/i })).toBeInTheDocument();
  });
});