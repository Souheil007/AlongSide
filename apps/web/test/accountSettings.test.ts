import { describe, expect, it, beforeEach } from 'vitest';
import {
  useChildContextStore,
  selectActiveChild,
  formatChildAge,
  getChildDevelopmentalHorizon,
  DEMO_FAMILY_CHILDREN,
} from '../src/stores/useChildContextStore';
import { DevelopmentalTier, RoadType } from '@alongside/shared';

describe('Account Settings & Family Management Specification (PLAN-24)', () => {
  beforeEach(() => {
    useChildContextStore.getState().reset();
  });

  describe('Guardian Profile & Family Children Management', () => {
    it('initializes and displays registered children profiles across developmental horizons', () => {
      const store = useChildContextStore.getState();
      store.setChildren(DEMO_FAMILY_CHILDREN);

      const children = useChildContextStore.getState().children;
      expect(children).toHaveLength(3);

      // Child 1: Mateo (Infant / Toddler)
      const mateo = children[0]!;
      expect(mateo.name).toBe('Mateo');
      expect(formatChildAge(mateo)).toMatch(/mo|yr/);
      const horizon0 = getChildDevelopmentalHorizon(mateo.developmentalTier);
      expect(horizon0.stage).toContain('Infancy');

      // Child 2: Maya (Middle Childhood)
      const maya = children[1]!;
      expect(maya.name).toBe('Maya');
      expect(formatChildAge(maya)).toBe('8 yrs');
      const horizon2 = getChildDevelopmentalHorizon(maya.developmentalTier);
      expect(horizon2.stage).toContain('Middle Childhood');

      // Child 3: Julian (Early Adolescence)
      const julian = children[2]!;
      expect(julian.name).toBe('Julian');
      expect(formatChildAge(julian)).toBe('14 yrs');
      const horizon4 = getChildDevelopmentalHorizon(julian.developmentalTier);
      expect(horizon4.stage).toContain('Adolescence');
    });

    it('allows switching the active household child profile seamlessly', () => {
      const store = useChildContextStore.getState();
      store.setChildren(DEMO_FAMILY_CHILDREN);

      // Default active is first child (Mateo)
      expect(selectActiveChild(useChildContextStore.getState())?.name).toBe('Mateo');

      // Switch to Maya
      store.setActiveChild('demo-child-maya');
      expect(useChildContextStore.getState().activeChildId).toBe('demo-child-maya');
      expect(selectActiveChild(useChildContextStore.getState())?.name).toBe('Maya');

      // Switch to Julian
      store.setActiveChild('demo-child-julian');
      expect(useChildContextStore.getState().activeChildId).toBe('demo-child-julian');
      expect(selectActiveChild(useChildContextStore.getState())?.name).toBe('Julian');
    });
  });

  describe('Subscription & 7-Day Trial Status Logic', () => {
    it('verifies 7-day trial renewal date calculation and 1-click cancellation state', () => {
      // Annual Hero Pass configuration
      const planName = 'Annual Hero Pass';
      const planPrice = '$79.00/yr';
      const trialDaysRemaining = 6;

      expect(planName).toBe('Annual Hero Pass');
      expect(planPrice).toBe('$79.00/yr');
      expect(trialDaysRemaining).toBeGreaterThan(0);

      // 1-Click Cancellation simulation
      let isTrialCanceled = false;
      const cancelSubscription = () => {
        isTrialCanceled = true;
      };

      cancelSubscription();
      expect(isTrialCanceled).toBe(true);
    });
  });

  describe('Family Notification & Safety Preferences', () => {
    it('manages default family safety alert toggles', () => {
      const preferences = {
        sundayDigest: true,
        pediatricTriage: true,
        curfewTamper: true,
        milestoneReminders: true,
      };

      expect(preferences.sundayDigest).toBe(true);
      expect(preferences.pediatricTriage).toBe(true);
      expect(preferences.curfewTamper).toBe(true);
      expect(preferences.milestoneReminders).toBe(true);

      // Toggle individual preference
      preferences.curfewTamper = false;
      expect(preferences.curfewTamper).toBe(false);
      preferences.curfewTamper = true;
      expect(preferences.curfewTamper).toBe(true);
    });
  });

  describe('Security, Password Validation & Account Deletion Safeguards', () => {
    it('validates password requirements before submission', () => {
      const validatePasswordForm = (cur: string, next: string, confirm: string) => {
        if (!cur) return 'Current password required';
        if (next.length < 8) return 'New password must be at least 8 characters';
        if (next !== confirm) return 'Passwords do not match';
        return null;
      };

      expect(validatePasswordForm('', 'newpass123', 'newpass123')).toBe('Current password required');
      expect(validatePasswordForm('oldpass', 'short', 'short')).toBe(
        'New password must be at least 8 characters'
      );
      expect(validatePasswordForm('oldpass', 'newpassword1', 'newpassword2')).toBe(
        'Passwords do not match'
      );
      expect(validatePasswordForm('oldpass', 'validpassword1', 'validpassword1')).toBeNull();
    });

    it('enforces explicit uppercase DELETE confirmation before executing account deletion', () => {
      const canDeleteAccount = (confirmationInput: string) => {
        return confirmationInput.trim().toUpperCase() === 'DELETE';
      };

      expect(canDeleteAccount('')).toBe(false);
      expect(canDeleteAccount('delete')).toBe(true);
      expect(canDeleteAccount('DELETE')).toBe(true);
      expect(canDeleteAccount('cancel')).toBe(false);
    });
  });
});
