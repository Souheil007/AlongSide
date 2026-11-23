import { redirect } from 'next/navigation';

/**
 * Legacy /brain-games route retired — screen-free play for Ages 0–8 now lives
 * natively inside Culture & Trends (/digest#play-this-week).
 */
export default function BrainGamesPage() {
  redirect('/digest#play-this-week');
}
