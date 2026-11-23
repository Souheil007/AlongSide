import { redirect } from 'next/navigation';

export default async function PactDetailRedirectPage() {
  redirect('/devices?tab=controls');
}
