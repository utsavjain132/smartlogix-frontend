import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

// Mock useNavigate to avoid navigation side effects
import { vi } from 'vitest';
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Navbar (LAYT-01)', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('renders navbar on public route /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/smartlogix/i)).toBeInTheDocument();
  });

  it('returns null (does not render) on /business-dashboard when token is set', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'BUSINESS');
    const { container } = render(
      <MemoryRouter initialEntries={['/business-dashboard']}>
        <Navbar />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null on /admin-dashboard when token is set', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'ADMIN');
    const { container } = render(
      <MemoryRouter initialEntries={['/admin-dashboard']}>
        <Navbar />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null on /trucker-dashboard when token is set', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'TRUCKER');
    const { container } = render(
      <MemoryRouter initialEntries={['/trucker-dashboard']}>
        <Navbar />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });
});
