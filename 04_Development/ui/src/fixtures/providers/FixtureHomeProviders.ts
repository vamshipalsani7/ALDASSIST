/**
 * ALDASSIST Phase 8 — fixtures: Home / Documents / Settings / Notifications FixtureProviders (B5).
 * Each implements a contract port with static scenario data. Phase 9 replaces each with an ApiProvider
 * behind the IDENTICAL interface; the UI is unchanged.
 */
import type {
  Loaded, HomeProvider, HomeVM, DocumentsProvider, DocumentsIndexVM,
  SettingsProvider, SettingsVM, NotificationsProvider, NotificationsVM,
} from '../../contract';
import { homeScenarios, documentsScenarios, settingsScenarios, notificationsScenarios } from '../scenarios/home';

type Key<M> = keyof M;

export class FixtureHomeProvider implements HomeProvider {
  constructor(private readonly scenario: Key<typeof homeScenarios> = 'ready') {}
  async get(): Promise<Loaded<HomeVM>> { return homeScenarios[this.scenario]; }
}
export class FixtureDocumentsProvider implements DocumentsProvider {
  constructor(private readonly scenario: Key<typeof documentsScenarios> = 'ready') {}
  async list(): Promise<Loaded<DocumentsIndexVM>> { return documentsScenarios[this.scenario]; }
}
export class FixtureSettingsProvider implements SettingsProvider {
  constructor(private readonly scenario: Key<typeof settingsScenarios> = 'owner') {}
  async get(): Promise<Loaded<SettingsVM>> { return settingsScenarios[this.scenario]; }
}
export class FixtureNotificationsProvider implements NotificationsProvider {
  constructor(private readonly scenario: Key<typeof notificationsScenarios> = 'ready') {}
  async list(): Promise<Loaded<NotificationsVM>> { return notificationsScenarios[this.scenario]; }
}
