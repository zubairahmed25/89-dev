import Link from 'next/link';

export const LogoutButton = () => {
  return (
    <Link legacyBehavior href="/api/auth/logout">
      <a className="button__logout">Log Out</a>
    </Link>
  );
};
