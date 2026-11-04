import { redirect } from 'next/navigation';

export default function DigestPage() {
  redirect('/devices?tab=digest');
}
