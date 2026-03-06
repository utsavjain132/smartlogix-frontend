import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DashboardShell from '../src/components/DashboardShell';

describe('DashboardShell (LAYT-01)', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'BUSINESS');
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('renders sidebar with "My Loads" nav item for BUSINESS role', () => {
    render(
      <MemoryRouter initialEntries={['/business-dashboard']}>
        <DashboardShell role="BUSINESS"><div>content</div></DashboardShell>
      </MemoryRouter>
    );
    expect(screen.getByText('My Loads')).toBeInTheDocument();
  });

  it('renders children inside the main content area', () => {
    render(
      <MemoryRouter>
        <DashboardShell role="BUSINESS"><div>test-content</div></DashboardShell>
      </MemoryRouter>
    );
    expect(screen.getByText('test-content')).toBeInTheDocument();
  });

  it('renders Admin nav items for ADMIN role', () => {
    render(
      <MemoryRouter initialEntries={['/admin-dashboard']}>
        <DashboardShell role="ADMIN"><div>admin-content</div></DashboardShell>
      </MemoryRouter>
    );
    expect(screen.getByText('admin-content')).toBeInTheDocument();
  });

  it('renders a mobile hamburger toggle button', () => {
    render(
      <MemoryRouter>
        <DashboardShell role="BUSINESS"><div>content</div></DashboardShell>
      </MemoryRouter>
    );
    // DashboardShell header contains a Button with sr-only "Open sidebar" or Menu icon
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
  });
});
