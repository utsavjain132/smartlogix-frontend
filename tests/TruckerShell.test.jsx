import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TruckerShell from '../src/components/TruckerShell';

describe('TruckerShell (LAYT-02)', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'TRUCKER');
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('renders a header with a hamburger menu button', () => {
    render(
      <MemoryRouter>
        <TruckerShell><div>trucker-content</div></TruckerShell>
      </MemoryRouter>
    );
    // SheetTrigger renders a Button; sr-only text "Open menu" is present
    expect(screen.getByText(/open menu/i)).toBeInTheDocument();
  });

  it('renders children in the main content area', () => {
    render(
      <MemoryRouter>
        <TruckerShell><div>trucker-content</div></TruckerShell>
      </MemoryRouter>
    );
    expect(screen.getByText('trucker-content')).toBeInTheDocument();
  });

  it('renders "Trucker Dashboard" label in the header', () => {
    render(
      <MemoryRouter>
        <TruckerShell><div>content</div></TruckerShell>
      </MemoryRouter>
    );
    expect(screen.getByText(/trucker dashboard/i)).toBeInTheDocument();
  });
});
