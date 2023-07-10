import Link from 'next/link';

export const LoginButton = () => {
  return (
    <Link legacyBehavior href="/api/auth/login">
      <a className="button__login">Log In</a>
    </Link>
  );
};
