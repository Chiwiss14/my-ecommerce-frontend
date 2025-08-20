import { Suspense } from 'react';
import VerifyEmailForm from './VerifyEmailForm';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}