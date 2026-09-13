/**
 * Modal keyboard containment — CitationPanel focus trap:
 * initial focus in the dialog, Tab / Shift+Tab cannot escape, Escape closes and restores focus to the
 * triggering element.
 */
import { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CitationPanel } from './CitationPanel';

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>trigger</button>
      <CitationPanel open={open} onClose={() => setOpen(false)} title="Passage">
        <button>first</button>
        <a href="#x">middle</a>
      </CitationPanel>
    </>
  );
}

async function openDialog() {
  const user = userEvent.setup();
  render(<Harness />);
  const trigger = screen.getByRole('button', { name: 'trigger' });
  await user.click(trigger);
  await screen.findByRole('dialog');
  return { user, trigger };
}

describe('modal focus containment', () => {
  it('moves initial focus into the dialog', async () => {
    await openDialog();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'first' }));
  });

  it('Tab from the last focusable wraps to the first (cannot escape forward)', async () => {
    const { user } = await openDialog();
    const back = screen.getByRole('button', { name: /Back to the assessment/i });
    back.focus();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'first' }));
  });

  it('Shift+Tab from the first focusable wraps to the last (cannot escape backward)', async () => {
    const { user } = await openDialog();
    const first = screen.getByRole('button', { name: 'first' });
    first.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /Back to the assessment/i }));
  });

  it('focus never lands on an element outside the dialog while open', async () => {
    const { user, trigger } = await openDialog();
    // Cycle forward several times; focus must remain within the dialog, never on the outside trigger.
    for (let i = 0; i < 5; i++) {
      await user.tab();
      expect(document.activeElement).not.toBe(trigger);
      expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true);
    }
  });

  it('Escape closes the dialog and restores focus to the trigger', async () => {
    const { user, trigger } = await openDialog();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
