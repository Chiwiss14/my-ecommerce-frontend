// src/app/verify-email/page.js

import dynamic from 'next/dynamic';

const VerifyEmailComponent = dynamic(
  () => import('./VerifyEmailComponent'),
  { ssr: false }
);

export default function VerifyEmailPage() {
  return <VerifyEmailComponent />;
}