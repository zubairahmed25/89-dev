import Link from 'next/link';

export const SignupButton = () => {
  return (
    <Link legacyBehavior href="/api/auth/signup">
      <a className="button__sign-up">Sign Up</a>
    </Link>
  );
};
