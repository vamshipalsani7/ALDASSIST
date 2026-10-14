/**
 * ALDASSIST Phase 9 — B1a runtime: the generic container that binds a port to a frozen screen.
 *
 * A screen is a pure function of Loaded<T>. This container calls its route's provider (through the
 * injected registry), tracks the async result as a Loaded<T> — starting at `loading` — and hands it to
 * the screen's `view`. It replaces App.tsx's direct scenario-map imports: data now flows screen ← port.
 */
import { useEffect, useState } from 'react';
import type { Loaded } from '../contract';
import type { ScreenRoute } from './routes';
import { useRegistry } from './RegistryContext';

/** Resolve a provider call into a Loaded<T>, re-running only when the route identity changes. */
function useAsyncLoaded(routeKey: string, load: () => Promise<Loaded<unknown>>): Loaded<unknown> {
  const [state, setState] = useState<Loaded<unknown>>({ state: 'loading' });
  useEffect(() => {
    let live = true;
    setState({ state: 'loading' });
    load()
      .then((loaded) => {
        if (live) setState(loaded);
      })
      .catch(() => {
        if (live) {
          setState({
            state: 'error',
            error: { reason: 'This could not be loaded.', nextStep: 'Please try again.' },
          });
        }
      });
    return () => {
      live = false;
    };
    // Keyed on the route id: a fresh `load` closure per render must not retrigger the effect.
     
  }, [routeKey]);
  return state;
}

export function ProviderScreen({ route }: { route: ScreenRoute }) {
  const registry = useRegistry();
  const loaded = useAsyncLoaded(route.id, () => route.load(registry));
  return <>{route.view(loaded)}</>;
}
