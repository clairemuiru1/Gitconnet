import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>GitConnect</span>
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/Friends" style={{ textDecoration: 'none', color: '#000' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '8px 16px', borderRadius: '4px' }}>Home Page</button>
          </Link>
          <Link href="/Profile" style={{ textDecoration: 'none', color: '#000' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '8px 16px', borderRadius: '4px' }}>Explore</button>
          </Link>
          <Link href="/Post" style={{ textDecoration: 'none', color: '#000' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '8px 16px', borderRadius: '4px' }}>Posts</button>
          </Link>
          <Link href="/Account" style={{ textDecoration: 'none', color: '#000' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '8px 16px', borderRadius: '4px' }}>My Account</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
