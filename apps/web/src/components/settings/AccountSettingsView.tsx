'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Plus,
  CheckCircle2,
  Shield,
  CreditCard,
  Bell,
  Lock,
  AlertTriangle,
  Smartphone,
  Compass,
  Moon,
  Calendar,
  LogOut,
  Check,
  Trash2,
  Sparkles,
  KeyRound,
  Laptop,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  useChildContextStore,
  selectActiveChild,
  formatChildAge,
  getChildDevelopmentalHorizon,
  DEMO_FAMILY_CHILDREN,
} from '@/stores/useChildContextStore';
import { ChildOnboardingModal } from '@/components/children/ChildOnboardingModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { RoadType, type ChildDTO } from '@alongside/shared';

export function AccountSettingsView() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();
  const { children, activeChildId, setActiveChild } = useChildContextStore();

  // Onboarding Modal State
  const [onboardingOpen, setOnboardingOpen] = React.useState(false);

  // Cancellation Modal State
  const [cancelModalOpen, setCancelModalOpen] = React.useState(false);
  const [isTrialCanceled, setIsTrialCanceled] = React.useState(false);

  // Delete Account Modal State
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = React.useState('');

  // Profile Form State
  const [profileName, setProfileName] = React.useState('');
  const [profileSuccessMessage, setProfileSuccessMessage] = React.useState<string | null>(null);

  // Password Form State
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = React.useState<string | null>(null);

  // Notifications State
  const [notifications, setNotifications] = React.useState({
    sundayDigest: true,
    pediatricTriage: true,
    curfewTamper: true,
    milestoneReminders: true,
  });
  const [notificationsSaved, setNotificationsSaved] = React.useState(false);

  // Display Children (Store children or demo fallback)
  const displayChildren: ChildDTO[] =
    children && children.length > 0 ? children : DEMO_FAMILY_CHILDREN;

  // Initialize profile name from authenticated user
  React.useEffect(() => {
    if (user?.fullName) {
      setProfileName(user.fullName);
    }
  }, [user]);

  const guardianEmail = user?.email || '';
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'November 2026';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccessMessage('Guardian profile name updated successfully.');
    setTimeout(() => setProfileSuccessMessage(null), 3500);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationsSaved(true);
    setTimeout(() => setNotificationsSaved(false), 3500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordSuccess('Password credentials updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(null), 3500);
  };

  const handleConfirmCancelSubscription = () => {
    setIsTrialCanceled(true);
    setCancelModalOpen(false);
  };

  const handleConfirmDeleteAccount = async () => {
    if (deleteConfirmationText.trim().toUpperCase() !== 'DELETE') return;
    setDeleteModalOpen(false);
    try {
      await logout();
    } catch {
      // Safe fallback
    } finally {
      window.location.href = '/login?deleted=true';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1.5 border-b border-[#E3E3DC] pb-5">
        <div className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-[#143D2B]">
          <Shield className="h-4 w-4 text-[#143D2B]" />
          <span>Family Administration &amp; Governance</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111413] tracking-tight">
          Account &amp; Family Settings
        </h1>
        <p className="text-sm text-[#494F4C] max-w-2xl leading-relaxed">
          Manage your guardian credentials, family children profiles, Annual Hero Pass subscription,
          and real-time safety notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 Cols): Core Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Guardian Profile */}
          <Card className="shadow-[0_1px_2px_rgba(17,20,19,0.04)] border-[#E3E3DC] bg-[#FFFFFF] rounded-[10px] overflow-hidden">
            <CardHeader className="border-b border-[#E3E3DC] bg-[#F4F4F0] pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#143D2B] text-white font-bold shadow-xs">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg font-semibold text-[#111413]">
                      Guardian Profile
                    </CardTitle>
                    <CardDescription className="text-xs text-[#858C88] font-mono">
                      Primary family administrator and safety contact
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="success" className="gap-1 text-[11px] font-mono rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  Email Verified
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {profileSuccessMessage && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-800">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{profileSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="guardian-name" className="text-xs font-semibold text-slate-700">
                      Full Legal Name
                    </label>
                    <Input
                      id="guardian-name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="e.g. Guardian Full Name"
                      className="min-h-[44px]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="guardian-email" className="text-xs font-semibold text-slate-700">
                      Guardian Email Address
                    </label>
                    <Input
                      id="guardian-email"
                      value={guardianEmail}
                      disabled
                      className="min-h-[44px] bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Member since {memberSince}
                  </span>
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white min-h-[40px] px-4 font-semibold text-xs"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Section 2: Family Children Profiles Management */}
          <Card className="shadow-xs border-slate-200 bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 border border-teal-200 text-teal-700 shadow-2xs">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Family Children Profiles
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      {displayChildren.length} registered child profile
                      {displayChildren.length === 1 ? '' : 's'} across the 0–18 lifespan
                    </CardDescription>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setOnboardingOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white min-h-[40px] px-3.5 text-xs font-semibold gap-1.5 self-start sm:self-auto shadow-2xs"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Another Child Profile</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="divide-y divide-slate-100">
                {displayChildren.map((child) => {
                  const isActive = child.id === activeChildId;
                  const isPreDevice = child.roadType === RoadType.PRE_DEVICE;
                  const horizon = getChildDevelopmentalHorizon(child.developmentalTier || child.age);
                  const formattedAge = formatChildAge(child);

                  return (
                    <div
                      key={child.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold text-sm shrink-0 shadow-xs ${
                            isActive
                              ? 'bg-teal-600 text-white ring-2 ring-teal-600/30'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {child.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm">{child.name}</h4>
                            <span className="text-xs text-slate-500 font-medium">
                              ({formattedAge})
                            </span>
                            <Badge variant={isPreDevice ? 'roadPre' : 'roadActive'}>
                              {isPreDevice ? 'Road 1: Pre-Device' : 'Road 2: Active-Device'}
                            </Badge>
                            {isActive && (
                              <Badge variant="success" className="gap-1 text-[11px] font-semibold">
                                <Check className="h-3 w-3" />
                                Active Profile
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                            <span className="font-medium text-slate-700">{horizon.stage}</span>
                            <span>•</span>
                            <span>
                              Born {child.birthMonth ? `Month ${child.birthMonth}/` : ''}
                              {child.birthYear}
                            </span>
                            {child.schoolGrade && (
                              <>
                                <span>•</span>
                                <span>{child.schoolGrade}</span>
                              </>
                            )}
                          </div>

                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                            {isPreDevice ? (
                              <Link
                                href={`/children/${child.id}/readiness`}
                                className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-medium hover:underline"
                              >
                                <Compass className="h-3.5 w-3.5 text-emerald-700" />
                                <span>
                                  Readiness Assessment:{' '}
                                  {child.latestAssessmentScore
                                    ? `${child.latestAssessmentScore} / 100`
                                    : 'Start Assessment'}
                                </span>
                              </Link>
                            ) : (
                              <Link
                                href="/devices"
                                className="inline-flex items-center gap-1 text-violet-800 hover:text-violet-950 font-medium hover:underline"
                              >
                                <Moon className="h-3.5 w-3.5 text-violet-700" />
                                <span>8:30 PM Bedtime Curfew &amp; Signed Treaty</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        {!isActive ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveChild(child.id)}
                            className="text-xs font-semibold text-slate-700 hover:text-teal-900 min-h-[38px] px-3"
                          >
                            Set as Active
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push(`/dashboard?childId=${child.id}`)}
                            className="text-xs font-semibold text-teal-800 border-teal-200 bg-teal-50/50 min-h-[38px] px-3"
                          >
                            View Dashboard
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Family Safety & Notification Preferences */}
          <Card className="shadow-xs border-slate-200 bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-800 shadow-2xs">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Family Safety &amp; Notification Alerts
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Control real-time emergency triage, weekly digests, and curfew tamper alerts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-5">
              {notificationsSaved && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-800">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Notification preferences saved to your family profile.</span>
                </div>
              )}

              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="space-y-3">
                  {/* Sunday Digest */}
                  <label className="flex items-start justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-4">
                      <div className="text-xs font-bold text-slate-900">
                        Weekly Sunday Youth Culture Digest
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Sunday 8:00 AM briefing with newly surfaced teen slang, TikTok exploit alerts,
                        and dinner conversation starters.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.sundayDigest}
                      onChange={(e) =>
                        setNotifications((prev) => ({ ...prev, sundayDigest: e.target.checked }))
                      }
                      className="h-5 w-5 rounded-md border-slate-300 text-teal-600 focus:ring-teal-600 shrink-0 mt-0.5"
                    />
                  </label>

                  {/* Pediatric Health Alerts */}
                  <label className="flex items-start justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-4">
                      <div className="text-xs font-bold text-slate-900">
                        Pediatric Health &amp; Sleep Updates
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Bedtime calm guidance, circadian rhythm updates, and restorative sleep
                        reminders.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.pediatricTriage}
                      onChange={(e) =>
                        setNotifications((prev) => ({ ...prev, pediatricTriage: e.target.checked }))
                      }
                      className="h-5 w-5 rounded-md border-slate-300 text-teal-600 focus:ring-teal-600 shrink-0 mt-0.5"
                    />
                  </label>

                  {/* Curfew Tamper SMS */}
                  <label className="flex items-start justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-4">
                      <div className="text-xs font-bold text-slate-900">
                        Bedtime Curfew &amp; Profile Tamper SMS
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Instant SMS if an enrolled child attempts to remove the iOS/Android MDM
                        profile or bypass the 8:30 PM bedtime curfew.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.curfewTamper}
                      onChange={(e) =>
                        setNotifications((prev) => ({ ...prev, curfewTamper: e.target.checked }))
                      }
                      className="h-5 w-5 rounded-md border-slate-300 text-teal-600 focus:ring-teal-600 shrink-0 mt-0.5"
                    />
                  </label>

                  {/* Milestone Reminders */}
                  <label className="flex items-start justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="space-y-0.5 pr-4">
                      <div className="text-xs font-bold text-slate-900">
                        Developmental Horizon &amp; Milestone Reminders
                      </div>
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        Monthly age-calibrated checklists as your child reaches key cognitive and
                        emotional transitions.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.milestoneReminders}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          milestoneReminders: e.target.checked,
                        }))
                      }
                      className="h-5 w-5 rounded-md border-slate-300 text-teal-600 focus:ring-teal-600 shrink-0 mt-0.5"
                    />
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white min-h-[40px] px-4 font-semibold text-xs"
                  >
                    Save Notification Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 Col): Subscription & Security */}
        <div className="space-y-8">
          {/* Section 4: Subscription & 7-Day Trial Status */}
          <Card className="shadow-xs border-slate-200 bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-teal-50/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-5 w-5 text-teal-700" />
                  <CardTitle className="text-base font-bold text-slate-900">
                    Annual Hero Pass
                  </CardTitle>
                </div>
                <Badge
                  variant={isTrialCanceled ? 'secondary' : 'success'}
                  className="text-[11px] font-semibold"
                >
                  {isTrialCanceled ? 'Trial Canceled' : '7-Day Risk-Free Trial'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              {/* Trial Status Countdown Banner */}
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  isTrialCanceled
                    ? 'border-amber-200 bg-amber-50/80 text-amber-900'
                    : 'border-teal-200 bg-teal-50/70 text-teal-900'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>
                    {isTrialCanceled
                      ? 'Trial Canceled • Active Access Until Nov 11, 2026'
                      : 'Active 7-Day Risk-Free Trial • 6 Days Remaining'}
                  </span>
                </div>
                <p className="text-[11px] opacity-90 leading-relaxed">
                  {isTrialCanceled
                    ? 'Your membership will not renew. You retain access to all 5 Lifespan Pillars until the end of your trial.'
                    : 'Renews at $79.00/yr on November 11, 2026. 1-click cancellation anytime.'}
                </p>
              </div>

              {/* Feature Inclusions Checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Included in Household Pass
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>All 5 Lifespan Pillars (Infancy to 18 yrs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>24/7 AI Child Advisor &amp; Parenting Q&amp;A Library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>8:30 PM Curfew Lockout &amp; MDM Profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>Restorative Sleep Architecture &amp; Wellness Companion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600 shrink-0" />
                    <span>Sunday Youth Culture Digest &amp; Slang Feed</span>
                  </li>
                </ul>
              </div>

              {/* 1-Click Cancel / Manage Action */}
              <div className="pt-2 border-t border-slate-100">
                {!isTrialCanceled ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCancelModalOpen(true)}
                    className="w-full text-xs font-semibold text-slate-700 hover:text-red-700 hover:border-red-200 min-h-[40px]"
                  >
                    Cancel Trial / Adjust Subscription
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsTrialCanceled(false)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold min-h-[40px]"
                  >
                    Reactivate Annual Hero Pass ($79/yr)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Security & Session Credentials */}
          <Card className="shadow-xs border-slate-200 bg-white overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <div className="flex items-center gap-2.5">
                <Lock className="h-5 w-5 text-slate-700" />
                <CardTitle className="text-base font-bold text-slate-900">
                  Security &amp; Credentials
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-5">
              {/* Change Password */}
              <form onSubmit={handleUpdatePassword} className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Update Guardian Password
                </span>

                {passwordError && (
                  <div className="p-2.5 rounded-lg border border-red-200 bg-red-50 text-[11px] font-medium text-red-700">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-[11px] font-medium text-emerald-800">
                    {passwordSuccess}
                  </div>
                )}

                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="min-h-[38px] text-xs"
                  />
                  <Input
                    type="password"
                    placeholder="New Password (min 8 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="min-h-[38px] text-xs"
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="min-h-[38px] text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  className="w-full text-xs font-semibold text-slate-700 min-h-[38px]"
                >
                  <KeyRound className="h-3.5 w-3.5 mr-1.5" />
                  Update Password
                </Button>
              </form>

              {/* Active Sessions */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active Household Sessions
                </span>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700">
                    <Laptop className="h-4 w-4 text-teal-700 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 truncate">
                        Current Browser / Web
                      </div>
                      <div className="text-[10px] text-slate-500">Active Now • This Device</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700">
                    <Smartphone className="h-4 w-4 text-slate-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 truncate">
                        Guardian iPhone (PWA)
                      </div>
                      <div className="text-[10px] text-slate-500">Last active 2 hrs ago</div>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={async () => {
                    await logout();
                    window.location.href = '/login?logged_out=true';
                  }}
                  disabled={isLoggingOut}
                  className="w-full text-xs font-semibold text-rose-700 border-rose-200 bg-rose-50/50 hover:bg-rose-100 min-h-[38px] mt-1"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  {isLoggingOut ? 'Logging out...' : 'Log Out of AlongSide'}
                </Button>
              </div>

              {/* Danger Zone */}
              <div className="pt-3 border-t border-red-100 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                  Danger Zone
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Permanently delete your guardian account and all children records.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteModalOpen(true)}
                  className="w-full text-xs font-semibold text-red-700 border-red-200 hover:bg-red-50 min-h-[38px]"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete Family Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Child Onboarding Modal */}
      <ChildOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onSuccess={(newChild) => {
          // Handled inside ChildOnboardingModal: store updated & active child set
        }}
      />

      {/* 1-Click Subscription Cancellation Modal */}
      <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-white shadow-2xl">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 mb-2">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-lg font-bold text-slate-900">
              Cancel 7-Day Risk-Free Trial?
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-slate-600 mt-1">
              You will retain full access until <strong className="text-slate-800">November 11, 2026</strong>.
              After that date, your household curfews, AI advisor chats, and developmental tracking will pause.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5 my-3 text-xs text-slate-700">
            <div className="font-semibold text-slate-900">Before you go:</div>
            <ul className="space-y-1 text-[11px] text-slate-600">
              <li>• Curfew locks on enrolled child devices will become inactive.</li>
              <li>• Saved child wellness records will remain in read-only mode.</li>
              <li>• You can reactivate anytime with 1-click.</li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCancelModalOpen(false)}
              className="min-h-[40px] text-xs font-semibold"
            >
              Keep My Subscription
            </Button>
            <Button
              type="button"
              onClick={handleConfirmCancelSubscription}
              className="bg-red-600 hover:bg-red-700 text-white min-h-[40px] text-xs font-semibold px-4"
            >
              Confirm 1-Click Cancellation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Danger Zone: Delete Account Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md p-6 rounded-2xl bg-white shadow-2xl">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 border border-red-200 text-red-600 mb-2">
              <Trash2 className="h-6 w-6" />
            </div>
            <DialogTitle className="text-center text-lg font-bold text-slate-900">
              Permanently Delete Family Account?
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-slate-600 mt-1">
              This action is <strong className="text-red-700">irreversible</strong>. All child records,
              developmental milestones, bilateral pacts, and MDM certificates will be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-3">
            <label
              htmlFor="delete-confirm-input"
              className="text-xs font-medium text-slate-700 block"
            >
              Type <span className="font-mono font-bold text-red-600">DELETE</span> to confirm:
            </label>
            <Input
              id="delete-confirm-input"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="DELETE"
              className="min-h-[40px] text-xs font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteModalOpen(false);
                setDeleteConfirmationText('');
              }}
              className="min-h-[40px] text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDeleteAccount}
              disabled={deleteConfirmationText.trim().toUpperCase() !== 'DELETE'}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white min-h-[40px] text-xs font-semibold px-4"
            >
              Permanently Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
